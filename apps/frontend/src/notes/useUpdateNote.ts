import { useState, useCallback } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { Note, NetworkStatus } from "./types";

interface UseUpdateNote {
  status: NetworkStatus;
  updateNote(
    note: Pick<Note, "name"> & Partial<Omit<Note, "name">>
  ): Promise<void>;
}

export function useUpdateNote(): UseUpdateNote {
  const [status, setStatus] = useState(NetworkStatus.IDLE);

  const updateNote: UseUpdateNote["updateNote"] = useCallback(async (note) => {
    setStatus(NetworkStatus.PROCESSING);

    try {
      await updateDoc(doc(firestore, "documents", note.name), note);

      setStatus(NetworkStatus.IDLE);
    } catch {
      setStatus(NetworkStatus.ERROR);
    }
  }, []);

  return {
    status,
    updateNote,
  };
}
