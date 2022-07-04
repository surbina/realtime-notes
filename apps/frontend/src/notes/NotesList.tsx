import React from "react";
import { List } from "@mui/material";
import { useNotesList } from "./useNotesList";
import { NoteItem } from "./NoteItem";
import { Note } from "./types";
import { CreateNoteItem } from "./CreateNoteItem";

export interface NotesListProps {
  activeNoteId?: string;
  initialNotes: Array<Note>;
}

export function NotesList({ activeNoteId, initialNotes }: NotesListProps) {
  const notesList = useNotesList(initialNotes);

  return (
    <nav>
      <List>
        <CreateNoteItem />
        {notesList?.map((note) => (
          <NoteItem
            key={note.name}
            id={note.name}
            title={note.title}
            isActive={note.name === activeNoteId}
          />
        ))}
      </List>
    </nav>
  );
}
