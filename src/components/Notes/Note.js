import { ref, remove, set} from "firebase/database";
import React, { useRef, useState } from "react";
import { db } from "../../firebase";
import Frame from "../UI/Frame";
import { useAuthValue } from "../User/UserContext";
import classes from "./Note.module.css";

function Note(props) {
  const [content, changeContent] = useState(null);
  const currentUser = useAuthValue();
  const textInputRef = useRef();

  function onDeleteHandler() {
    changeContent(null);
    const dbRef = ref(
      db,
      currentUser.uid + "/" + props.date + "/notes/" + props?.kljuc
    );
    remove(dbRef).then(console.log("deleted key: " + props?.kljuc));
  }

  function onConfirmEditHandler() {
    console.log("i entered here!!");
    const dbRef = ref(
      db,
      currentUser.uid + "/" + props.date + "/notes/" + props?.kljuc
    );
    const enteredText = textInputRef.current.value;
    set(dbRef, enteredText).then(console.log("upated note: " + enteredText));
    changeContent(null);
  }
  function onCancelEditHandler() {
    changeContent(null)
  }

  function onEditHandler() {
    
    changeContent(
      <div >
        <input
          className={classes.newNote}
          required
          rows="2"
          id="text"
          type="text"
          placeholder="enter the edited contents"
          ref={textInputRef}
        />
        <button className={classes.button} onClick={onConfirmEditHandler}>
          &#10004;
        </button>
        <button
          style={{ fontWeight: "bold" }}
          className={classes.button}
          onClick={onCancelEditHandler}
        >
          &#10005;
        </button>
      </div>
    );
  }

  function onClickHandler() {
    if (content) {
      changeContent(null);
    } else {
      changeContent(
        <div style={{ float: "right" }}>
          <button className={classes.button} onClick={onEditHandler}>
            Edit
          </button>
          <button className={classes.button} onClick={onDeleteHandler}>
            Delete
          </button>
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
