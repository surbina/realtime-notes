import { HocuspocusProvider } from "@hocuspocus/provider";
import { withCursors, withYHistory, withYjs, YjsEditor } from "@slate-yjs/core";
import randomColor from "randomcolor";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { Descendant } from "slate";
import { createEditor } from "slate";
import { Slate, withReact } from "slate-react";
import * as Y from "yjs";
import { faker } from "@faker-js/faker";
import { ConnectionToggle } from "./ConnectionToggle/ConnectionToggle";
import { CustomEditable } from "./CustomEditable/CustomEditable";
// import { FormatToolbar } from "./FormatToolbar/FormatToolbar";
// import { HOCUSPOCUS_ENDPOINT_URL } from "../../config";
import { RemoteCursorOverlay } from "./Overlay/Overlay";
import { CursorData } from "./types";

export const MultiEditor = () => {
  const [value, setValue] = useState<Descendant[]>([]);
  const [connected, setConnected] = useState(false);

  const provider = useMemo(
    () =>
      new HocuspocusProvider({
        url: "ws://127.0.0.1:3001",
        name: "slate-yjs-demo",
        onConnect: () => setConnected(true),
        onDisconnect: () => setConnected(false),
        connect: false,
      }),
    []
  );

  const toggleConnection = useCallback(() => {
    if (connected) {
      return provider.disconnect();
    }

    provider.connect();
  }, [provider, connected]);

  const editor = useMemo(() => {
    const cursorData: CursorData = {
      color: randomColor({
        luminosity: "dark",
        alpha: 1,
        format: "hex",
      }),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    };

    const sharedType = provider.document.get("content", Y.XmlText) as Y.XmlText;

    return withReact(
      withYHistory(
        withCursors(
          withYjs(createEditor(), sharedType, { autoConnect: false }),
          provider.awareness,
          {
            data: cursorData,
          }
        )
      )
    );
  }, [provider.awareness, provider.document]);

  // Connect editor and provider in useEffect to comply with concurrent mode
  // requirements.
  useEffect(() => {
    provider.connect();
    return () => provider.disconnect();
  }, [provider]);
  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  return (
    <React.Fragment>
      <Slate value={value} onChange={setValue} editor={editor}>
        <RemoteCursorOverlay>
          {/* <FormatToolbar /> */}
          <CustomEditable className="max-w-4xl w-full flex-col break-words" />
        </RemoteCursorOverlay>
        <ConnectionToggle connected={connected} onClick={toggleConnection} />
      </Slate>
    </React.Fragment>
  );
};
