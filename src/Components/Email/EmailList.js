import React, { useEffect } from "react";
import EmailInbox from "./EmailInbox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addNewMails } from "../store/mailSlice";
import "./EmailList.css";

const EmailList = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.mail.mailItem);
  
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

        dispatch(addNewMails(arr));
        console.log(arr);
      }
    } catch (err) {
      console.log(`${err}`);
    }
  };

  return (
    <>
      <div className="email_list">
        {email === [] ? (
          <h3>Your new messages will appear here.</h3>
        ) : (
          email.map((element) => {
            return (
              <EmailInbox
                Sender={element.Sender}
                reciever={element.reciever}
                email={element.email}
                subject={element.subject}
                body={element.body}
                isRead={element.read}
                key={element.id}
                id={element.id}
                time={element.time}
              />
            );
          })
        )}
      </div>
    </>
  );
};

export default EmailList;
