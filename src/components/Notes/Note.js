import { ref, remove, set } from "firebase/database";
import React, { useRef, useState } from "react";
import { db } from "../../firebase";
import Frame from "../UI/Frame";
import { useAuthValue } from "../User/UserContext";
import classes from "./Note.module.css";
import Popup from "./Popup";

function Note(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const currentUser = useAuthValue();
  const textInputRef = useRef();
  const [content, changeContent] = useState(null);

  function onDeleteHandler() {
    changeContent(null);
    setButtonPopup(false);
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
    set(dbRef, enteredText).then(setButtonPopup(false));
  }
  function onCancelEditHandler() {
    changeContent(
      <>
        <h2>{props.data}</h2>
        
      </>
    );
  }

  function onEditHandler() {
    changeContent(
      <div>
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

  return (
    <>
      <Frame>
        <li className={classes.item}>
          <span
            onClick={() => {
              changeContent(<h2>{props.data}</h2>);
              setButtonPopup(true);
            }}
          >
            {props.data}
          </span>
        </li>
      </Frame>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        {content}
        <div>
          <button className={classes.button} onClick={onEditHandler}>
            Edit
          </button>
          <button className={classes.button} onClick={onDeleteHandler}>
            Delete
          </button>
        </div>
      </Popup>
    </>
  );
}

export default Note;
