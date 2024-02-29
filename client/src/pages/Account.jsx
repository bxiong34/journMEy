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
  const [favorites, setFavorites] = useState([]); // State variable for favorites list
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    if (data) {
      setUser(data.user);
      console.log(data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user information: {error.message}</p>;

  return (
    <>
      {user ? (
        <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col justify-center items-center pb-20">
          <h2 className="text-4xl">Hello {user.username}!</h2>
          <p className="mt-4">Explore your favorites:</p>

          {/* Render favorites list */}
          <ul>
            {favorites.map((favorite, index) => (
              <li key={index}>
                {favorite.cityName} - Rating: {favorite.rating} - Created At:{" "}
                {favorite.createdAt}
              </li>
            ))}
          </ul>

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
          {showReviews && (
            <div className="bg-white shadow-md rounded-md p-1 mt-4 mx-20">
              {user.reviews.map((review, index) => (
                <div key={index} className="border-b-2 border-gray-200 pb-2">
                  <p className="text-gray-600 text-lg font-semibold">
                    {review.cityName}
                  </p>
                  <p className="text-gray-600">{review.review}</p>
                  <div className="flex items-center">
                    <p className="text-gray-400">Rating:</p>
                    <p className="text-yellow-500">
                      {renderStars(review.rating)}
                    </p>
                    <p className="text-gray-400 ml-2">{review.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Account;

// import React, {useEffect, useState} from "react";
// import { useQuery } from '@apollo/client';
// import { QUERY_USER } from '../utils/queries';

// function Account() {
//   const { loading, error, data } = useQuery(QUERY_USER);
//   const [ user, setUser ] = useState(null); // Initialize user state correctly

//   useEffect(() => {
//     if (data) {
//      setUser(data.user); // Assuming data has a user object
//      console.log(data.user); // Log the user data
//     }
//   }, [data]); // Depend on data to trigger this effect

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching user information: {error.message}</p>;

//  // Render Stars
//   const renderStars = (rating) => {
//     let stars = [];
//       for (let i = 0; i < 5; i++) {
//       if (i < rating) {
//        stars.push(<span key={i}>&#9733;</span>); // filled star
//       } else {
//        stars.push(<span key={i}>&#9734;</span>); // empty star
//       }
//     }
//     return stars;
// };

// return (
//     <>
//       {user ? (
//     <>
//     <div className="w-full h-screen bg-[#1a1a1a] text-white flex-row text-center">
//       <h2 className="text-4xl">Hello {user.username}!</h2>

//       <p className="mt-4">Here are your reviews:</p>
//       {user.reviews.map((review, index) => <div key={index}>
//         <p>{review.cityName}</p>
//         <p>{review.review}</p>
//         <p>{renderStars(review.rating)}</p>
//         <p>{review.createdAt}</p>
//       </div>
//       )}

//           </div>
//     </>
//       ) : <div>Loading...</div> }
//     </>
//   );
// }

// export default Account;
