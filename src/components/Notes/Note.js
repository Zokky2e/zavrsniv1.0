import { ref, remove } from "firebase/database";
import React, { useState } from "react";
import { db } from "../../firebase";
import { useAuthValue } from "../User/UserContext";
import classes from "./Note.module.css";

function Note(props) {
  const [content, changeContent] = useState();
  const currentUser = useAuthValue();

  function onDeleteHandler() {
    const dbRef = ref(db, currentUser.uid + "/" + props.date + "/notes/"+props?.kljuc);
    remove(dbRef).then(
      console.log("deleted key: " + props?.kljuc)
    );
  }

  function onClickHandler() {
    changeContent(
      <div style={{ float: "right" }}>
        <span>Edit</span>
        <span onClick={onDeleteHandler}>Delete</span>
      </div>
    );
  }

  return (
    <li className={classes.item}>
      <span onClick={onClickHandler}>{props.data}</span>
      {content}
    </li>
  );
}

export default Note;
