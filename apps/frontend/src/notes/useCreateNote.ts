import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase";
import { COLLECTION_NAME } from "../constants";
import { Note, NetworkStatus } from "./types";

interface UseCreateNote {
  status: NetworkStatus;
  createNote(title: string): Promise<Note | undefined>;
}

export function useCreateNote(): UseCreateNote {
  const [status, setStatus] = useState(NetworkStatus.IDLE);

  const createNote = useCallback(async (title: string) => {
    setStatus(NetworkStatus.PROCESSING);

    const id = uuidv4();

    try {
      const document = {
        name: id,
        title,
        timestamp: serverTimestamp(),
      };

      await setDoc(doc(firestore, COLLECTION_NAME, id), document);

      setStatus(NetworkStatus.IDLE);

      return document;
    } catch {
      setStatus(NetworkStatus.ERROR);
    }
  }, []);

  return {
    status,
    createNote,
  };
}
