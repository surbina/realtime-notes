// @refresh reset // Fixes hot refresh errors in development https://github.com/ianstormtaylor/slate/issues/3477

import { HocuspocusProvider } from "@hocuspocus/provider";
import { withCursors, withYHistory, withYjs, YjsEditor } from "@slate-yjs/core";
import randomColor from "randomcolor";
import { useEffect, useMemo, useState } from "react";
import type { Descendant } from "slate";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import * as Y from "yjs";
import { faker } from "@faker-js/faker";
import { Paper, CircularProgress } from "@mui/material";
import { ClassNames } from "@emotion/react";
import { Element } from "./Element";
import { Leaf } from "./Leaf";
import { RemoteCursorOverlay } from "./RemoteCursorOverlay";
import { CursorData } from "./types";
import { Toolbar } from "./Toolbar";
import { handleHotkeys } from "./helpers";
import { withHtml } from "./withHtml";

const cursorData: CursorData = {
  color: randomColor({
    luminosity: "dark",
    alpha: 1,
    format: "hex",
  }),
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
};

interface EditorContentProps {
  instance: HocuspocusProvider;
}

const EditorContent = ({ instance }: EditorContentProps) => {
  const [value, setValue] = useState<Descendant[]>([]);

  const editor = useMemo(() => {
    const sharedType = instance.document.get("content", Y.XmlText) as Y.XmlText;

    return withHtml(
      withReact(
        withYHistory(
          withCursors(
            withYjs(createEditor(), sharedType, { autoConnect: false }),
            instance.awareness,
            {
              data: cursorData,
            }
          )
        )
      )
    );
  }, [instance.awareness, instance.document]);

  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editor]);

  const isLoading = editor.sharedRoot.length === 0;

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: isLoading ? "center" : "flex-start",
        alignItems: isLoading ? "center" : "flex-start",
        height: "calc(100vh - 4rem)",
        overflowY: "auto",
      }}
    >
      <Slate value={value} onChange={setValue} editor={editor}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Toolbar />
            <RemoteCursorOverlay>
              <ClassNames>
                {({ css }) => (
                  <Editable
                    onKeyDown={handleHotkeys(editor)}
                    placeholder="This is the beginning of something awesome ..."
                    className={css`
                      flex-direction: column;
                      overflow-wrap: break-word;
                      min-width: 400px;
                    `}
                    renderElement={Element}
                    renderLeaf={Leaf}
                  />
                )}
              </ClassNames>
            </RemoteCursorOverlay>
          </>
        )}
      </Slate>
    </Paper>
  );
};

export const Editor = ({ instance }: Partial<EditorContentProps>) => {
  if (!instance) {
    return null;
  }

  return <EditorContent instance={instance} />;
};
