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

const isNotEmpty = (value) => value.trim() !== "";
const isPassword = (value) => value.length >= 6;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let formIsValid = false;

  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    value: admissionNoValue,
    isValid: admissionNoIsValid,
    hasError: admissionNoHasError,
    valueChangeHandler: admissionNoChangeHandler,
    inputBlurHandler: admissionNoBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isPassword);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(admissionNoValue);
    console.log(passwordValue);
    if (admissionNoIsValid && passwordIsValid) {
      formIsValid = true;
    }

    if (!formIsValid) {
      setIsError("Please fill all fields.");
      return;
    }
    const payload = {
      admissionNo: admissionNoValue,
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
            <h1>Login Student</h1>
            <div className={classes["sub--text"]}>
              Please enter your credentials below.
            </div>

            <div className={classes["input--container"]}>
              <div className={classes["input__control"]}>
                <input
                  className={classes[admissionNoHasError ? "invalid" : "input"]}
                  type="text"
                  placeholder="admissionNo"
                  value={admissionNoValue}
                  onChange={admissionNoChangeHandler}
                  onBlur={admissionNoBlurHandler}
                />
                {admissionNoHasError && (
                  <p className={classes["error-text"]}>
                    Please provide a valid Admission number
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

