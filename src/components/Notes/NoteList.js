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
    let note = {
      description: enteredDescription,
      title: enteredTitle,
      priority: enteredPriority,
    };

    set(dbRef, note).then(console.log("added note: " + note));
    setButtonPopup(false);
  }
  return (
    <div>
      <div className={classes.date}>{props.value}</div>
      <ul className={classes.list}>
        {props.notes &&
          props.notes.map((note) => (
            <Note date={props.value} kljuc={note.key} data={note.childData} />
          ))}
        <li>
          <button
            id="new-note"
            className={classes.addButton}
            onClick={() => setButtonPopup(true)}
          >
            <i className="bi bi-plus-square"></i>
          </button>
        </li>
      </ul>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div className={classes.newNote}>
          <label htmlFor="title">Title:</label>
          <br />
          <input autoFocus={true} id="title" type="text" ref={titleInputRef} />
          <br />
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            type="text"
            ref={descriptionInputRef}
            rows="2"
          />
          <br />
          <label htmlFor="priority">Priority:</label>
          <br />
          <input id="priority" type="number" ref={priorityInputRef} />
          <br />
          <div className={classes.buttonHolder}>
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
    </div>
  );
}

export default NoteList;
