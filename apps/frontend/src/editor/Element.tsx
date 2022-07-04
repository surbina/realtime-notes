import { RenderElementProps, useSelected } from "slate-react";
import { Link } from "./types";
import Tooltip from "@mui/material/Tooltip";

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
function InlineChromiumBugfix() {
  return (
    <span contentEditable={false} style={{ fontSize: 0 }}>
      ${String.fromCodePoint(160) /* Non-breaking space */}
    </span>
  );
}

function LinkComponent({ attributes, children, element }: RenderElementProps) {
  const selected = useSelected();
  const url = (element as Link).url;

  return (
    <Tooltip title={url}>
      <a
        {...attributes}
        href={url}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey) {
            window.open(url, "_blank");
          }
        }}
        style={{
          boxShadow: selected ? "0 0 0 3px #ddd" : "none",
        }}
      >
        <InlineChromiumBugfix />
        {children}
        <InlineChromiumBugfix />
      </a>
    </Tooltip>
  );
}

export function Element({ element, attributes, children }: RenderElementProps) {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "link":
      return (
        <LinkComponent element={element} attributes={attributes}>
          {children}
        </LinkComponent>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
}
