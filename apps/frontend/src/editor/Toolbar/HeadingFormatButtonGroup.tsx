import { MouseEvent } from "react";
import FormatTitleIcon from "@mui/icons-material/Title";
import Tooltip from "@mui/material/Tooltip";
import ToggleButton from "@mui/material/ToggleButton";
import { ButtonGroup } from "./ButtonGroup";
import { H1, H2 } from "../types";

type HeadingType = H1 | H2;

interface HeadingFormatButtonGroupProps {
  headingFormats: Array<HeadingType["type"]>;
  onChange: (formatToChange: HeadingType["type"]) => void;
}

export function HeadingFormatButtonGroup({
  headingFormats,
  onChange,
}: HeadingFormatButtonGroupProps) {
  const getMouseDownHandler =
    (format: HeadingType["type"]) => (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      onChange(format);
    };

  return (
    <ButtonGroup
      size="small"
      value={headingFormats}
      aria-label="Heading formatting"
    >
      <ToggleButton
        value="heading-one"
        aria-label="heading one"
        onMouseDown={getMouseDownHandler("heading-one")}
      >
        <Tooltip title="H1">
          <FormatTitleIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton
        value="heading-two"
        aria-label="heading two"
        onMouseDown={getMouseDownHandler("heading-two")}
      >
        <Tooltip title="H2">
          <FormatTitleIcon fontSize="small" />
        </Tooltip>
      </ToggleButton>
    </ButtonGroup>
  );
}
