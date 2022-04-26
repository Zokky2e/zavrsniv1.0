import Login from "../components/User/Login";
import React, { useState } from "react";
import Register from "../components/User/Register";
import classes from "../components/User/SignIn.module.css";
function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  function onClickLoginHandler() {
    setIsLogin(true);
  }
  function onClickRegisterHandler() {
    setIsLogin(false);
  }
  let active = classes.active;
  let inactive = classes.inactive;

  return (
    <div className={classes.content}>
      <ul className={classes.signIn} role="tablist">
        <li className={isLogin ? active : inactive} onClick={onClickLoginHandler}>
          <span className={classes.item}>Login</span>
        </li>
        <li className={isLogin ? inactive : active} onClick={onClickRegisterHandler}>
          <span className={classes.item} >Register</span>
        </li>
      </ul>
      <div>{isLogin ? <Login /> : <Register />}</div>
    </div>
  );
}
export default SignIn;
