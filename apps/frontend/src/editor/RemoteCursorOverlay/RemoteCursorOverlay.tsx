import {
  CaretPosition,
  CursorOverlayState,
  useRemoteCursorOverlayPositions,
} from "@slate-yjs/react";
import { CSSProperties, PropsWithChildren, useRef } from "react";
import { CursorData } from "../types";
import {
  CaretWrapper,
  CaretContainer,
  RemoteSelectionContent,
  RemoteCursorOverlayWrapper,
} from "./styles";

type CaretProps = {
  position: CaretPosition;
  data: CursorData;
};

function Caret({ position, data }: CaretProps) {
  const caretStyle: CSSProperties = {
    ...position,
    background: data.color,
  };

  const labelStyle: CSSProperties = {
    transform: "translateY(-100%)",
    background: data.color,
  };

  return (
    <CaretWrapper style={caretStyle}>
      <CaretContainer style={labelStyle}>{data.name}</CaretContainer>
    </CaretWrapper>
  );
}

function RemoteSelection({
  data,
  selectionRects,
  caretPosition,
}: CursorOverlayState<CursorData>) {
  if (!data) {
    return null;
  }

  const selectionStyle: CSSProperties = {
    // Add a opacity to the background color
    backgroundColor: `${data.color}66`,
  };

  return (
    <>
      {selectionRects.map((position, i) => (
        <RemoteSelectionContent
          style={{ ...selectionStyle, ...position }}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
        />
      ))}
      {caretPosition && <Caret position={caretPosition} data={data} />}
    </>
  );
}

type RemoteCursorsProps = PropsWithChildren<{
  className?: string;
}>;

export function RemoteCursorOverlay({
  className,
  children,
}: RemoteCursorsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { cursors } = useRemoteCursorOverlayPositions<CursorData>({
    containerRef,
  });

  return (
    <RemoteCursorOverlayWrapper className={className} ref={containerRef}>
      {children}
      {cursors.map((cursor) => (
        <RemoteSelection key={cursor.clientId} {...cursor} />
      ))}
    </RemoteCursorOverlayWrapper>
  );
}
