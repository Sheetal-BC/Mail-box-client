import React, {useRef} from "react";
import './Auth.css';

const Auth = () => {

const inputEmailRef = useRef();
const inputPasswordRef = useRef();
const confirmPasswordRef = useRef();


const submitHandler = async(event) => {
 event.preventDefault();

 const enteredEmail = inputEmailRef.current.value;
 const enteredPassword = inputPasswordRef.current.value;

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
     } else {
       const data = await response.json();
       alert(data.error.message);
     }
   } catch (error) {
     console.log(error);
   }
 } else {
    alert('Password doesnot match.');
 }
}


    return (
      <div className="signup">
        <form onSubmit={submitHandler}>
          <div className="heading">
            <h2>Sign Up</h2>

            <div className="useremail">
              <input
                type="email"
                placeholder="Email"
                htmlFor="email"
                ref={inputEmailRef}
                required
              />
            </div>
            <div className="userpassword">
              <input
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
            </div>
            <div className="sign-btn">
            <button>Sign Up</button>
            </div>
          </div>
        </form>
        <div className="msg-box">
          <button>Dont have an acount? SignUp</button>
        </div>
      </div>
    );
}

export default Auth;