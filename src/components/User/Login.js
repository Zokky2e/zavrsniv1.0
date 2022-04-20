function Login() {
  return (
    <div>
      <h1>Login</h1>
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
          <button>Login</button>
        </div>
      </form>
    </div>
  );
}
export default Login;
