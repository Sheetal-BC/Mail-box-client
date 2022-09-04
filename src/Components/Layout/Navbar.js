import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
    return (
      <header className="header">
          <div className="logo">Mail box</div>
        <nav>
          <ul>
            <li>{isLoggedIn && <Link to="/Home">Home</Link>}</li>

            <li>
              {isLoggedIn && <button>Logout</button>}
            </li>
          </ul>
        </nav>
      </header>
    );
}

export default Navbar;