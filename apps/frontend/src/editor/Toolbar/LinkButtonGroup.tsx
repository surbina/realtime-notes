import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { ButtonGroup } from "./ButtonGroup";
import LinkIcon from "@mui/icons-material/Link";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import Box from "@mui/material/Box";

const activeValue = ["link"];

interface FormElements extends HTMLFormControlsCollection {
  url: HTMLInputElement;
}
interface LinkFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

interface LinkButtonGroupProps {
  isLinkActive: boolean;
  onSelectLink(): void;
  onAddLink(url: string): void;
  onRemoveLink(): void;
}

export function LinkButtonGroup({
  isLinkActive,
  onSelectLink,
  onAddLink,
  onRemoveLink,
}: LinkButtonGroupProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const closePopover = () => {
    setAnchorEl(null);
  };

  const handleSubmit: React.FormEventHandler<LinkFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const url = event.currentTarget.elements.url.value.trim();

    if (!url) {
      return;
    }

    onAddLink(url);
    closePopover();
  };

  const open = Boolean(anchorEl);
  const id = open ? "insert-link-popover" : undefined;

  return (
    <>
      <ButtonGroup
        size="small"
        aria-label="Link"
        value={isLinkActive ? activeValue : []}
      >
        <Tooltip title="Link">
          <ToggleButton
            value="link"
            aria-label="insert link"
            onMouseDown={(event) => {
              event.preventDefault();

              if (isLinkActive) {
                onSelectLink();
              }

              setAnchorEl(event.currentTarget);
            }}
          >
            <LinkIcon />
          </ToggleButton>
        </Tooltip>
        {/* Wrapping a disabled button in a Tooltip shows a warning in the console :( */}
        {isLinkActive ? (
          <Tooltip title="Unlink">
            <ToggleButton
              value="unlink"
              aria-label="remove link"
              onMouseDown={(event) => {
                event.preventDefault();
                onRemoveLink();
              }}
            >
              <LinkOffIcon />
            </ToggleButton>
          </Tooltip>
        ) : (
          <ToggleButton
            value="unlink"
            aria-label="remove link"
            onMouseDown={(event) => {
              event.preventDefault();
              onRemoveLink();
            }}
            disabled
          >
            <LinkOffIcon />
          </ToggleButton>
        )}
      </ButtonGroup>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            paddingTop: "4px",
            paddingBottom: "4px",
            paddingLeft: "16px",
            paddingRight: "5px",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            id="url"
            name="url"
            sx={{
              minWidth: "250px",
            }}
            label="URL"
            variant="standard"
            placeholder="https://www.google.com"
            autoFocus
          />
          <IconButton aria-label="insert link" component="button" type="submit">
            <DoneIcon />
          </IconButton>
        </Box>
      </Popover>
    </>
  );
}
