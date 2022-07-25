import { MouseEvent } from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatCodeIcon from "@mui/icons-material/Code";
import ToggleButton from "@mui/material/ToggleButton";
import Tooltip from "@mui/material/Tooltip";
import { ButtonGroup } from "./ButtonGroup";
import { CustomText } from "../types";

interface TextFormatButtonGroupProps {
  textFormats: Array<keyof CustomText>;
  onChange: (formatToChange: keyof CustomText) => void;
}

export function TextFormatButtonGroup({
  textFormats,
  onChange,
}: TextFormatButtonGroupProps) {
  const getMouseDownHandler =
    (format: keyof CustomText) => (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onChange(format);
    };

  return (
    <ButtonGroup size="small" value={textFormats} aria-label="Text formatting">
      <ToggleButton
        value="bold"
        aria-label="bold"
        onMouseDown={getMouseDownHandler("bold")}
      >
        <Tooltip title="Bold">
          <FormatBoldIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton
        value="italic"
        aria-label="italic"
        onMouseDown={getMouseDownHandler("italic")}
      >
        <Tooltip title="Italic">
          <FormatItalicIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton
        value="underline"
        aria-label="underlined"
        onMouseDown={getMouseDownHandler("underline")}
      >
        <Tooltip title="Underline">
          <FormatUnderlinedIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton
        value="code"
        aria-label="code"
        onMouseDown={getMouseDownHandler("code")}
      >
        <Tooltip title="Code">
          <FormatCodeIcon />
        </Tooltip>
      </ToggleButton>
    </ButtonGroup>
  );
}
