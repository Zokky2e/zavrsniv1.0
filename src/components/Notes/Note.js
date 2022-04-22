import React from "react";
function Note(props) {
  return (
    <div>
      <div>My Notes</div>
      <div>{props.value.toDateString()}</div>
    </div>
  );
}

export default Note;
