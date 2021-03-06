import React, { useEffect, useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import { useHistory } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";
import { sendUserData } from "../store/user/user-actions";

const AuthForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loginMode, setLoginMode] = useState(true);
  const [initial, setInitial] = useState(true);
  const user = useSelector((state) => state.user.email);
  let email = useRef();
  let password = useRef();

  const switchAuthModeHandler = () => {
    setLoginMode((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newUser = {
      email: email.current.value,
      password: password.current.value,
    };

    if (loginMode) {
      dispatch(sendUserData(newUser, "login"));
    } else {
      dispatch(sendUserData(newUser, "register"));
    }
  };

  // Redirect after changes in user for example successfuly logged in
  useEffect(() => {
    if (initial) {
      setInitial(false);
      return;
    }
    history.replace("/");
  }, [user]);

  return (
    <section className={classes.auth}>
      <h1>{loginMode ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={email} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={password} />
        </div>
        <div className={classes.actions}>
          <button>{loginMode ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {loginMode ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
