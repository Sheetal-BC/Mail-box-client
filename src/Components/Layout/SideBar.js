import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  faPencil,
  faInbox,
  faHome,
  faPaperPlane,
  faStar,
  faEnvelopeOpen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addNewMails,
  getInboxMails,
  openSendMessage,
} from "../store/mailSlice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SideBar.css";
import SideBarOptions from "./SideBarOptions";
import axios from "axios";

function Sidebar() {
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [active, setActive] = useState("Home");
  const inboxMails = useSelector((state) => state.mail.inboxMails);

  const composeHandler = () => {
    dispatch(openSendMessage());
  };

  useEffect(() => {
    getMailsByDuration();
  }, []);

  const counter = () => {
    let num = 0;
    inboxMails.forEach((element) => {
      if (!element.read) {
        num++;
      }
    });
    return num;
  };

  const getMailsByDuration = () => {
    setInterval(() => {
      fecthMails();
    }, 2000);
  };
  const fecthMails = async () => {
    let arr = [];

    const emailName = localStorage.getItem("email");
    const name = emailName.substring(0, emailName.lastIndexOf("@"));
    try {
      const res = await axios.get(
        `https://mail-box-client-8aa4b-default-rtdb.firebaseio.com/${name}/receive.json`
      );
      if (res.statusText === "OK") {
        let index = 0;
        for (const key in res.data) {
          arr[index] = res.data[key];
          arr[index].id = key;
          index++;
        }
        dispatch(addNewMails(arr));
        dispatch(getInboxMails(arr));
        console.log(arr);
      }
    } catch (err) {
      console.log(`${err}`);
    }
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
            <SideBarOptions icon={faInbox} title="Inbox" number={counter()} />
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
