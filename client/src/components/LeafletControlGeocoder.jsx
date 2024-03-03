import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_REVIEW } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import "./LeafletControlGeocoder.css";
import Auth from "../utils/auth";

const LeafletControlGeocoder = () => {
  const map = useMap();
  const [selectedCity, setSelectedCity] = useState(null);
  const [review, setReview] = useState("");
  const [formClicked, setFormClicked] = useState(false);
  const [rating, setRating] = useState(0); // State for rating
  const [createdAt, setCreatedAt] = useState(new Date().toISOString()); // Initialize with current date
  const [searchPerformed, setSearchPerformed] = useState(false); // State to track search performed

  // Define your mutation
  const [addReview] = useMutation(ADD_REVIEW);

  useEffect(() => {
    let geocoder = L.Control.geocoder({
      collapsed: false,
      placeholder: "Search here...",
      errorMessage: "Nothing found.",
      geocoder: L.Control.Geocoder.nominatim(),
    });

    geocoder.on("markgeocode", function (e) {
      setSelectedCity(e.geocode.name);
      const latlng = e.geocode.center;
      map.setView(latlng, 13);
      setSearchPerformed(true); // Set searchPerformed to true when geocode event is triggered
      if (formClicked) {
        const popupContent = `
        <div>
        <h3>
          <strong>${selectedCity}</strong>
        </h3>
        <div>
          <p>
            ${review} Rating: ${rating} — 
            <strong>${user?.username}</strong>, 
            ${new Date(createdAt).toLocaleDateString()} 
          </p>
        </div>
      </div>
        `;
        L.marker(latlng).addTo(map).bindPopup(popupContent).openPopup();
      }
    });

    geocoder.addTo(map);

    // Retrieve reviews from local storage
    const storedReviews = Object.keys(localStorage).filter((key) =>
      key.startsWith("review_"),
    );
    storedReviews.forEach((key) => {
      const review = JSON.parse(localStorage.getItem(key));
      const marker = L.marker([review.geocode.lat, review.geocode.lng]).addTo(
        map,
      );
      const popupContent = `
      <div>
        <h3>
          <strong>${review.cityName}</strong>
        </h3>
        <div>
          <p>
            ${review.review} Rating: ${review.rating} — 
            <strong>${review.user}</strong>, 
            ${new Date(review.createdAt).toLocaleDateString()} 
          </p>
        </div>
      `;
      marker.bindPopup(popupContent);
    });

    return () => {
      geocoder.off("markgeocode");
    };
  }, [map, formClicked]);

  const { loading, error, data } = useQuery(QUERY_USER);
  const user = data?.user;

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (selectedCity && review && rating && user) {
      // Ensure user data is available
      try {
        if (!Auth.loggedIn()) {
          alert("Please log in to submit a review.");
          // Optionally, you can redirect the user to the login page here
          return;
        }

        // Execute the mutation using user's _id
        const { data } = await addReview({
          variables: {
            user: user._id, // Pass user's _id instead of username
            cityName: selectedCity,
            review: review,
            rating: rating,
            createdAt: createdAt,
          },
        });

        // Generate a unique key for the review
        const reviewKey = `review_${Date.now()}`;

        // Save the review to local storage under the generated key
        localStorage.setItem(
          reviewKey,
          JSON.stringify({
            user: user._id,
            cityName: selectedCity,
            review: review,
            rating: rating,
            createdAt: createdAt,
            geocode: map.getCenter(), // Assuming you want to save the coordinates of the map center
          }),
        );

        // Log the added review
        console.log("Review added:", data.addReview);

        setReview("");
        setRating(0); // Reset rating after submission
        setFormClicked(false);
        setSearchPerformed(false);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    } else {
      console.log("Selected city, review, or rating is empty");
    }
  };

  // Function to render stars
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ cursor: "pointer", color: i <= rating ? "gold" : "gray" }}
          onClick={() => handleRatingChange(i)}
        >
          ★
        </span>,
      );
    }
    return stars;
  };

  return (
    searchPerformed && ( // Render form only if search has been performed
      <div className="popup" onClick={() => setFormClicked(true)}>
        <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
          <form
            onSubmit={handleSubmitReview}
            style={{
              backgroundColor: "green",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setFormClicked(false);
                setSearchPerformed(false); // Optionally, reset searchPerformed state when closing the form
              }}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
                color: "black",
              }}
            >
              X
            </button>
            <label style={{ color: "black" }}>
              Review for {selectedCity}:
              <textarea
                value={review}
                onChange={handleReviewChange}
                style={{
                  width: "100%",
                  minHeight: "100px",
                  marginTop: "10px",
                  padding: "5px",
                }}
              />
            </label>
            <label style={{ color: "black" }}>
              Rating:
              {renderStars()}
            </label>{" "}
            &nbsp;&nbsp;&nbsp;
            <input type="hidden" value={createdAt} />
            <button
              type="submit"
              style={{
                backgroundColor: "white",
                border: "none",
                padding: "10px",
                marginTop: "10px",
                cursor: "pointer",
                borderRadius: "5px",
                color: "black",
              }}
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default LeafletControlGeocoder;
