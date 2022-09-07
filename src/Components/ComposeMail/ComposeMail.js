import React, {useRef, useState} from "react";
import { useDispatch } from "react-redux";
import {closeSendMessage} from '../store/mailSlice';
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import './ComposeMail.css';
import TextEditor from "../Editor/TextEditor";


const ComposeMail = () => {
  const emailRef = useRef();
  const subjectRef = useRef();
  const [text, setText] = useState("");
  const dispatch = useDispatch();

const sendMailHandler = async(event) =>{
     event.preventDefault();

      const enteredToEmail = emailRef.current.value;
      const senderEmail = localStorage.getItem('email');
      const reciever = enteredToEmail.substring(0, enteredToEmail.lastIndexOf("@"));
      const Sender = senderEmail.substring(0, senderEmail.lastIndexOf("@"));
      const data = {
        senderEmail,
        subject: subjectRef.current.value,
        body: text,
      };
      try{
          const res = await axios.post(
            `https://mail-box-client-8aa4b-default-rtdb.firebaseio.com/${reciever}/receive.json`,
            data
          );
          if(res.statusText==='OK'){

              const res2 = await axios.post(
                `https://mail-box-client-8aa4b-default-rtdb.firebaseio.com/${Sender}/send.json`,
                data
              );
              if(res2.statusText==='OK'){
                alert('Sent Mail Successfully');
                 dispatch(closeSendMessage());
              }else{
                  throw new Error('Error sending a mail');
              }

          }else{
            throw new Error("Error sending a mail");
          }
      }catch(err){
          alert(err);
      }
}
  
  const closeHandler = () =>{
    dispatch(closeSendMessage());
  }
  return (
    <div className="composeMail">
      <div className="composeMail_header">
        <h3>New Message</h3>
        <button className="composeMail_close" onClick={closeHandler}>
          x
        </button>
      </div>

      <form>
        <div className="compose_input">
          <input type="email" placeholder="To" ref={emailRef} required />
          <input type="text" placeholder="Subject" ref={subjectRef} required />

          <div className="editor">
            <label className="editor_label">Enter message</label>
            <TextEditor setText={setText} />
          </div>
        </div>

        <div className="send">
          <button onClick={sendMailHandler} className="sendMail">
            Send <FontAwesomeIcon icon={faPaperPlane} className="plane" size="1x" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ComposeMail;