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
  const descriptionInputRef = useRef();
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
    const enteredDescription = descriptionInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredPriority = priorityInputRef.current.value;
    let note={
      description: enteredDescription,
      title: enteredTitle,
      priority: enteredPriority
    };

    set(dbRef, note).then(console.log("added note: " + note));
    setButtonPopup(false);
  }

  return (
    <div>
      <div className={classes.date}>{props.value}</div>
      <ul className={classes.list}>
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
            type="text"
            ref={titleInputRef}
            placeholder="enter title"
          />
          <br />
          <label htmlFor="description">Description:</label>
          <br />
          <input
            id="description"
            type="text"
            ref={descriptionInputRef}
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
