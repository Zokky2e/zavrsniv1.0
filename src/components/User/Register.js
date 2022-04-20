import React from "react";

function Register() {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <div>
          <label htlmfor="email">Email:</label>
          <input type="email" required id="email" />
        </div>
        <div>
          <label htlmfor="password">Password</label>
          <input type="password" required id="password" />
        </div>
        <div>
          <label htlmfor="re-password">Retype Password</label>
          <input type="password" required id="re-password" />
        </div>
        <div>
          <button>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
