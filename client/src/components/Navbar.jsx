import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  // const isLoggedIn = localStorage.getItem('token');
  // const navigate = useNavigate();

  // const handleSignOut = () => {
  //  localStorage.removeItem('token');
  //  navigate('/login');
  //}

  return (
    <nav className='flex justify-around p-3 border-b border-zinc-800 bg-[#1a1a1a]/90 text-zinc-100'>
      
      <Link to='/'><h1 className='text-2xl'>Home</h1></Link>
      <ul className='flex gap-6'>
      {/* {isLoggedIn ? (
        <>
          <Link to='/account'>Account</Link>
          <li><button onClick={handleSignOut}>Sign Out</button></li>
        </>
      ) : (
        <>
        <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
        </>
      )} */}
      <Link to='/login'>Login</Link>
      <Link to='/signup'>Sign Up</Link>
      </ul>
    </nav>
  )
}

export default Navbar