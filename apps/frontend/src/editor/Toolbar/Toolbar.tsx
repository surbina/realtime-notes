import { useSlate } from "slate-react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { TextFormatButtonGroup } from "./TextFormatButtonGroup";
import { HeadingFormatButtonGroup } from "./HeadingFormatButtonGroup";
import { BlockFormatButtonGroup } from "./BlockFormatButtonGroup";
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

  const handleTextFormatChange = (newTextFormats: Array<keyof CustomText>) => {
    const currentTextFormatsSet = new Set(currentTextFormats);
    const newTextFormatsSet = new Set(newTextFormats);

    const formatsToRemove = [...currentTextFormatsSet].filter(
      (format) => !newTextFormatsSet.has(format)
    );
    const formatsToAdd = [...newTextFormatsSet].filter(
      (format) => !currentTextFormatsSet.has(format)
    );

    [...formatsToRemove, ...formatsToAdd].forEach((format) => {
      toggleMark(editor, format);
    });
  };

  const handleHeadingFormatChange = (
    newHeadingFormats: Array<HeadingType["type"]>
  ) => {
    const currentHeadingFormatsSet = new Set(currentHeadingFormats);
    const newHeadingFormatsSet = new Set(newHeadingFormats);

    const formatsToRemove = [...currentHeadingFormatsSet].filter(
      (format) => !newHeadingFormatsSet.has(format)
    );
    const formatsToAdd = [...newHeadingFormatsSet].filter(
      (format) => !currentHeadingFormatsSet.has(format)
    );

    [...formatsToRemove, ...formatsToAdd].forEach((format) => {
      toggleBlock(editor, format);
    });
  };

  const handleBlockFormatChange = (
    newBlockFormats: Array<BlockType["type"]>
  ) => {
    const currentBlockFormatsSet = new Set(currentBlockFormats);
    const newBlockFormatsSet = new Set(newBlockFormats);

    const formatsToRemove = [...currentBlockFormatsSet].filter(
      (format) => !newBlockFormatsSet.has(format)
    );
    const formatsToAdd = [...newBlockFormatsSet].filter(
      (format) => !currentBlockFormatsSet.has(format)
    );

    [...formatsToRemove, ...formatsToAdd].forEach((format) => {
      toggleBlock(editor, format);
    });
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
        onChange={handleTextFormatChange}
      />
      <ToolbarDivider />
      <HeadingFormatButtonGroup
        headingFormats={currentHeadingFormats}
        onChange={handleHeadingFormatChange}
      />
      <ToolbarDivider />
      <BlockFormatButtonGroup
        blockFormats={currentBlockFormats}
        onChange={handleBlockFormatChange}
      />
    </Paper>
  );
}
