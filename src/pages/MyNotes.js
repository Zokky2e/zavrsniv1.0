import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { useAuthValue } from "../components/User/UserContext";
import "react-calendar/dist/Calendar.css";
import { db } from "../firebase";
import { get, onValue, ref, set } from "firebase/database";
import NoteList from "../components/Notes/NoteList";
function MyNotes() {
  const [value, onChange] = useState(new Date());
  const [loadedNotes, setLoadedNotes] = useState([]);
  const currentUser = useAuthValue();

  useEffect(() => {
    if (currentUser !== null) {
      let notes = ["Click me to edit!"];
      const dbRef = ref(
        db,
        currentUser.uid + "/" + value.toDateString() + "/notes"
      );
      onValue((dbRef), ((snapshot) => {
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
      }));
    }
  }, [currentUser, value]);
  if (currentUser === null) {
    return <div>Not signed in, no notes</div>;
  }
  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>
        {<NoteList value={value.toDateString()} notes={loadedNotes} />}
      </div>
      <div style={{ flex: "1" }}>
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
}

export default MyNotes;
