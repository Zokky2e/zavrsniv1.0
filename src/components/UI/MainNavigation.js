
import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthValue } from "../User/UserContext";

import classes from "./MainNavigation.module.css";
import {themes, useThemeValue} from "./ThemeContext";

function MainNavigation() {
  const currentUser = useAuthValue();
  const theme = useThemeValue();
  const [content, setContent] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const userName = currentUser?.email.substring(0, 6);
  useEffect(() => {
    theme.changeTheme(darkMode ? themes.dark : themes.light);
    if (currentUser === null) {
      setContent(
        <Link to="sign-in">
          <span className={classes.profile}>Sign In</span>
        </Link>
      );
    } else {
      setContent(
        <Link to="/profile">
          <span className={classes.profile}>{userName}</span>
        </Link>
      );
    }
  }, [currentUser, userName, darkMode, theme]);



  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <li>{content}</li>
        <div style={{ marginLeft: "15px" }} >
          <span
            className={classes.profile}
            onClick={() => {
              setDarkMode(!darkMode)
              
            }}
          >
            {darkMode ? "dark" : "light"}
          </span>
        </div>
        <li className={classes.notes}>
          <Link to="/">Notes</Link>
        </li>
        
      </div>
      
    </header>
  );
}

export default MainNavigation;
