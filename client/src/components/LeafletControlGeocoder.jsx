import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_REVIEW } from "../utils/mutations";
import { QUERY_USER } from "../utils/queries";
import "./LeafletControlGeocoder.css";

const LeafletControlGeocoder = () => {
  const map = useMap();
  const [selectedCity, setSelectedCity] = useState(null);
  const [review, setReview] = useState("");
  const [formClicked, setFormClicked] = useState(false);
  const [rating, setRating] = useState(0); // State for rating
  const [createdAt, setCreatedAt] = useState(new Date().toISOString()); // Initialize with current date

  // Define your mutation
  const [submitReview] = useMutation(ADD_REVIEW);

  const closeForm = () => {
    setFormClicked(false);
  };

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
      if (formClicked) {
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
      }
    });

    geocoder.addTo(map);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedCity && review && rating) {
      try {
        // Execute the mutation
        await submitReview({
          variables: {
            cityName: selectedCity,
            review: review,
            rating: rating,
            createdAt: createdAt,
          },
        });
        setReview("");
        setRating(0); // Reset rating after submission
        setFormClicked(true);
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
    <div className="popup" onClick={() => setFormClicked(true)}>
      <div className="popup-inner" onClick={(e) => e.stopPropagation()}>
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "green",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <button
            type="button"
            onClick={closeForm}
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
            {user && user.username},{" "}
            {createdAt && new Date(createdAt).toLocaleDateString()}, &nbsp;
          </label>
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
              color: "green",
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
  );
};

export default LeafletControlGeocoder;
