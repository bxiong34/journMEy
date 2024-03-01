import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
// Define renderStars function outside of the Account component
const renderStars = (rating) => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      i < rating ? <span key={i}>&#9733;</span> : <span key={i}>&#9734;</span>,
    );
  }
  return stars;
};
function Account() {
  const { loading, error, data } = useQuery(QUERY_USER);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]); // Initialize as empty array
  const [showReviews, setShowReviews] = useState(false);
  const [localStorageReviews, setLocalStorageReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([]); // Initialize as empty array
  useEffect(() => {
    if (data) {
      setUser(data.user);
      // Set user reviews from user data
      setUserReviews(data.user.reviews || []); // Set to empty array if null
      // Retrieve favorites from localStorage
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
      // Retrieve reviews from localStorage
      const storedReviews = Object.keys(localStorage)
        .filter(key => key.startsWith("review_"))
        .map(key => JSON.parse(localStorage.getItem(key)));
      // Combine user reviews and reviews from localStorage
      const allReviews = data.user.reviews.concat(storedReviews);
      // Set user reviews state
      setUserReviews(allReviews);
    }
  }, [data]);
  // Function to remove favorite item
  const removeFavorite = (index) => {
    // Create a copy of the current favorites array
    const updatedFavorites = [...favorites];
    // Remove the selected favorite item from the copied array
    updatedFavorites.splice(index, 1);
    // Update the favorites state with the modified array
    setFavorites(updatedFavorites);
    // Update local storage with the modified favorites array
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  // Render user reviews
  const renderUserReviews = () => {
    return (
      <div className="bg-white shadow-md rounded-md p-1 mt-4 mx-20">
        {user.reviews.map((review, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-2">
            <p className="text-gray-600 text-lg font-semibold">{review.cityName}</p>
            <p className="text-gray-600">{review.review}</p>
            <div className="flex items-center">
              <p className="text-gray-400">Rating:</p>
              <p className="text-yellow-500">{renderStars(review.rating)}</p>
              <p className="text-gray-400 ml-2">{review.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  // Render favorites from local storage
  const renderLocalStorageFavorites = () => {
    return (
      <div className="bg-white shadow-md rounded-md p-1 mt-4 mx-20">
        {favorites.map((favorite, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-2">
            <p className="text-gray-600 text-lg font-semibold">{favorite.cityName}</p>
            <p className="text-gray-600">{favorite.review}</p>
            <div className="flex items-center">
              <p className="text-gray-400">Rating:</p>
              <p className="text-yellow-500">{renderStars(favorite.rating)}</p>
              <p className="text-gray-400 ml-2">{favorite.createdAt}</p>
              <button className="text-red-700 ml-2" onClick={() => removeFavorite(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  // In the return statement of the Account component
  return (
    <>
      {user ? (
        <div className="min-h-screen bg-[#1A1A1A] text-white flex flex-col justify-center items-center pb-20">
          <h2 className="text-4xl">Hello {user.username}!</h2>
          <p className="mt-4">Explore your favorites:</p>
          {/* Render favorites list */}
          {renderLocalStorageFavorites()}
          <p className="mt-4">
            Here are your{" "}
            <span
              onClick={() => setShowReviews(!showReviews)}
              style={{
                cursor: "pointer",
                color: "yellow",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              reviews
            </span>
            :
          </p>
          {/* Render user reviews */}
          {showReviews && user.reviews.length > 0 && renderUserReviews()}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
export default Account;