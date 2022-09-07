import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Navbar.css';
import {openSendMessage} from '../store/mailSlice';
import { closeSendMessage } from "../store/mailSlice";
import { useDispatch } from "react-redux";
import { faPencil} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../store/auth";


const Navbar = () => {

    const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();

    const composeHandler = () => {
      dispatch(openSendMessage());
    }

    const logoutHandler = () => {
      localStorage.removeItem('Token');
      localStorage.removeItem('email');
      localStorage.removeItem("userID");
      dispatch(logout());
       dispatch(closeSendMessage());
    }
    return (
      <header className="header">
        <div className="logo">
          <FontAwesomeIcon icon={faEnvelope} className="edit" size="1x" />
          Mail box
        </div>
        <nav>
          <ul>
            {isLoggedIn && (
              <button className="compose_btn" onClick={composeHandler}>
                Compose
                <FontAwesomeIcon icon={faPencil} className="envelope" size="1x" />
              </button>
            )}
            <li>{isLoggedIn && <Link to="/Home">Home</Link>}</li>

            <li>
              {isLoggedIn && (
                <button className="logout_btn" onClick={logoutHandler}>
                  Logout
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>
    );
}

export default Navbar;