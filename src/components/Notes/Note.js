import React, {} from "react";
import {} from "../User/UserContext";
import classes from "./Note.module.css";




function Note(props) {
  
  
  return (
    <li className={classes.item}>
      <div>{props.data}</div>
    </li>
  );
}

export default Note;
