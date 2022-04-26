import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthValue } from "../components/User/UserContext";
import { useNavigate } from "react-router-dom";
import Frame from "../components/UI/Frame";

function Profile() {
  const currentUser = useAuthValue();
  const navigate = useNavigate();
  function onSignOutHandler() {
    signOut(auth).then(navigate("/", { replace: true }));
  }

  

  return (
    <Frame>
      <div style={{"margin": "15px"}}>
        <p>
          <strong>Email: </strong>
          {currentUser?.email}
        </p>
        <button onClick={onSignOutHandler}>Sign Out</button>
      </div>
    </Frame>
  );
}

export default Profile;
