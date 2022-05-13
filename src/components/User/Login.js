import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import classes from './LoginItem.module.css';
import signInClasses from "./SignIn.module.css";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className={signInClasses.frame}>
      {error && <div className="auth__error">{error}</div>}
      <form className={classes.form} onSubmit={login} name="login_form">
        <div className={classes.control}>
          <label htlmfor="email">Email:</label>
          <input
            type="email"
            required
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htlmfor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
export default Login;
