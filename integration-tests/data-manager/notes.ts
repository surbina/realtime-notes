import { v4 as uuidv4 } from "uuid";
import firestore, { admin } from "./firebase";

export interface Note {
  name: string;
  title: string;
}

const collectionName = process.env.NEXT_PUBLIC_ENVIRONMENT as string;

export async function createNote(title: string): Promise<Note> {
  const name = uuidv4();

  const note = {
    name,
    title: `${title}-${name.substring(0, 8)}`,
    timestamp: admin.firestore.Timestamp.now(),
  };

  await firestore.collection(collectionName).doc(name).set(note);

  return note;
}

// TODO: The server does not support deleting a note :(
// Ideally, the test should also cleanup the data to avoid cluttering the application with test data
// export async function deleteNote(name: string): Promise<void> {
//   await firestore.collection(collectionName).doc(name).delete();
// }
