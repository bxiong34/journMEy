import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import Logo from "/images/JournMEy.png";

function Navbar() {
  if (Auth.loggedIn()) {
    return (
      <nav className="flex justify-end space-around p-3 border-b border-zinc-800 bg-[#1a1a1a]/90 text-zinc-100 items-right-end">
        <ul className="flex items-center space-x-10">
          <img
            src={Logo}
            alt="JournMEy Logo"
            style={{ width: "45px", height: "45px" }}
          />
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/map" className="hover:underline">
              Map
            </Link>
          </li>
          <li>
            <Link to="/account" className="hover:underline">
              Account
            </Link>
          </li>
          <li>
            <a
              href="/"
              className="hover:underline mr-10"
              onClick={() => Auth.logout()}
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="flex justify-end space-around p-3 border-b border-zinc-800 bg-[#1a1a1a]/90 text-zinc-100 items-right-end pr-12">
        <ul className="flex items-center space-x-10">
          <img
            src={Logo}
            alt="JournMEy Logo"
            style={{ width: "45px", height: "45px" }}
          />
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
