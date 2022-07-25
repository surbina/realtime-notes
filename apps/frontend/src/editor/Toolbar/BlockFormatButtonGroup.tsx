import { MouseEvent } from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ToggleButton from "@mui/material/ToggleButton";
import Tooltip from "@mui/material/Tooltip";
import { ButtonGroup } from "./ButtonGroup";
import { BlockQuote, NumberedList, BulletedList } from "../types";

type BlockTypes = BlockQuote | NumberedList | BulletedList;

interface BlockFormatButtonGroupProps {
  blockFormats: Array<BlockTypes["type"]>;
  onChange: (formatToChange: BlockTypes["type"]) => void;
}

export function BlockFormatButtonGroup({
  blockFormats,
  onChange,
}: BlockFormatButtonGroupProps) {
  const getMouseDownHandler =
    (format: BlockTypes["type"]) => (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onChange(format);
    };

  return (
    <ButtonGroup
      size="small"
      value={blockFormats}
      aria-label="Block formatting"
    >
      <ToggleButton
        value="block-quote"
        aria-label="block quote"
        onMouseDown={getMouseDownHandler("block-quote")}
      >
        <Tooltip title="Quote">
          <FormatQuoteIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton
        value="numbered-list"
        aria-label="numbered list"
        onMouseDown={getMouseDownHandler("numbered-list")}
      >
        <Tooltip title="Numbered list">
          <FormatListNumberedIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton
        value="bulleted-list"
        aria-label="bulleted list"
        onMouseDown={getMouseDownHandler("bulleted-list")}
      >
        <Tooltip title="Bulleted list">
          <FormatListBulletedIcon />
        </Tooltip>
      </ToggleButton>
    </ButtonGroup>
  );
}
