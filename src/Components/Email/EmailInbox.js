
import React from "react";
import { faSquare, faStar} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import parse from "html-react-parser";
import './EmailInbox.css';

const EmailInbox = (props) => {
   let emailBody = parse(props.body);
  //  let mailBody = emailBody.replace(/(<([^>]+)>)/gi, "");

   let times = props.time;
   let timestamps = new Date(times).toLocaleTimeString(times);
   console.log(timestamps)
    return (
      <div className="mailBody">
        <div className="mailBody_left">
          <FontAwesomeIcon icon={faSquare} />
          <h4>{props.Sender}</h4>
        </div>
        <div className="mailBody_middle">
          <div className="mailBody_middle_msg">
            <FontAwesomeIcon icon={faStar} />
           <h6><b>{props.subject}</b>{emailBody}</h6>
                
          </div>
        </div>
        <div className="mailBody_right">
          <p>{timestamps}</p>
        </div>
      </div>
    );
    
}

export default EmailInbox;