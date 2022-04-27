import { ref, remove } from "firebase/database";
import React, { useState } from "react";
import { db } from "../../firebase";
import Frame from "../UI/Frame";
import { useAuthValue } from "../User/UserContext";
import classes from "./Note.module.css";

function Note(props) {
  const [content, changeContent] = useState(null);
  const currentUser = useAuthValue();

  function onDeleteHandler() {
    const dbRef = ref(
      db,
      currentUser.uid + "/" + props.date + "/notes/" + props?.kljuc
    );
    remove(dbRef).then(console.log("deleted key: " + props?.kljuc));
  }
  function onEditHandler() {
    //TODO
  }

  function onClickHandler() {
    if(content){
      changeContent(null)
    }else{
      changeContent(
        <div style={{ float: "right" }}>
          <button className={classes.button} onClick={onEditHandler}>Edit</button>
          <button className={classes.button} onClick={onDeleteHandler}>Delete</button>
        </div>
      );
    }
    
  }

  return (
    <Frame>
      <li className={classes.item}>
        <span onClick={onClickHandler}>{props.data}</span>
        {content}
      </li>
      
    </Frame>
  );
}

export default Note;
