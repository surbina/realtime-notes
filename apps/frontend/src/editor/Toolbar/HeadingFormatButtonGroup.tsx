import { MouseEvent } from "react";
import FormatTitleIcon from "@mui/icons-material/Title";
import Tooltip from "@mui/material/Tooltip";
import ToggleButton from "@mui/material/ToggleButton";
import { ButtonGroup } from "./ButtonGroup";
import { H1, H2 } from "../types";

const handleMouseDown = (e: MouseEvent<HTMLElement>) => e.preventDefault();

type HeadingType = H1 | H2;

interface HeadingFormatButtonGroupProps {
  headingFormats: Array<HeadingType["type"]>;
  onChange: (newFormats: Array<HeadingType["type"]>) => void;
}

export function HeadingFormatButtonGroup({
  headingFormats,
  onChange,
}: HeadingFormatButtonGroupProps) {
  const handleHeadingFormatChange = (
    _event: MouseEvent<HTMLElement>,
    newHeadingFormats: Array<HeadingType["type"]>
  ) => {
    onChange(newHeadingFormats);
  };

  return (
    <ButtonGroup
      size="small"
      value={headingFormats}
      onChange={handleHeadingFormatChange}
      aria-label="Heading formatting"
    >
      <ToggleButton
        value="heading-one"
        aria-label="heading one"
        onMouseDown={handleMouseDown}
      >
        <Tooltip title="H1">
          <FormatTitleIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton
        value="heading-two"
        aria-label="heading two"
        onMouseDown={handleMouseDown}
      >
        <Tooltip title="H2">
          <FormatTitleIcon fontSize="small" />
        </Tooltip>
      </ToggleButton>
    </ButtonGroup>
  );
}
