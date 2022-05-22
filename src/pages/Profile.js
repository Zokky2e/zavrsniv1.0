import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthValue } from "../components/User/UserContext";
import { useNavigate } from "react-router-dom";
import classes from "../components/User/SignIn.module.css";

function Profile() {
  const currentUser = useAuthValue();
  const navigate = useNavigate();
  function onSignOutHandler() {
    signOut(auth).then(navigate("/", { replace: true }));
  }
  return (
    <div className={classes.containerProfile}>
      <div>
        <strong>Email: </strong>
        {currentUser?.email}
      </div>
      <br />
      <button onClick={onSignOutHandler}>Sign Out</button>
    </div>
  );
}

export default Profile;
