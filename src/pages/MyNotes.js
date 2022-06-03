import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { useAuthValue } from "../components/User/UserContext";
import "react-calendar/dist/Calendar.css";
import { db } from "../firebase";
import { onValue, ref, set } from "firebase/database";
import NoteList from "../components/Notes/NoteList";
import classes from "../components/Notes/NoteList.module.css";

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
      let notes = [];
      const dbRef = ref(
        db,
        currentUser.uid + "/" + value.toDateString() + "/notes"
      );
      onValue(dbRef, (snapshot) => {
        setLoadedNotes([]);
        if (snapshot.exists()) {
          notes = [];
          setLoadedNotes([]);
          snapshot.forEach((childSnapshot) => {
            const note = {
              key: childSnapshot.key.toString(),
              childData: childSnapshot.val(),
            };
            if(note.childData?.title !== undefined)
            notes.push(note);
          });
          setLoadedNotes(notes);
        } else {
          const emptyDbRef = ref(
            db,
            currentUser.uid +
              "/" +
              value.toDateString() +
              "/notes/" +
              Date.now().toString()
          );
          set(emptyDbRef, notes);
        }
      });
    }
  }, [currentUser, value]);
  if (currentUser === null) {
    return (
      <>
        <br />
        <div className={classes.container}>Not signed in.</div>
      </>
    );
  }

  if (calendarIsOpen) {
    return (
      <div className={classes.container}>
        <button
          className={classes.calendarButton}
          onClick={changeCalendarHandler}
        >
          <i className="bi bi-arrow-left-circle"></i>
        </button>
        <div className={classes.calendar}>
          <Calendar onChange={onChangeDate} value={value} />
        </div>
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <button
        className={classes.calendarButton}
        onClick={changeCalendarHandler}
      >
        <i className="bi bi-calendar-week"></i>
      </button>
      <div>
        <NoteList value={value.toDateString()} notes={loadedNotes} />
      </div>
    </div>
  );
}

export default MyNotes;
