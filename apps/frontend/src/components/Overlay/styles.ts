import styled from "@emotion/styled";

export const CaretWrapper = styled.div({
  position: "absolute",
  width: "0.125rem",
});

export const CaretContainer = styled.div({
  borderRadius: "0.25rem",
  borderBottomLeftRadius: 0,
  fontSize: "0.75rem",
  lineHeight: "1rem",
  paddingLeft: "0.375rem",
  paddingRight: "0.375rem",
  paddingTop: "0.125rem",
  paddingBottom: "0.125rem",
  position: "absolute",
  top: 0,
  color: "rgba(255, 255, 255, 1)",
  whiteSpace: "nowrap",
});

export const RemoteSelectionContent = styled.div({
  position: "absolute",
  pointerEvents: "none",
});

export const RemoteCursorOverlayWrapper = styled.div({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  margin: "8rem 2.5rem",
});
