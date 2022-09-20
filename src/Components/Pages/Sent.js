import React, { useEffect } from "react";
import EmailList from "../Email/EmailList";
import {getSendMails } from "../store/mailSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";


const Sent = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.mail.sentMails);
  const aftermessagesent = useSelector((state) => state.mail.sendMessageIsOpen);
  let arr = [];

  useEffect(() => {
    fecthMails();
  }, [aftermessagesent]);

  const fecthMails = async () => {
    const emailName = localStorage.getItem("email");
    const name = emailName.substring(0, emailName.lastIndexOf("@"));
    try {
      const res = await axios.get(
        `https://mail-box-client-8aa4b-default-rtdb.firebaseio.com/${name}/send.json`
      );
      if (res.statusText === "OK") {
        let index = 0;
        for (const key in res.data) {
          arr[index] = res.data[key];
          arr[index].id = key;
          index++;
        }
        dispatch(getSendMails(arr));

        console.log(arr);
      }
    } catch (err) {
      console.log(`${err}`);
    }
  };
  const deleteHandler = (id) => {
    const emailName = localStorage.getItem("email");
    const name = emailName.substring(0, emailName.lastIndexOf("@"));

    try {
      const res = axios
        .delete(
          `https://mail-box-client-8aa4b-default-rtdb.firebaseio.com/${name}/send/${id}.json`
        )
        .then((res) => {
          // fecthMails();
        });
      const result = email.filter((item) => item.id !== id);
      dispatch(getSendMails(result));
      console.log("result", result);
      console.log("sent mails", email);

      console.log("Sucessfully deleted");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <EmailList email={email} deleteHandler={deleteHandler} sent={true} />
    </div>
  );
};

export default Sent;
