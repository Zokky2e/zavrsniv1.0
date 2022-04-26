import React from "react";
import classes from "./Frame.module.css";
function Frame(props) {
  return <div className={classes.frame}>{props.children}</div>;
}

export default Frame;
