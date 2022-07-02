import { MouseEvent } from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatCodeIcon from "@mui/icons-material/Code";
import ToggleButton from "@mui/material/ToggleButton";
import Tooltip from "@mui/material/Tooltip";
import { ButtonGroup } from "./ButtonGroup";
import { CustomText } from "../types";

const handleMouseDown = (e: MouseEvent<HTMLElement>) => e.preventDefault();

interface TextFormatButtonGroupProps {
  textFormats: Array<keyof CustomText>;
  onChange: (newFormats: Array<keyof CustomText>) => void;
}

export function TextFormatButtonGroup({
  textFormats,
  onChange,
}: TextFormatButtonGroupProps) {
  const handleTextFormatChange = (
    _event: MouseEvent<HTMLElement>,
    newTextFormats: Array<keyof CustomText>
  ) => {
    onChange(newTextFormats);
  };

  return (
    <ButtonGroup
      size="small"
      value={textFormats}
      onChange={handleTextFormatChange}
      aria-label="Text formatting"
    >
      <Tooltip title="Bold">
        <ToggleButton
          value="bold"
          aria-label="bold"
          onMouseDown={handleMouseDown}
        >
          <FormatBoldIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Italic">
        <ToggleButton
          value="italic"
          aria-label="italic"
          onMouseDown={handleMouseDown}
        >
          <FormatItalicIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Underline">
        <ToggleButton
          value="underline"
          aria-label="underlined"
          onMouseDown={handleMouseDown}
        >
          <FormatUnderlinedIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Code">
        <ToggleButton
          value="code"
          aria-label="code"
          onMouseDown={handleMouseDown}
        >
          <FormatCodeIcon />
        </ToggleButton>
      </Tooltip>
    </ButtonGroup>
  );
}
