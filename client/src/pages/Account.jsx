import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

function Account() {
  const { loading, data } = useQuery(QUERY_USER);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!loading && data) {
      // Assuming data.reviews is an array of user's past reviews
      setReviews(data.reviews);
    }
  }, [loading, data]);

  return (
    <div className="w-full h-screen bg-[#1a1a1a] text-white flex-row text-center">
      <h2 className="text-4xl">Hello User!</h2>
      <p>Add a Review?</p>
      <p>View Favorites?</p>
      <p>View Past Reviews?</p>
      <ul className="pastReviewsList">
        {reviews.map((review, index) => (
          <li key={index}>
            <strong>Review:</strong> {review.review}
            <br />
            <strong>Rating:</strong> {review.rating}
            <br />
            <strong>Created At:</strong>{" "}
            {new Date(review.createdAt).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Account;
