import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Navbar.css';
import {openSendMessage} from '../store/mailSlice';
import { closeSendMessage } from "../store/mailSlice";
import { useDispatch } from "react-redux";
import { faPencil, faSearch, faChevronDown} from "@fortawesome/free-solid-svg-icons";
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
        <div className="search_icon">
          <input type="text" placeholder="Search" />
          <button className="drown_arrow">
            <FontAwesomeIcon
              icon={faChevronDown}
              className="envelope"
              size="1x"
            />
          </button>
          <button className="search">
            <FontAwesomeIcon icon={faSearch} className="envelope" size="1x" />
          </button>
        </div>
         <div>
        {isLoggedIn && (
                <button className="logout_btn" onClick={logoutHandler}>
                  Logout
                </button>
              )}
         </div>

             
          
       
      </header>
    );
}

export default Navbar;