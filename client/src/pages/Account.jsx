import React from "react";
// import { useQuery } from "@apollo/client";
// import { QUERY_USER } from "../utils/queries";

function Account() {
  // const { loading, data } = useQuery(QUERY_USER);

  return (
    <div className="w-full h-screen bg-[#1a1a1a] text-white flex-row text-center">
      <h2 className="text-4xl">Hello User!</h2>
      <p>View Favorites?</p>
      <p>Add a Review?</p>
    </div>
  );
}

export default Account;
