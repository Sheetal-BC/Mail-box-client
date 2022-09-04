import React, {useRef, useState, useEffect} from "react";
import { useHistory, Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from '../store/auth';
import './Auth.css';

const Auth = () => {

const inputEmailRef = useRef();
const inputPasswordRef = useRef();
const confirmPasswordRef = useRef();
const [isLogin, setIsLogin] = useState(false);
const [isLoading, setIsLoading] = useState(false);
 const history = useHistory();
 const dispatch = useDispatch();


const switchHandler = () => {
  setIsLogin((prevState) => !prevState);
};

useEffect(() => {
  checkUser();
}, []);

 const checkUser = () => {
   const token_id = localStorage.getItem("Token");
   if (token_id !== null) {
     AuthenticateAndRedirect({ idToken: token_id });
     history.replace("/home");
   }
 };

const submitHandler = async(event) => {
 event.preventDefault();

 const enteredEmail = inputEmailRef.current.value;
 const enteredPassword = inputPasswordRef.current.value;

 setIsLoading(true);
 if (isLogin) {
   try {
     const response = await fetch(
       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBeW5V8nQwm_WaQTWlUw0t7uttWCO4zUf8",
       {
         method: "POST",
         body: JSON.stringify({
           email: enteredEmail,
           password: enteredPassword,
           returnSecureToken: true,
         }),
         headers: {
           "Content-Type": "application/json",
         },
       }
     );
     if (response.ok) {
       const data = await response.json();
       console.log(data);
       console.log("User has successfully Logged in.");
       localStorage.setItem("Token", data.idToken);
       localStorage.setItem("userID", data.localId);
       inputEmailRef.current.value = "";
       inputPasswordRef.current.value = "";
       setIsLoading(false);
       AuthenticateAndRedirect(data);
     } else {
       const data = await response.json();
       alert(data.error.message);
     }
   } catch (err) {
     console.log("Logging Something went wrong!");
   }
 }else if (!isLogin) {
   if (inputPasswordRef.current.value === confirmPasswordRef.current.value) {
     try {
       const response = await fetch(
         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBeW5V8nQwm_WaQTWlUw0t7uttWCO4zUf8",
         {
           method: "POST",
           body: JSON.stringify({
             email: enteredEmail,
             password: enteredPassword,
             returnSecureToken: true,
           }),
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
       if (response.ok) {
         alert("User has successfully signed up.");
         inputEmailRef.current.value = "";
         inputPasswordRef.current.value = "";
         confirmPasswordRef.current.value = "";
         setIsLogin(true);
         setIsLoading(false);
       } else {
         const data = await response.json();
         alert(data.error.message);
       }
     } catch (error) {
       console.log(error);
     }
   } else {
     alert("Password doesnot match.");
   }
 }
 
}

  const AuthenticateAndRedirect = (data) => {
    dispatch(login(data.idToken));
    history.replace("/home");
  };

    return (
      <div className="container">
        <div className="img-container">
          <img src={process.env.PUBLIC_URL + "gmail.png"} alt="mail"></img>
        </div>
        <div className="signup">
           <form onSubmit={submitHandler}>
          <div className="heading">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>

            <div className="useremail">
              <input
                className={isLogin ? "input-login" : "input-signup"}
                type="email"
                placeholder="Email"
                htmlFor="email"
                ref={inputEmailRef}
                required
              />
            </div>
            <div className="userpassword">
              <input
                className={isLogin ? "input-login" : "input-signup"}
                type="password"
                placeholder="Password"
                htmlFor="password"
                minLength="6"
                maxLength="16"
                ref={inputPasswordRef}
                required
              />
            </div>
            <div className="confirmpassword ">
              {!isLogin && (
                <input
                  className="input-signup"
                  type="password"
                  placeholder="Confirm Password"
                  htmlFor="password"
                  minLength="6"
                  maxLength="16"
                  ref={confirmPasswordRef}
                  required
                />
              )}
            </div>
            <div className="sign-btn">
              {!isLoading && <button>{isLogin ? "Login" : "Sign up"}</button>}
              {isLoading && <p>Sending request...</p>}
              {isLogin && <Link to="/forgotpassword">Forgot Password</Link>}
            </div>
          </div>
        </form>
        <div className="msg-box">
          <button onClick={switchHandler}>
            {isLogin ? "Dont have an acount? SignUp" : "Have an account? login"}
          </button>
        </div>
        </div>
       
      </div>
    );
}

export default Auth;