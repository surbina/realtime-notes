import Link from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

interface ItemProps {
  id: string;
  title: string;
  isActive: boolean;
  onEdit(): void;
}

export function Item({ id, title, isActive, onEdit }: ItemProps) {
  return (
    <Link href={`/notes/${id}`} shallow>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label={`edit ${title} title`}
            onClick={(e) => {
              e.preventDefault();
              onEdit();
            }}
          >
            <EditIcon />
          </IconButton>
        }
        selected={isActive}
        disablePadding
      >
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}
