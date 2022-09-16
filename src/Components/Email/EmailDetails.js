import React from "react";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faShieldXmark,
  faFolderArrowUp,
  faEllipsisH,
  faCaretUp,
  faCaretDown,
  faXmark,
  faCircleUser,
  faPrint,
} from "@fortawesome/sharp-solid-svg-icons";
import {
  faArrowLeft,
  faReply,
  faReplyAll,
  faArrowRight,
  faArchive,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./EmailDetails.css";

function EmailDetails() {
  const history = useHistory();
  const selectedEmail = useSelector((state) => state.mail.openMessage);
  if (selectedEmail === null) return null;

  const Sname = selectedEmail.Sender.replace(/[0-9]/g, "").toUpperCase();
  const Rname = selectedEmail.reciever.replace(/[0-9]/g, "").toUpperCase();
  const mailBody = parse(selectedEmail.body);
  let timestamps = new Date(selectedEmail.time).toLocaleString(
    selectedEmail.time
  );
  return (
    <div className="mails">
      <div className="mail_tools">
        <div className="mail_toolsleft">
          <FontAwesomeIcon
            onClick={() => history.push("/inbox")}
            icon={faArrowLeft}
            size="1x"
          />
          <p>Back</p>
          <FontAwesomeIcon icon={faReply} size="1x" />
          <FontAwesomeIcon icon={faReplyAll} size="1x" />
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </div>
        <div className="mail_toolsmiddle">
          <FontAwesomeIcon icon={faArchive} size="1x" />
          <p>Archive</p>
          <FontAwesomeIcon icon={faFolderArrowUp} size="1x" />
          <p>Move</p>
          <FontAwesomeIcon icon={faTrashCan} size="1x" />
          <p>Delete</p>
          <FontAwesomeIcon icon={faShieldXmark} size="1x" />
          <p>Spam</p>
          <FontAwesomeIcon icon={faEllipsisH} size="1x" />
        </div>
        <div className="mail_toolsright">
          <FontAwesomeIcon icon={faCaretUp} size="1x" />
          <FontAwesomeIcon icon={faCaretDown} size="1x" />
          <FontAwesomeIcon icon={faXmark} size="1x" />
        </div>
      </div>
      <div className="mail_body">
        <div className="mail_bodyHeader">
          <div className="mail_header">
            <h2>{selectedEmail.subject}</h2>
          </div>
        </div>
        <div className="mail_subheader">
          <div className="Subheader_main">
            <div className="subheader">
              <div className="user_icon">
                <FontAwesomeIcon icon={faCircleUser} size="3x" />
              </div>
             <div className="sender">
              <h2>{Sname}<span>
                {"<"}
                {selectedEmail.email}
                {">"}</span></h2>
              
              
                <h3>To:{Rname}</h3>
              </div>
            </div>
          </div>
          <div className="printIcon">
            <FontAwesomeIcon icon={faPrint} size="1x" />
            <p>{timestamps}</p>
          </div>
        </div>

        <div className="mail_message">
          <h3>{mailBody}</h3>
        </div>
      </div>
    </div>
  );
}

export default EmailDetails;
