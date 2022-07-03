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

const NotesList: React.FC<NotesListProps> = ({
  activeNoteId,
  initialNotes,
}) => {
  const notesList = useNotesList(initialNotes);

  return (
    <nav>
      <List>
        {notesList?.map((note) => (
          <NoteItem
            key={note.name}
            id={note.name}
            title={note.title}
            isActive={note.name === activeNoteId}
          />
        ))}
        <CreateNoteItem />
      </List>
    </nav>
  );
};

export default NotesList;
