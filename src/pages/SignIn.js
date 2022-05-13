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
    <div className={classes.container}>
      <div className={classes.signIn}>
        <div className={isLogin ? active : inactive} onClick={onClickLoginHandler}>
          <span className={classes.item}>Login</span>
        </div>
        <div className={isLogin ? inactive : active} onClick={onClickRegisterHandler}>
          <span className={classes.item} >Register</span>
        </div>
      </div>
      <div>{isLogin ? <Login /> : <Register />}</div>
    </div>
  );
}
export default SignIn;
