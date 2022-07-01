import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { firestore } from "../firebase";
import { Note } from "./types";

export function useNotesList(initialNotes: Array<Note>): Array<Note> {
  const [notes, setNotes] = useState<Array<Note>>(initialNotes);

  useEffect(() => {
    const q = query(
      collection(firestore, "documents"),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newNotes: Array<Note> = [];

      querySnapshot.forEach((doc) => {
        const { name, title } = doc.data();
        newNotes.push({ name, title });
      });

      setNotes(newNotes);
    });

    return unsubscribe;
  }, []);

  return notes;
}
