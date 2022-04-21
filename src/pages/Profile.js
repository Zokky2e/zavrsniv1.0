import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthValue } from "../components/User/UserContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const currentUser = useAuthValue();
  const navigate = useNavigate();
  function onSignOutHandler() {
    signOut(auth).then(navigate("/", { replace: true }));
  }
  return (
    <div>
      <div>
        <h1>Profile</h1>
        <p>
          <strong>Email: </strong>
          {currentUser?.email}
        </p>
        <button onClick={onSignOutHandler}>Sign Out</button>
      </div>
    </div>
  );
}

export default Profile;
