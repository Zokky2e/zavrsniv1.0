import React, { useState } from "react";
import { Calendar } from "react-calendar";
import { useAuthValue } from "../components/User/UserContext";
import "react-calendar/dist/Calendar.css";
import Note from "../components/Notes/Note";
function MyNotes() {
  const [value, onChange] = useState(new Date());
  const currentUser = useAuthValue();
  if (currentUser === null) {
    return <div>Not signed in, no notes</div>;
  }

  return (
    <div style={{display: "flex"}}>
      <div style={{ flex: "1" }}>{<Note value = {value}/>}</div>
      <div style={{ flex: "1" }}>
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
}
export default MyNotes;
