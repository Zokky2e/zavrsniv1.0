import React, { useState } from "react";
import Note from "./Note";
import classes from "./NoteList.module.css"
function NoteList(props) {
    const [content, changeContent] = useState(null);
    function onCancelHandler(){
      changeContent(null);
    }
  function onAddHandler(){
      console.log("fake add")
      changeContent(null)
  }
    function onAddNewNoteHandler() {
      changeContent(
        <div>
          <input type="text" placeholder="enter note" />
          <button onClick={onAddHandler}>Add</button>
          <span style ={{cursor: "pointer"}} onClick={onCancelHandler}> X</span>
        </div>
      );
    }

  return (
    <div>
      <div>date: {props.value}</div>
      <ul className={classes.list}>
        {props.notes.map((note) => (
          <Note key={note.key} data={note.childData} />
        ))}
      </ul>
      {content}
      <button onClick={onAddNewNoteHandler}>Add new Note</button>
    
    </div>
  );
}

export default NoteList;
