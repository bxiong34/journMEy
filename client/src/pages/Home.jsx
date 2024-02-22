import React from 'react'
import cities from '../components/cities'

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
    <div className='w-full h-screen bg-[#1a1a1a] text-white flex items-center flex-col'>

      <div className='w-[70%] flex flex-row justify-around items-center mt-10'>
        <h2 className='text-4xl m-5'>Welcome to JournMEy</h2>
        <img src='./images/pinMap1.jpeg' className='rounded-2xl flex'/>
      </div>

      {/* container for list of cities and reviews */}
  <div className='flex flex-col items-center w-[70%] mt-10 overflow-hidden' >
    <div className='flex flex-col items-end' style={{animation: "scroll 50s linear infinite"}}>
      {cities.map((city, index) => (
        <div key={index} className='border border-amber-500 rounded-2xl w-10/12 flex flex-row justify-around items-center mt-2'>
          <div className='flex flex-row w-3/12'>
            <img src={city.ProfilePic} alt={city.Name} className='w-20 h-20  rounded-2xl border border-cyan-400' />
            <p className='flex items-end '>{city.Name}</p>
          </div>

          <div className='w-8/12 flex flex-col justify-center items-center'>
            <h3>{city.City}</h3>
            <p>{city.Review}</p>
            <p>Rating: {renderStars(city.Rating)}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  </div>
  )
}

export default home