import { jsx } from "slate-hyperscript";

// Taken from https://github.com/ianstormtaylor/slate/blob/main/site/examples/paste-html.tsx
export const deserialize = (el: Node): any => {
  if (el.nodeType === Node.TEXT_NODE) {
    return el.textContent;
  } else if (el.nodeType !== Node.DOCUMENT_POSITION_DISCONNECTED) {
    return null;
  } else if (el.nodeName === "BR") {
    return "\n";
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === "PRE" &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === "CODE"
  ) {
    parent = el.childNodes[0];
  }
  let children = Array.from(parent.childNodes).map(deserialize).flat();

  if (children.length === 0) {
    children = [{ text: "" }];
  }

  if (el.nodeName === "BODY") {
    return jsx("fragment", {}, children);
  } else if (nodeName === "BLOCKQUOTE") {
    return jsx("element", { type: "block-quote" }, children);
  } else if (nodeName === "H1") {
    return jsx("element", { type: "heading-one" }, children);
  } else if (nodeName === "H2") {
    return jsx("element", { type: "heading-two" }, children);
  } else if (nodeName === "LI") {
    return jsx("element", { type: "list-item" }, children);
  } else if (nodeName === "OL") {
    return jsx("element", { type: "numbered-list" }, children);
  } else if (nodeName === "UL") {
    return jsx("element", { type: "bulleted-list" }, children);
  } else if (nodeName === "P") {
    return jsx("element", { type: "paragraph" }, children);
  } else if (nodeName === "EM") {
    return children.map((child) => jsx("text", { italic: true }, child));
  } else if (nodeName === "I") {
    return children.map((child) => jsx("text", { italic: true }, child));
  } else if (nodeName === "STRONG") {
    return children.map((child) => jsx("text", { bold: true }, child));
  } else if (nodeName === "U") {
    return children.map((child) => jsx("text", { underline: true }, child));
  } else if (nodeName === "CODE") {
    return children.map((child) => jsx("text", { code: true }, child));
  } else if (nodeName === "SPAN" && el.textContent) {
    const style = (el as HTMLElement).style;

    const attrs = {
      underline: style.textDecoration === "underline",
      italic: style.fontStyle === "italic",
      bold: Number(style.fontWeight) > 400,
    };

    return children.map((child) => jsx("text", attrs, child));
  }

  return children;
};
