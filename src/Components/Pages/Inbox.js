import React from "react";
import EmailList from "../Email/EmailList";
import axios from "axios";
import { useSelector } from "react-redux";

const Inbox = () => {
 
  const email = useSelector((state) => state.mail.inboxMails);

  const deleteHandler = (id) => {
    const emailName = localStorage.getItem("email");
    const name = emailName.substring(0, emailName.lastIndexOf("@"));

    try {
      const res = axios.delete(
        `https://mail-box-client-8aa4b-default-rtdb.firebaseio.com/${name}/receive/${id}.json`
      );
      console.log("Sucessfully deleted");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <EmailList email={email} deleteHandler={deleteHandler} />
    </div>
  );
};

export default Inbox;
