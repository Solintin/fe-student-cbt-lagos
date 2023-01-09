import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import Section from "../../components/Section";
import NavAuth from "../../components/NavAuth";
import CardAuth from "../../components/CardAuth";
import useInput from "../../Hooks/use-input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LoginAction } from "../../Redux/Actions/ActionCreators";

const isEmail = (value) => value.includes("@", ".com");
const isPassword = (value) => value.length >= 6;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let formIsValid = false;

  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isPassword);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(emailValue);
    console.log(passwordValue);
    if (emailIsValid && passwordIsValid) {
      formIsValid = true;
    }

    if (!formIsValid) {
      setIsError("Please fill all fields.");
      return;
    }
    const payload = {
      email: emailValue,
      password: passwordValue,
    };
    setLoading(true);
    dispatch(LoginAction(payload, navigate, setLoading));
  };

  return (
    <Section>
      <NavAuth />

      <div className={classes["card__container"]}>
        <CardAuth>
          <form onSubmit={submitHandler}>
            <h1>Login</h1>
            <div className={classes["sub--text"]}>
              Please enter your credentials below.
            </div>

            <div className={classes["input--container"]}>
              <div className={classes["input__control"]}>
                <input
                  className={classes[emailHasError ? "invalid" : "input"]}
                  type="email"
                  placeholder="Email"
                  value={emailValue}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                />
                {emailHasError && (
                  <p className={classes["error-text"]}>
                    Please provide a valid email
                  </p>
                )}
              </div>

              <div className={classes["input__control"]}>
                <input
                  className={classes[passwordHasError ? "invalid" : "input"]}
                  type="password"
                  placeholder="Password"
                  value={passwordValue}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                />
                {passwordHasError && (
                  <p className={classes["error-text"]}>
                    Password must be at least 8 characters long
                  </p>
                )}
              </div>

              <button className={classes["btn--text"]}>Forget password?</button>

              {isError && <p className={classes["error-text"]}>{isError}</p>}

              <button
                disabled={loading}
                className={classes["btn--main"]}
                type="submit"
              >
                {!loading ? (
                  <p>Enter</p>
                ) : (
                  <div className="h-6 w-6 rounded-full border-4 border-t-[#fff] border-r-[#fff] border-b-primary-100 border-l-primary-100 animate-spin"></div>
                )}
              </button>

              <div className={classes["btn--text-2"]}>
                <span>Don’t have an account?</span>
                <Link to="/signup" className={classes["btn--text"]}>
                  Create an account
                </Link>
              </div>
            </div>
          </form>
        </CardAuth>
      </div>
    </Section>
  );
};

export default Login;

