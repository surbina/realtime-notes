import { Node } from "slate";
import { Logger } from "@hocuspocus/extension-logger";
import { Server } from "@hocuspocus/server";
import { slateNodesToInsertDelta } from "@slate-yjs/core";
import * as Y from "yjs";
import { FirestoreExtension } from "./extensions/firestore";
import firestore from "./firebase";

// Minimal hocuspocus server setup with logging. For more in-depth examples
// take a look at: https://github.com/ueberdosis/hocuspocus/tree/main/demos/backend
const server = Server.configure({
  port: parseInt(process.env.NEXT_PUBLIC_API_PORT ?? "", 10) || 3001,

  extensions: [
    new Logger(),
    new FirestoreExtension({
      firestore,
    }),
  ],

  async onLoadDocument(data) {
    if (data.document.isEmpty("content")) {
      const insertDelta = slateNodesToInsertDelta([
        {
          type: "paragraph",
          children: [{ text: "" }],
        } as Node,
      ]);
      const sharedRoot = data.document.get(
        "content",
        Y.XmlText
      ) as unknown as Y.XmlText;
      sharedRoot.applyDelta(insertDelta);
    }

    return data.document;
  },
});

server.enableMessageLogging();
server.listen();
