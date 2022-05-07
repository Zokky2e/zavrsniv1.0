import { ref, set } from "firebase/database";
import React, { useRef, useState } from "react";
import { db } from "../../firebase";
import { useAuthValue } from "../User/UserContext";
import Note from "./Note";
import classes from "./NoteList.module.css";
import Popup from "./Popup";
function NoteList(props) {
  const currentUser = useAuthValue();
  const [buttonPopup, setButtonPopup] = useState(false);
  const textInputRef = useRef();
  function onCancelHandler() {
    setButtonPopup(false)
  }
  function onAddHandler() {
    const dateString = Date.now().toString();
    const dbRef = ref(
      db,
      currentUser.uid + "/" + props.value + "/notes/" + dateString
    );
    const enteredText = textInputRef.current.value;

    set(dbRef, enteredText).then(console.log("added note: " + enteredText));
    setButtonPopup(false);
  }
  
  return (
    <div className={classes.container}>
      <div className={classes.date}>date: {props.value}</div>
      <ul className={classes.list}>
        {props.notes.map((note) => (
          <Note kljuc={note.key} date={props.value} data={note.childData} />
        ))}
      </ul>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div>
          <input
            className={classes.newNote}
            required
            rows="2"
            id="text"
            type="text"
            ref={textInputRef}
            placeholder="enter note"
          />
          <div><button className={classes.button} onClick={onAddHandler}>
            &#10004;
          </button>
          <button
            style={{ fontWeight: "bold" }}
            className={classes.button}
            onClick={onCancelHandler}
          >
            &#10005;
          </button></div>
        </div>
      </Popup>
      <button
        className={classes.addButton}
        onClick={() => setButtonPopup(true)}
      >
        Add new Note
      </button>
    </div>
  );
}

export default NoteList;
