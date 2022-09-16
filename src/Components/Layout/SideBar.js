import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { faPencil, faInbox, faHome, faPaperPlane, faStar , faEnvelopeOpen} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { openSendMessage } from "../store/mailSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SideBar.css";
import SideBarOptions from "./SideBarOptions";

function Sidebar(props) {
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [active, setActive] = useState("Home");
  const [msgCount, setMsgCount] = useState(0);
  const email = useSelector((state) => state.mail.mailItem);


  const composeHandler = () => {
    dispatch(openSendMessage());
  };

 
  const counter = () => {
    let num = 0;
   email.forEach((element) => {
      if (!element.read) {
        num++;
      }
      setMsgCount(num);
    });
  };
  useEffect(() => {
    counter();
  });


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
            <SideBarOptions icon={faInbox} title="Inbox" number={msgCount} />
          </Link>
        </div>
        <div
          onClick={() => setActive("Sent")}
          className={`sidebar_option ${active === "Sent" && `sidebar--active`}`}
        >
          <Link to="/sent">
            <SideBarOptions icon={faPaperPlane} title="Sent" />
          </Link>
        </div>
        <div
          onClick={() => setActive("Starred")}
          className={`sidebar_option ${
            active === "Starred" && `sidebar--active`
          }`}
        >
          <Link to="/stared">
            <SideBarOptions icon={faStar} title="Starred" />
          </Link>
        </div>
        <div
          onClick={() => setActive("Draft")}
          className={`sidebar_option ${
            active === "Draft" && `sidebar--active`
          }`}
        >
          <Link to="/draft">
            <SideBarOptions icon={faEnvelopeOpen} title="Draft" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
