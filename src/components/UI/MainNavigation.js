import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthValue } from "../User/UserContext";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const currentUser = useAuthValue();
  const [content, setContent] = useState(null);
  const userName = currentUser?.email.substring(0, 6);
  useEffect(() => {
    if (currentUser === null) {
      setContent(<Link to="sign-in"><span className={classes.profile}>Sign In</span></Link>);
    } else {
      setContent(<Link to="/profile"><span className={classes.profile}>{userName}</span></Link>);
    }
  }, [currentUser, userName]);
  return (
    <header className={classes.header}>
      <div className={classes.inner}><ul>
          <li>{content}</li>

          <li className={classes.notes}>
            <Link to="/">Notes</Link>
          </li>
        </ul></div>
        
    </header>
  );
}

export default MainNavigation;
