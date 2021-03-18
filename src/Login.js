import { Domain } from "@material-ui/icons";
import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const login = (event) => {
    event.preventDefault(); // this stops the button from refreshing

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // logged in, redirect to homepage...
        
        history.push("/"); // this is used to push and validate logged password to db
      })
      .catch((e) => alert(e.message));
  };

  const register = (event) => {
    event.preventDefault(); // stops the refresh
    // the register logic goes here
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // created  user and logged in, redirect to homepage
        if (auth) {
          history.push("/");
        }
        
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>Email</h5>
          <input
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <h5>Password </h5>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="login__signInButton" onClick={login} Sign In>
            Sign in
          </button>
          {/* <input type="submit" /> */}
        </form>

        <p>
          By signing-in you agree to Amazon"s Conditions of Use & Sale . Please
          see our Privacy Notice, our Cookies Notice and our Interest-Based Ads
          Notice.
        </p>
        <button className="login__registerButton" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
