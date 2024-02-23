import Auth from '../utils/auth'
import { Link } from 'react-router-dom'


function Navbar() {
  if(Auth.loggedIn()) {
    return (
      <nav className='flex justify-around p-3 border-b border-zinc-800 bg-[#1a1a1a]/90 text-zinc-100'>
        <Link to='/'>Home</Link>
      <ul className='flex flex-row items-center'>
        <li><Link to='/map'>Map</Link></li>
        <li><Link to='/account'>Account</Link></li>
        <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
      </ul>
      </nav>
    )
  } else {
    return (
      <nav  className='flex justify-around p-3 border-b border-zinc-800 bg-[#1a1a1a]/90 text-zinc-100'>
        <Link to='/'>Home</Link>
      <ul className='flex flex-row items-center justify-around'>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>Sign Up</Link></li>
      </ul>
      </nav>
    )
  }
}

export default Navbar