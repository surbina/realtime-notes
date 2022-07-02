import { Editor, Transforms } from "slate";
import { deserialize } from "./deserialize";

export const withHtml = (editor: Editor): Editor => {
  const { insertData } = editor;

  // editor.isInline = (element) => {
  //   return element.type === "link" ? true : isInline(element);
  // };

  editor.insertData = (data) => {
    const html = data.getData("text/html");

    if (html) {
      const parsed = new DOMParser().parseFromString(html, "text/html");
      const fragment = deserialize(parsed.body);
      Transforms.insertFragment(editor, fragment);
      return;
    }

    insertData(data);
  };

  return editor;
};