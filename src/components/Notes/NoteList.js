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
  const titleInputRef = useRef();
  const priorityInputRef = useRef();
  function onCancelHandler() {
    setButtonPopup(false);
  }
  function onAddHandler() {
    const dateString = Date.now().toString();
    const dbRef = ref(
      db,
      currentUser.uid + "/" + props.value + "/notes/" + dateString
    );
    //TODO add other two refrences into an object then send to database
    const enteredText = textInputRef.current.value;

    set(dbRef, enteredText).then(console.log("added note: " + enteredText));
    setButtonPopup(false);
  }

  return (
    <div>
      <div className={classes.date}>date: {props.value}</div>
      <ul className={classes.list}>
        {/*chaynge the maping of a note by editing the object values */}
        {props.notes.map((note) => (
          <Note date={props.value}  kljuc={note.key} data={note.childData} />
        ))}
      </ul>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className={classes.newNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            id="title"
            type="title"
            ref={titleInputRef}
            placeholder="enter title"
          />
          <br />
          <label htmlFor="text">Description:</label>
          <br />
          <input
            id="text"
            type="text"
            ref={textInputRef}
            placeholder="enter description"
          />
          <br />
          <label htmlFor="priority">Priority:</label>
          <br />
          <input
            id="priority"
            type="number"
            ref={priorityInputRef}
            placeholder="1-4"
          />
          <br />
          <div className={classes.date}>
            <button className={classes.button} onClick={onAddHandler}>
              &#10004;
            </button>
            <button
              style={{ fontWeight: "bold" }}
              className={classes.button}
              onClick={onCancelHandler}
            >
              &#10005;
            </button>
          </div>
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
