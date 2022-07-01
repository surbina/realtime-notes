import { useState } from "react";
import { Item } from "./Item";
import { EditItem } from "./EditItem";
import { useUpdateNote } from "../useUpdateNote";
import { NetworkStatus } from "../types";

interface NoteItemProps {
  id: string;
  title: string;
  isActive: boolean;
}

export function NoteItem({ id, title, isActive }: NoteItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { status, updateNote } = useUpdateNote();

  if (isEditing) {
    return (
      <EditItem
        title={title}
        isActive={isActive}
        isUpdating={status === NetworkStatus.PROCESSING}
        onConfirm={async (title) => {
          await updateNote({
            name: id,
            title,
          });

          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Item
      id={id}
      title={title}
      isActive={isActive}
      onEdit={() => setIsEditing(true)}
    />
  );
}
