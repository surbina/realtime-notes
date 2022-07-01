import { BaseEditor, BaseText, BaseElement } from "slate";
import { ReactEditor } from "slate-react";
import { YjsEditor } from "@slate-yjs/core";

export type CursorData = {
  name: string;
  color: string;
};

interface CustomText extends BaseText {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface BlockQuote extends BaseElement {
  type: "block-quote";
}

export interface BulletedList extends BaseElement {
  type: "bulleted-list";
}

export interface NumberedList extends BaseElement {
  type: "numbered-list";
}

export interface ListItem extends BaseElement {
  type: "list-item";
}

export interface H1 extends BaseElement {
  type: "heading-one";
}

export interface H2 extends BaseElement {
  type: "heading-two";
}

export interface Paragraph extends BaseElement {
  type: "paragraph";
}

export type CustomElement =
  | BlockQuote
  | BulletedList
  | NumberedList
  | ListItem
  | H1
  | H2
  | Paragraph;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & YjsEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
