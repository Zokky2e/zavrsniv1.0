import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import classes from "./Register.module.css";
import signInClasses from "./SignIn.module.css";
function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = () => {
    let isValid = true;
    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        setError("Passwords does not match");
      }
    }
    return isValid;
  };
  const register = (e) => {
    e.preventDefault();
    setError("");
    if (validatePassword()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res.user);
        })
        .catch((err) => setError(err.message))
        .then(() => {
          navigate("/", { replace: true });
        })
        .catch((err) => alert(err.message));
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={signInClasses.frame}>
      {error && <div className="auth__error">{error}</div>}
      <form
        className={classes.form}
        onSubmit={register}
        name="registration_form"
      >
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
        <div className={classes.control}>
          <label htlmfor="re-password">Retype Password</label>
          <input
            type="password"
            required
            id="re-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
