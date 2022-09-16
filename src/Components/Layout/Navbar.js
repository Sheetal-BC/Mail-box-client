import React from "react";
import { useSelector } from "react-redux";
import './Navbar.css';
import { closeSendMessage } from "../store/mailSlice";
import { useDispatch } from "react-redux";
import { faSearch, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logout } from "../store/auth";
import { useState } from "react";


const Navbar = () => {

    const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
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
          Mail Box
        </div>
        <div className="search_icon">
          <input type="text" placeholder="Search" onChange={(event)=> { searchTerm(event.target.value)}}/>
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