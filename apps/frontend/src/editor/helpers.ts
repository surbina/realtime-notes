import { Editor, Transforms, Element as SlateElement } from "slate";
import isHotkey from "is-hotkey";
import { KeyboardEvent } from "react";
import { CustomElement, CustomText } from "./types";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const toggleBlock = (
  editor: Editor,
  format: CustomElement["type"]
): void => {
  const isActive = isBlockActive(editor, format);
  const isList = format === "numbered-list" || format === "bulleted-list";

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && (n.type as any) // eslint-disable-line @typescript-eslint/no-explicit-any
      ),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && (format === "numbered-list" || format === "bulleted-list")) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor: Editor, format: keyof CustomText): void => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isBlockActive = (
  editor: Editor,
  format: CustomElement["type"]
): boolean => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

export const isMarkActive = (
  editor: Editor,
  format: keyof CustomText
): boolean => {
  const marks = Editor.marks(editor);

  if (format === "text") {
    return false;
  }

  return marks ? !!marks[format] : false;
};

const HOTKEYS: Record<string, keyof CustomText> = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export const handleHotkeys =
  (editor: Editor) =>
  (event: KeyboardEvent<HTMLDivElement>): void => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };
