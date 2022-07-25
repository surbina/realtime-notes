import { useSlate } from "slate-react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { TextFormatButtonGroup } from "./TextFormatButtonGroup";
import { HeadingFormatButtonGroup } from "./HeadingFormatButtonGroup";
import { BlockFormatButtonGroup } from "./BlockFormatButtonGroup";
import { LinkButtonGroup } from "./LinkButtonGroup";
import {
  CustomText,
  H1,
  H2,
  BlockQuote,
  NumberedList,
  BulletedList,
} from "../types";
import {
  isMarkActive,
  isBlockActive,
  toggleMark,
  toggleBlock,
} from "../helpers";
import {
  isLinkActive,
  insertLink,
  unwrapLink,
  selectCurrentActiveLink,
} from "../withLinks";

type HeadingType = H1 | H2;

type BlockType = BlockQuote | NumberedList | BulletedList;

const textFormats: Array<keyof CustomText> = [
  "bold",
  "italic",
  "underline",
  "code",
];

const headingFormats: Array<HeadingType["type"]> = [
  "heading-one",
  "heading-two",
];

const blockFormats: Array<BlockType["type"]> = [
  "block-quote",
  "bulleted-list",
  "numbered-list",
];

const ToolbarDivider = () => (
  <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
);

export function Toolbar() {
  const editor = useSlate();

  const currentTextFormats = textFormats.filter((format) =>
    isMarkActive(editor, format)
  );

  const currentHeadingFormats = headingFormats.filter((format) =>
    isBlockActive(editor, format)
  );

  const currentBlockFormats = blockFormats.filter((format) =>
    isBlockActive(editor, format)
  );

  const handleSelectLink = () => {
    selectCurrentActiveLink(editor);
  };

  const handleInsertLink = (url: string) => {
    insertLink(editor, url);
  };

  const handleRemoveLink = () => {
    if (isLinkActive(editor)) {
      unwrapLink(editor);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        flexWrap: "wrap",
        top: 0,
        position: "sticky",
        zIndex: 1000,
      }}
    >
      <TextFormatButtonGroup
        textFormats={currentTextFormats}
        onChange={(format) => toggleMark(editor, format)}
      />
      <ToolbarDivider />
      <HeadingFormatButtonGroup
        headingFormats={currentHeadingFormats}
        onChange={(format) => toggleBlock(editor, format)}
      />
      <ToolbarDivider />
      <BlockFormatButtonGroup
        blockFormats={currentBlockFormats}
        onChange={(format) => toggleBlock(editor, format)}
      />
      <ToolbarDivider />
      <LinkButtonGroup
        isLinkActive={isLinkActive(editor)}
        onSelectLink={handleSelectLink}
        onAddLink={handleInsertLink}
        onRemoveLink={handleRemoveLink}
      />
    </Paper>
  );
}
