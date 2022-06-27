import React from "react";
import Link from "next/link";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Assignment as AssignmentIcon } from "@mui/icons-material";

interface NotesListProps {
  activeNoteId?: string;
}

const NotesList: React.FC<NotesListProps> = ({ activeNoteId }) => {
  // const { notesList } = useNotesList()
  const notesList = [
    {
      id: "slate-yjs-demo",
      title: "Test note",
    },
  ];

  return (
    <List>
      {notesList?.map((note) => (
        <Link href={`/notes/${note.id}`} key={note.id}>
          <ListItemButton selected={note.id === activeNoteId}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={note.title} />
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
};

export default NotesList;
