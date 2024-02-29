import React, {useEffect, useState} from "react";
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function Account() {
  const { loading, error, data } = useQuery(QUERY_USER);
  const [user, setUser] = useState(null); // Initialize user state correctly

  useEffect(() => {
    if (data) {
      setUser(data.user); // Assuming data has a user object
      console.log(data.user); // Log the user data
    }
  }, [data]); // Depend on data to trigger this effect

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user information: {error.message}</p>;

  return (
    /*
    <div className="w-full h-screen bg-[#1a1a1a] text-white flex-row text-center">
      <h2 className="text-4xl">Hello, {user.username}!</h2>
      <p>View Favorites:</p>
      <p>View Past Reviews:</p>
      <ul className="pastReviewsList">
          <li >
            <strong>Review:</strong> <br />
            <strong>Rating:</strong> <br />
            <strong>By:</strong> , &nbsp;

            <br />
          </li>
      </ul>
    </div>
  );
}
export default Account;
*/
/*
  const { loading, error, data } = useQuery(QUERY_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const user = data.user;
  */
  
  // const [userReviews, setUserReviews] = useState([]);
  // const [favorites, setFavorites] = useState([]);



  // const [favorites, setFavorites] = useState([]); // Placeholder for favorites state
  // const mapRef = useRef(null); // Placeholder for mapRef

  // useEffect(() => {
  //   const storedFavorites = localStorage.getItem("favorites");
  //   if (storedFavorites) {
  //     setFavorites(JSON.parse(storedFavorites));
  //   }
  // }, []);

  // const removeFromFavorites = (id) => {
  //   const updatedFavorites = favorites.filter((marker) => marker.id !== id);
  //   setFavorites(updatedFavorites);
  //   localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  // };

  // const locateOnMap = (coordinates) => {
  //   if (coordinates) {
  //     mapRef.current.flyTo(coordinates, 13, { animate: true });
  //     console.log("Locating coordinates on the map:", coordinates);
  //   } else {
  //     console.log("Coordinates are undefined");
  //   }
  // };


  //   return (
  //     <div className="w-full h-screen bg-[#1a1a1a] text-white flex-row text-center">
  //       <h2 className="text-4xl">Favorites</h2>
  //       <ul className="favoritesList">
  //       {favorites.map((marker) => (
  //   <li key={marker.id}>
  //     <strong>City Name:</strong> {marker.cityName}
  //     <br />
  //     <strong>Review 1:</strong> {marker.review1}
  //     <br />
  //     <strong>Review 2:</strong> {marker.review2}
  //     <br />
  //     <strong>Rating:</strong> {marker.rating}
  //     <br />
  //     <button onClick={() => removeFromFavorites(marker.id)}>
  //       Remove
  //     </button>
  //     <button onClick={() => locateOnMap(marker.geocode)}>
  //     Locate on Map
  //     </button>
  //   </li>
  // ))}
  //       </ul>
  //     </div>
  //   );
  // }
//   

  // return (
  
  //   <div className="w-full h-screen bg-[#1a1a1a] text-white flex-row text-center">
  //     <h2 className="text-4xl">Hello User!</h2>
  //     <p>View Favorites?</p>
  //     <div className="favoritesList"></div>
  //     <p>View Past Reviews?</p>
  //     <ul className="pastReviewsList">
  //       {userReviews.map((review, index) => (
  //         <li key={index}>
  //           <strong>Review:</strong> {review.review} <br />
  //           <strong>Rating:</strong> {review.rating} <br />
  //           <strong>By:</strong> {review.user}, &nbsp;
  //           {new Date(review.createdAt).toLocaleDateString("en-US")}
  //           <br />
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
    
    
    <>
      {user ? (
    <>
    <div className="w-full h-screen bg-[#1a1a1a] text-white flex-row text-center">
      <h2 className="text-4xl">Hello {user.username}!</h2>
      <p>Add a Review?</p>
      <p>View Favorites?</p>
      <p>View Past Reviews?</p>
    </div>
    </>
  ) : <div>Loading...</div> }

    </>
    
  );
}

export default Account;