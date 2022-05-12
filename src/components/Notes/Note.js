import { ref, remove, set } from "firebase/database";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import Frame from "../UI/Frame";
import { useAuthValue } from "../User/UserContext";
import classes from "./Note.module.css";
import Popup from "./Popup";

function Note(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const currentUser = useAuthValue();
  const itemRef = useRef();
  const descriptionInputRef = useRef();
  const titleInputRef = useRef();
  const priorityInputRef = useRef();
  const [content, changeContent] = useState(null);
  const [onHover, setOnHover] = useState(<h2>{props.data.title}</h2>);

  useEffect(() => {
    function onHoverEnterHandler(event) {
      if (itemRef.current.contains(event.target))
        setOnHover(
          <div className={classes.onHoverItem}>
            <h2>{props.data.title}</h2>
            <div>{props.data.description}</div>
          </div>
        );
    }

    function onHoverLeaveHandler(event) {
      if (itemRef.current.contains(event.target))
        setOnHover(
          <>
            <h2>{props.data.title}</h2>
          </>
        );
    }

    document.addEventListener("mouseover", onHoverEnterHandler);
    document.addEventListener("mouseout", onHoverLeaveHandler);
    return () => {
      document.removeEventListener("mouseover", onHoverEnterHandler);
      document.removeEventListener("mouseout", onHoverLeaveHandler);
    };
  });

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
    const dbRef = ref(
      db,
      currentUser.uid + "/" + props.date + "/notes/" + props?.kljuc
    );
    let enteredDescription = descriptionInputRef.current.value;
    let enteredTitle = titleInputRef.current.value;
    let enteredPriority = priorityInputRef.current.value;
    if (enteredDescription === "") {
      enteredDescription = props.data.description;
    }
    if (enteredTitle === "") {
      enteredTitle = props.data.title;
    }
    if(enteredPriority ===""){
      enteredPriority = props.data.priority;
    }
    let note = {
      description: enteredDescription,
      title: enteredTitle,
      priority: enteredPriority,
    };
    set(dbRef, note).then(setButtonPopup(false)).then( onCancelEditHandler());
    
  }
  function onCancelEditHandler() {
    console.log("entered")
    changeContent(
      <>
        <h2>{props.data.title}</h2>
        <p>Priority: {props.data.priority}</p>
        <p>{props.data.description}</p>
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
        <li
          onClick={() => {
            changeContent(
              <>
                <h2>{props.data.title}</h2>
                <p>Priority: {props.data.priority}</p>
                <p>{props.data.description}</p>
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
          {content}
          <br />
        </div>
      </Popup>
    </>
  );
}

export default Note;
