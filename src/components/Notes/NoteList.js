import { ref, set } from "firebase/database";
import React, { useRef, useState } from "react";
import { db } from "../../firebase";
import { useAuthValue } from "../User/UserContext";
import Note from "./Note";
import classes from "./NoteList.module.css";
function NoteList(props) {
  const currentUser = useAuthValue();
  const [content, changeContent] = useState(null);
  const textInputRef = useRef();
  function onCancelHandler() {
    changeContent(null);
  }
  function onAddHandler() {
    const dateString = Date.now().toString();
    const dbRef = ref(
      db,
      currentUser.uid + "/" + props.value + "/notes/" + dateString
    );
    const enteredText = textInputRef.current.value;

    set(dbRef, enteredText).then(console.log("added note: " + enteredText));
    changeContent(null);
  }
  function onAddNewNoteHandler() {
    changeContent(
      <div>
        <input
          type="text"
          required
          id="text"
          ref={textInputRef}
          placeholder="enter note"
        />
        <button onClick={onAddHandler}>Add</button>
        <span style={{ cursor: "pointer" }} onClick={onCancelHandler}>
          {" "}
          X
        </span>
      </div>
    );
  }

  return (
    <div>
      <div>date: {props.value}</div>
      <ul className={classes.list}>
        {props.notes.map((note) => (
          <Note  kljuc={note.key} date={props.value} data={note.childData} />
        ))}
      </ul>
      {content}
      <button onClick={onAddNewNoteHandler}>Add new Note</button>
    </div>
  );
}

export default NoteList;
