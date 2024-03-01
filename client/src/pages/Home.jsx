import React from "react";
import cities from "../components/cities";
import "../App.css";
import Logo from "/images/JournMEy.png";

function home() {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i}>&#9733;</span>); // filled star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // empty star
      }
    }
    return stars;
  };

  return (
    <div className="w-full bg-[#1a1a1a] text-white flex items-center justify-center flex-col">
      <div className="w-[70%] mx-auto flex flex-row justify-around text-center">
        <h2 className="text-5xl m-4 flex items-center">
          <img
            src={Logo}
            alt="JournMEy Logo"
            className="text-center mr-4"
            style={{ width: "70px", height: "70px" }}
          />
          Welcome to JournMEy
        </h2>
      </div>

      <img
        src="./images/homemap.png"
        className="rounded-2xl"
        style={{ width: "500px", height: "auto" }}
      />

      <div className="h-auto m-5 text-center">
        <p className="text-lg italic">
          Trusted by millions of travelers, JournMEy is the best way to share
        </p>
        <h2>Rated {Array(5).fill("⭐")}</h2>
      </div>

      <div className="h-50% w-[70%] flex flex-row m-4">
        <div className="mt-16 text-center">
          <h2 className="text-3xl">Explore the world</h2>
          <p className="text-lg">
            Discover the best cities around the world as recommended by our
            community of travelers.
          </p>
        </div>

        {/* container for list of cities and reviews */}
        <div className=" h-96 flex flex-col items-center w-full overflow-hidden">
          <div
            className="flex flex-col items-center w-full"
            style={{ animation: "scroll 50s linear infinite" }}
          >
            {cities.map((city, index) => (
              <div
                key={index}
                className="border border-cyan-400 rounded-2xl w-11/12 flex flex-row justify-around items-center mt-2"
              >
                <div className="flex flex-row w-3/12">
                  <img
                    src={city.ProfilePic}
                    alt={city.Name}
                    className="w-20 h-20  rounded-2xl border border-zinc-100"
                  />
                  <p className="flex items-end ml-2">{city.Name}</p>
                </div>

                <div className="w-8/12 m-2 flex flex-col justify-center items-center">
                  <h3>{city.City}</h3>
                  <p>{city.Review}</p>
                  <p>Rating: {renderStars(city.Rating)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default home;
