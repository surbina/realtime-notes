import { MouseEvent } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ToggleButton from "@mui/material/ToggleButton";
import { ButtonGroup } from "./ButtonGroup";
import { BlockQuote, NumberedList, BulletedList } from "../types";

type BlockTypes = BlockQuote | NumberedList | BulletedList;

const handleMouseDown = (e: MouseEvent<HTMLElement>) => e.preventDefault();

interface BlockFormatButtonGroupProps {
  blockFormats: Array<BlockTypes["type"]>;
  onChange: (newFormats: Array<BlockTypes["type"]>) => void;
}

export function BlockFormatButtonGroup({
  blockFormats,
  onChange,
}: BlockFormatButtonGroupProps) {
  const handleBlockFormatChange = (
    _event: MouseEvent<HTMLElement>,
    newBlockFormats: Array<BlockTypes["type"]>
  ) => {
    onChange(newBlockFormats);
  };

  return (
    <ButtonGroup
      size="small"
      value={blockFormats}
      onChange={handleBlockFormatChange}
      aria-label="Block formatting"
    >
      <ToggleButton
        value="block-quote"
        aria-label="block quote"
        onMouseDown={handleMouseDown}
      >
        <FormatQuoteIcon />
      </ToggleButton>
      <ToggleButton
        value="numbered-list"
        aria-label="numbered list"
        onMouseDown={handleMouseDown}
      >
        <FormatListNumberedIcon />
      </ToggleButton>
      <ToggleButton
        value="bulleted-list"
        aria-label="bulleted list"
        onMouseDown={handleMouseDown}
      >
        <FormatListBulletedIcon />
      </ToggleButton>
    </ButtonGroup>
  );
}
