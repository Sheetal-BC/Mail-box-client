import React from "react";
import EmailInbox from "./EmailInbox";
import "./EmailList.css";

const EmailList = ({ email, deleteHandler, sent }) => {
  return (
    <>
      <div className="email_list">
        {email.map((element) => {
          return (
            <EmailInbox
              Sender={element.Sender}
              reciever={element.reciever}
              email={element.email}
              subject={element.subject}
              body={element.body ? element.body : ''}
              isRead={sent == true ? true : element.read}
              key={element.id}
              id={element.id}
              time={element.time}
              onDelete={deleteHandler}
            />
          );
        })}
      </div>
    </>
  );
};

export default EmailList;
