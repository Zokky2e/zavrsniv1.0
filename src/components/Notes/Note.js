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
  const titleInputRef = useRef();
  const priorityInputRef = useRef();
  const [content, changeContent] = useState(null);

  function onDeleteHandler() {
    //TODO add 2other refrences for deleting the note
    changeContent(null);
    setButtonPopup(false);
    const dbRef = ref(
      db,
      currentUser.uid + "/" + props.date + "/notes/" + props?.kljuc
    );
    remove(dbRef).then(console.log("deleted key: " + props?.kljuc));
  }

  function onConfirmEditHandler() {
    //TODO add 2other refrences for editing the note
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
        <h2>{props.data}</h2>{/*props.data.title*/}
        <p>Priority: 1</p>{/*props.data.priority*/}
        <p>Plan text... probably some info about the plan</p>{/*props.data.text*/}
        <div>
          <button className={classes.button} onClick={onEditHandler}>
            Edit
          </button>
          <button className={classes.button} onClick={onDeleteHandler}>
            Delete
          </button>
        </div>
      </>
    );
  }

  function onEditHandler() {
    changeContent(
      <>
        <div className={classes.editNote}>
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
        </div>
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
      </>
    );
  }

  return (
    <>
      <Frame>
        <li className={classes.item}>
          <span
            onClick={() => {
              changeContent(
                <>{/*EDIT AS IN CANCEL */} 
                  <h2>{props.data}</h2>
                  <p>Priority: 1</p>
                  <p>Plan text... probably some info about the plan</p>
                  <div>
                    <button className={classes.button} onClick={onEditHandler}>
                      Edit
                    </button>
                    <button
                      className={classes.button}
                      onClick={onDeleteHandler}
                    >
                      Delete
                    </button>
                  </div>
                </>
              );
              setButtonPopup(true);
            }}
          >
            {/*TODO change props.data.title of the note*/}
            {props.data}
          </span>
        </li>
      </Frame>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div>
          {content}
          <br />
        </div>
      </Popup>
    </>
  );
}

export default Note;
