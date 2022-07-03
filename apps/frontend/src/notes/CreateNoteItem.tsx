import {
  ListItemIcon,
  ListItem,
  TextField,
  IconButton,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import { Add as AddIcon, Done as DoneIcon } from "@mui/icons-material";
import { useCreateNote } from "./useCreateNote";
import { NoteFormElement, NetworkStatus } from "./types";

export function CreateNoteItem() {
  const { push } = useRouter();
  // @TODO: render error state if status === error
  const { status, createNote } = useCreateNote();

  const handleSubmit: React.FormEventHandler<NoteFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const title = event.currentTarget.elements.noteTitle.value.trim();

    if (!title) {
      return;
    }

    const newNote = await createNote(title);
    (event.target as HTMLFormElement).reset();
    push(`/notes/${newNote?.name}`);
  };

  return (
    <ListItem disablePadding>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          paddingTop: "4px",
          paddingBottom: "4px",
          paddingLeft: "16px",
          paddingRight: "5px",
        }}
        onSubmit={handleSubmit}
      >
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <TextField
          id="note-title"
          name="noteTitle"
          variant="standard"
          label="Note title"
          disabled={status === NetworkStatus.PROCESSING}
        />
        <IconButton
          aria-label="create note"
          component="button"
          type="submit"
          disabled={status === NetworkStatus.PROCESSING}
        >
          <DoneIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
}
