import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { useAuthValue } from "../components/User/UserContext";
import "react-calendar/dist/Calendar.css";
import { db } from "../firebase";
import { get, ref, set } from "firebase/database";
import NoteList from "../components/Notes/NoteList";
function MyNotes() {
  const [value, onChange] = useState(new Date());

  const [loadedNotes, setLoadedNotes] = useState([]);
  const currentUser = useAuthValue();
  useEffect(() => {
    if (currentUser !== null) {
      const dbRef = ref(db, currentUser.uid+"/notes");
      get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
          const notes = [];
          snapshot.forEach((childSnapshot) =>{
            const note = {
              key: childSnapshot.key,
              childData: childSnapshot.val()
            }
              notes.push(note);
            })
          setLoadedNotes(notes);
      }else set(dbRef, { userId: currentUser.uid, notes: null });
      });
    }
  }, [currentUser]);
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
