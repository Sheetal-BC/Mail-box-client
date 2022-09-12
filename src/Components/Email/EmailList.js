import React, { useState, useEffect } from "react";
import EmailInbox from "./EmailInbox";
import axios from "axios";
import "./EmailList.css";

const EmailList = () => {
 
  const [email, setEmail] = useState([]);

  useEffect(() => {
    fecthMails();
  }, []);

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
        setEmail([...arr]);
        console.log(arr);
      }
    } catch (err) {
      console.log(`${err}`);
    }
  };

  return (
    <div className="email_list">
      {email.map((element) => {
        return (
          <EmailInbox
            Sender={element.Sender}
            subject={element.subject}
            body={element.body}
            key={element.id}
            id={element.id}
            time={element.time}
          />
        );
      })}
    </div>
  );
};

export default EmailList;
