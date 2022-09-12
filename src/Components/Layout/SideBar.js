import React, { useState } from "react";
import { useSelector } from "react-redux";
import { faPencil, faInbox, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { openSendMessage } from "../store/mailSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SideBar.css";
import SideBarOptions from "./SideBarOptions";

function Sidebar() {
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [active, setActive] = useState("Home");

  const composeHandler = () => {
    dispatch(openSendMessage());
  };
  return (
    <div className="mail_sidebar">
      <div className="sidebar">
        {isLoggedIn && (
          <button className="compose_btn" onClick={composeHandler}>
            Compose
            <FontAwesomeIcon icon={faPencil} className="envelope" size="1x" />
          </button>
        )}
        <div
          onClick={() => setActive("Home")}
          className={`sidebar_option ${active === "Home" && `sidebar--active`}`}
        >
          <Link to="/home">
            <SideBarOptions icon={faHome} title="Home" />
          </Link>
        </div>
        <div
          onClick={() => setActive("Inbox")}
          className={`sidebar_option ${
            active === "Inbox" && `sidebar--active`
          }`}
        >
          <Link to="/inbox">
            <SideBarOptions icon={faInbox} title="Inbox" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
