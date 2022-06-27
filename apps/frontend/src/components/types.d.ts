import { BaseEditor, BaseText, BaseElement } from "slate";
import { ReactEditor } from "slate-react";
import { YjsEditor } from "@slate-yjs/core";

export type CursorData = {
  name: string;
  color: string;
};

interface CustomText extends BaseText {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export interface H1 extends BaseElement {
  type: "heading-one";
}

export interface H2 extends BaseElement {
  type: "heading-two";
}

export interface InlineCode extends BaseElement {
  type: "inline-code";
}

export interface BlockQuote extends BaseElement {
  type: "block-quote";
}

export type CustomElement = H1 | H2 | InlineCode | BlockQuote;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & YjsEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
