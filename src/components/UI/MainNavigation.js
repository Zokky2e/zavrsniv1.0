import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthValue } from "../User/UserContext";

import classes from "./MainNavigation.module.css";
import { themes, useThemeValue } from "./ThemeContext";
import ToggleSwitch from "./ToggleSwitch";

function MainNavigation() {
  const time = new Date();
  const currentUser = useAuthValue();
  const theme = useThemeValue();
  const [content, setContent] = useState(null);
  const [darkMode, setDarkMode] = useState(
    !(7 < time.getHours() && time.getHours() < 19)
  );
  const userName = currentUser?.email.substring(0, 6);
  useEffect(() => {
    setContent(null);
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

        <li className={classes.notes}>
          <Link to="/">Notes</Link>
        </li>
        <li className={classes.toggleSwitch}>
          <ToggleSwitch darkMode={darkMode} changeMode={setDarkMode} />
        </li>
      </div>
    </header>
  );
}

export default MainNavigation;
