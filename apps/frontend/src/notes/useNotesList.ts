import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { firestore } from "../firebase";
import { COLLECTION_NAME } from "../constants";
import { Note } from "./types";

export function useNotesList(initialNotes: Array<Note>): Array<Note> {
  const [notes, setNotes] = useState<Array<Note>>(initialNotes);

  useEffect(() => {
    const q = query(
      collection(firestore, COLLECTION_NAME),
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
