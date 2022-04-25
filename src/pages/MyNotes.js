import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { useAuthValue } from "../components/User/UserContext";
import "react-calendar/dist/Calendar.css";
import { db } from "../firebase";
import { onValue, ref, set } from "firebase/database";
import NoteList from "../components/Notes/NoteList";
import Frame from "../components/UI/Frame";
function MyNotes() {
  const [value, onChange] = useState(new Date());
  const [loadedNotes, setLoadedNotes] = useState([]);
  const currentUser = useAuthValue();
  const [calendarIsOpen, setCalendarIsOpen] = useState(false);

  function changeCalendarHandler() {
    setCalendarIsOpen(!calendarIsOpen);
  }
  function onChangeDate(e) {
    setCalendarIsOpen(!calendarIsOpen);
    onChange(e);
  }

  useEffect(() => {
    if (currentUser !== null) {
      let notes = ["Click me to edit!"];
      const dbRef = ref(
        db,
        currentUser.uid + "/" + value.toDateString() + "/notes"
      );
      onValue(dbRef, (snapshot) => {
        if (snapshot.exists()) {
          notes = [];
          setLoadedNotes([]);
          snapshot.forEach((childSnapshot) => {
            const note = {
              key: childSnapshot.key.toString(),
              childData: childSnapshot.val(),
            };
            notes.push(note);
          });
          setLoadedNotes(notes);
        } else set(dbRef, notes);
      });
    }
  }, [currentUser, value]);
  if (currentUser === null) {
    return <div>Not signed in, no notes</div>;
  }

  if (calendarIsOpen) {
    return (
      <Frame>
        <Calendar onChange={onChangeDate} value={value}/>
      </Frame>
    );
  }
  return (
    <Frame>
      <div style={{ flex: "3" }}>
        {<NoteList value={value.toDateString()} notes={loadedNotes} />}
      </div>
      <div style={{ flex: "1" }}>
        <button onClick={changeCalendarHandler}>Calendar</button>
      </div>
    </Frame>
  );
}

export default MyNotes;
