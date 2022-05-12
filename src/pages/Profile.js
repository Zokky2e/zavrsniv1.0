import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthValue } from "../components/User/UserContext";
import { useNavigate } from "react-router-dom";
import Frame from "../components/UI/Frame";
import classes from "../components/Notes/NoteList.module.css";

function Profile() {
  const currentUser = useAuthValue();
  const navigate = useNavigate();
  function onSignOutHandler() {
    signOut(auth).then(navigate("/", { replace: true }));
  }

  return (
    <div className={classes.container}>
      <Frame>
        <p>
          <strong>Email: </strong>
          {currentUser?.email}
        </p>
        <button onClick={onSignOutHandler}>Sign Out</button>
      </Frame>
    </div>
  );
}

export default Profile;
