import { Editor, Transforms, Element as SlateElement, Range } from "slate";
import { Link } from "../types";

const PROTOCOL_REGEX = /^(ht|f)tp(s?):\/\//;

export const unwrapLink = (editor: Editor): void => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

export const isLinkActive = (editor: Editor): boolean => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
  return !!link;
};

export const wrapLink = (editor: Editor, url: string): void => {
  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  const hasProto = PROTOCOL_REGEX.test(url);

  // Add a default protocol
  const fullUrl = !hasProto ? `http://${url}` : url;

  if (isLinkActive(editor) && isCollapsed) {
    editor.insertText(fullUrl);
    return;
  } else {
    unwrapLink(editor);
  }

  const link: Link = {
    type: "link",
    url: fullUrl,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

export const insertLink = (editor: Editor, url: string): void => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export const selectCurrentActiveLink = (editor: Editor): void => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });

  if (link) {
    const anchor = Editor.start(editor, link[1]);
    const focus = Editor.end(editor, link[1]);
    Transforms.select(editor, { anchor, focus });
  }
};
