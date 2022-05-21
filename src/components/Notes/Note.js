import { ref, remove, set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import Frame from "../UI/Frame";
import { useAuthValue } from "../User/UserContext";
import classes from "./Note.module.css";
import Popup from "./Popup";

function Note(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const currentUser = useAuthValue();

  const [title, changeTitle] = useState(props.data.title);
  const [description, changeDescription] = useState(props.data.description);
  const [priority, changePriority] = useState(props.data.priority);

  const itemRef = useRef();
  const [onHover, setOnHover] = useState();

  useEffect(() => {
    changeTitle(props.data.title);
    changeDescription(props.data.description);
    changePriority(props.data.priority);
    setOnHover(<h2>{props.data.title}</h2>);
    function onHoverEnterHandler(event) {
      if (itemRef.current.contains(event.target))
        setOnHover(
          <div className={classes.onHoverItem}>
            <h2>{props.data.title}</h2>
            <div>{props.data.description.substring(0, 20) + "..."}</div>
          </div>
        );
    }

    function onHoverLeaveHandler(event) {
      if (itemRef.current.contains(event.target))
        setOnHover(
          <div className={classes.onHoverItem}>
            <h2>{props.data.title}</h2>
          </div>
        );
    }

    document.addEventListener("mouseover", onHoverEnterHandler);
    document.addEventListener("mouseout", onHoverLeaveHandler);
    return () => {
      document.removeEventListener("mouseover", onHoverEnterHandler);
      document.removeEventListener("mouseout", onHoverLeaveHandler);
    };
  }, [props]);

  function onDeleteHandler() {
    setButtonPopup(false);
    const dbRef = ref(
      db,
      currentUser.uid + "/" + props.date + "/notes/" + props?.kljuc
    );
    remove(dbRef).then(console.log("deleted key: " + props?.kljuc));
  }

  function onConfirmEditHandler() {
    const dbRef = ref(
      db,
      currentUser.uid + "/" + props.date + "/notes/" + props?.kljuc
    );
    let enteredDescription = description;
    let enteredTitle = title;
    let enteredPriority = priority;
    if (enteredDescription === "") {
      enteredDescription = props.data.description;
    }
    if (enteredTitle === "") {
      enteredTitle = props.data.title;
    }
    if (enteredPriority === "") {
      enteredPriority = props.data.priority;
    }
    let note = {
      description: enteredDescription,
      title: enteredTitle,
      priority: enteredPriority,
    };
    set(dbRef, note)
      .then(setButtonPopup(false))
      .then(() => setUpdatePopup(false));
  }
  function onCancelEditHandler() {
    changeTitle(props.data.title);
    changePriority(props.data.priority);
    changeDescription(props.data.description);
    setUpdatePopup(false);
    setButtonPopup(true);
  }

  return (
    <>
      <Frame>
        <li
          onClick={() => {
            setButtonPopup(true);
          }}
          ref={itemRef}
          className={classes.item}
        >
          <span>{onHover}</span>
        </li>
      </Frame>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div>
          <h2>{title}</h2>
          <p>Priority: {priority}</p>
          <p>{description}</p>
          <div className={classes.buttonHolder}>
            <button
              className={classes.button}
              onClick={() => {
                setUpdatePopup(true);
                setButtonPopup(false);
              }}
            >
              Edit
            </button>
            <button className={classes.button} onClick={onDeleteHandler}>
              Delete
            </button>
          </div>
          <br />
        </div>
      </Popup>
      <Popup trigger={updatePopup} setTrigger={setUpdatePopup}>
        <>
          <div className={classes.editNote}>
            <label htmlFor="title">Title:</label>
            <br />
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => changeTitle(event.target.value)}
            />
            <br />
            <label htmlFor="description">Description:</label>
            <br />
            <textarea
              id="description"
              type="text"
              value={description}
              onChange={(event) => changeDescription(event.target.value)}
            />
            <br />
            <label htmlFor="priority">Priority:</label>
            <br />
            <input
              id="priority"
              type="number"
              value={priority}
              onChange={(event) => changePriority(event.target.value)}
            />
            <br />
            <div className={classes.buttonHolder}>
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
          </div>
        </>
      </Popup>
    </>
  );
}

export default Note;
