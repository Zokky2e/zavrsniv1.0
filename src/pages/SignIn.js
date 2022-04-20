import Login from "../components/User/Login";
import React, { useState } from "react";
import Register from "../components/User/Register";

function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  function onClickLoginHandler() {
    setIsLogin(true);
  }
  function onClickRegisterHandler() {
    setIsLogin(false);
  }
  return (
    <div>
      <div>
        <button onClick={onClickLoginHandler}>Login</button>
        <button onClick={onClickRegisterHandler}>Register</button>
      </div>
      <div>{isLogin ? <Login /> : <Register />}</div>
    </div>
  );
}
export default SignIn;
