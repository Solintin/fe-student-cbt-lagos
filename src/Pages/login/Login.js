import React from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import Section from "../../components/Section";
import NavAuth from "../../components/NavAuth";
import CardAuth from "../../components/CardAuth";

const Login = () => {
  return (
    <Section>
      <NavAuth />

      <div className={classes["card__container"]}>
        <CardAuth>
          <form>
            <h1>Login</h1>
            <div className={classes["sub--text"]}>
              Please enter your credentials below.
            </div>

            <div className={classes["input--container"]}>
              <input
                className={classes.input}
                type="text"
                placeholder="Username"
              />
              <input
                className={classes.input}
                type="password"
                placeholder="Password"
              />

              <button className={classes["btn--text"]}>Forget password?</button>

              <button className={classes["btn--main"]} type="submit">
                ENTER
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
