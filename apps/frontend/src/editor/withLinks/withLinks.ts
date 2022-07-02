import { Editor } from "slate";
import isUrl from "is-url";
import { wrapLink, isLinkActive } from "./helpers";

export const withLinks = (editor: Editor): Editor => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => element.type === "link" || isInline(element);

  editor.insertText = (text) => {
    if (isLinkActive(editor)) {
      insertText(text);
    } else if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};
