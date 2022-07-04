import { Editor, Transforms } from "slate";
import { deserialize } from "./deserialize";

export function withHtml(editor: Editor): Editor {
  const { insertData, isInline } = editor;

  editor.isInline = (element) => element.type === "link" || isInline(element);

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
}
