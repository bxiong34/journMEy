import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const renderStars = (rating) => {
  let stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      i < rating ? <span key={i}>&#9733;</span> : <span key={i}>&#9734;</span>
    );
  }
  return stars;
};

function Account() {
  const { loading, error, data } = useQuery(QUERY_USER);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [localStorageReviews, setLocalStorageReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    if (data) {
      setUser(data.user);
      setUserReviews(data.user.reviews || []);

      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }

      const storedReviews = Object.keys(localStorage)
        .filter((key) => key.startsWith("review_"))
        .map((key) => JSON.parse(localStorage.getItem(key)));

      const allReviews = data.user.reviews.concat(storedReviews);
      setUserReviews(allReviews);
    }
  }, [data]);

  const removeFavorite = (index) => {
    const updatedFavorites = [...favorites];
    updatedFavorites.splice(index, 1);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const renderUserReviews = () => {
    return (
      <div className="bg-white shadow-md rounded-md p-1 mt-4 mx-20">
        {user.reviews.map((review, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-2">
            <p className="text-gray-600 text-lg font-semibold">
              {review.cityName}
            </p>
            <p className="text-gray-600">{review.review}</p>
            <div className="flex items-center text-center">
              <p className="text-gray-400">Rating:</p>
              <p className="text-yellow-500">
                {renderStars(review.rating)}
              </p>
              <p className="text-gray-400 ml-2">{review.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderLocalStorageFavorites = () => {
    return (
      <div className="bg-white shadow-md rounded-md p-1 mt-4 mx-20">
        {favorites.map((favorite, index) => (
          <div key={index} className="border-b-2 border-gray-200 pb-2">
            <p className="text-gray-600 text-lg font-semibold">
              {favorite.cityName}
            </p>
            <p className="text-gray-600">{favorite.review}</p>
            <div className="flex items-center">
              <p className="text-gray-400">Rating:</p>
              <p className="text-yellow-500">
                {renderStars(favorite.rating)}
              </p>
              <p className="text-gray-400 ml-2">{favorite.createdAt}</p>
              <button
                className="text-red-700 ml-2"
                onClick={() => removeFavorite(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {user ? (
        <div className="min-h-screen bg-[#1A1A1A] text-white flex flex-col justify-center items-center pb-20">
          <h2 className="text-4xl">Hello {user.username}!</h2>
          <p className="mt-4">
            Explore your{" "}
            <span
              onClick={() => setShowFavorites(!showFavorites)}
              style={{
                cursor: "pointer",
                color: "yellow",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              favorites
            </span>
            :
          </p>
          {showFavorites && renderLocalStorageFavorites()}
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
          {showReviews && user.reviews.length > 0 && renderUserReviews()}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Account;