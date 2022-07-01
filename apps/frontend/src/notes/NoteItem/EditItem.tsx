import { useState } from "react";
import { ListItem, TextField, IconButton, Box } from "@mui/material";
import { Done as DoneIcon, Close as CloseIcon } from "@mui/icons-material";

interface FormElements extends HTMLFormControlsCollection {
  noteTitle: HTMLInputElement;
}
interface NoteFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface EditItemProps {
  title: string;
  isActive: boolean;
  isUpdating: boolean;
  onConfirm(title: string): Promise<void>;
  onCancel(): void;
}

export function EditItem({
  title: initialTitle,
  isActive,
  isUpdating,
  onConfirm,
  onCancel,
}: EditItemProps) {
  const [title, setTitle] = useState(initialTitle);

  const handleSubmit: React.FormEventHandler<NoteFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const title = event.currentTarget.elements.noteTitle.value.trim();

    if (!title) {
      return;
    }

    onConfirm(title);
  };

  return (
    <ListItem selected={isActive} disablePadding>
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
        <TextField
          id="note-title"
          name="noteTitle"
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isUpdating}
          autoFocus
        />
        <IconButton
          aria-label="edit title"
          component="button"
          type="submit"
          disabled={isUpdating}
        >
          <DoneIcon />
        </IconButton>
        <IconButton
          aria-label="cancel"
          component="button"
          type="button"
          disabled={isUpdating}
          onClick={onCancel}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
}
