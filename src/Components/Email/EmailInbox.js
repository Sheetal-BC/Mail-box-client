
import React from "react";
import { faSquare, faStar, faTrashCan} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import './EmailInbox.css';
import { getDetailOnClick } from "../store/mailSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

const EmailInbox = ({
  Sender,
  reciever,
  email,
  subject,
  body,
  time,
  isRead,
  onDelete,
  id,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  let emailBody = parse(body);
  //  let mailBody = emailBody.replace(/(<([^>]+)>)/gi, "");

  let timestamps = new Date(time).toLocaleTimeString(time);

  const openMail = async () => {
    dispatch(
      getDetailOnClick({
        Sender,
        reciever,
        email,
        subject,
        body,
        time,
        isRead,
        id,
      })
    );
    const data = {
      read: true,
    };
    try {
      const response = await axios.patch(
        `https://mail-box-client-8aa4b-default-rtdb.firebaseio.com/${reciever}/receive/${id}.json`,
        data
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    history.push("/mail");
  };

  return (
    <>
      <div className="list">
        <div onClick={openMail} className="mailBody">
          <div className="mailBody_left">
            <FontAwesomeIcon icon={faSquare} />
            {!isRead && <h1 className={isRead ? "read" : "unread"}>•</h1>}
            <h4 className={isRead ? "read" : "unread"}>{Sender}</h4>
          </div>
          <div className="mailBody_middle">
            <div className="mailBody_middle_msg">
              <FontAwesomeIcon icon={faStar} />
              <h6>
                <b className={isRead ? "read" : "unread"}>{subject}</b>
                {emailBody}
              </h6>
            </div>
          </div>

          <div className="mailBody_right">
            <p className={isRead ? "read" : "unread"}>{timestamps}</p>
          </div>
        </div>
        <button onClick={() => onDelete(id)}>
          <FontAwesomeIcon icon={faTrashCan} size="2x" />
        </button>
      </div>
    </>
  );
};

export default EmailInbox;