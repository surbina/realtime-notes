import { test, expect } from "@playwright/test";
import { NotePage, Editor } from "../page-objects";
import { createNote } from "../data-manager";

test.describe("Editor", () => {
  test("I can edit the note content", async ({ page }) => {
    const note = await createNote("E2E test note");
    const notePage = new NotePage(page);
    const editor = new Editor(page);

    await notePage.goto(note.name);
    await expect(editor.editor).toHaveText(
      "This is the beginning of something awesome ..."
    );
    await editor.editor.type("I am editing the content of the note!");
    await expect(editor.editor).toHaveText(
      "I am editing the content of the note!"
    );
  });

  test("The note's content is stored in the server", async ({ page }) => {
    const note = await createNote("E2E test note");
    const notePage = new NotePage(page);
    const editor = new Editor(page);

    await notePage.goto(note.name);
    await expect(editor.editor).toHaveText(
      "This is the beginning of something awesome ..."
    );
    await editor.editor.fill("I am editing the content of the note!");
    await page.reload();
    await expect(editor.editor).toHaveText(
      "I am editing the content of the note!"
    );
  });

  test("Supports multiple users at the same time", async ({
    page: userAPage,
    context,
  }) => {
    const note = await createNote("E2E test note");

    const notePageA = new NotePage(userAPage);
    const editorA = new Editor(userAPage);

    const userBPage = await context.newPage();
    const notePageB = new NotePage(userBPage);
    const editorB = new Editor(userBPage);

    // Both users navigate to the note page
    await notePageA.goto(note.name);
    await notePageB.goto(note.name);

    // Both notes should start empty
    await expect(editorA.editor).toHaveText(
      "This is the beginning of something awesome ..."
    );
    await expect(editorB.editor).toHaveText(
      "This is the beginning of something awesome ..."
    );

    // User A edits the note's content
    await editorA.editor.type("Content from user A");
    // User B is able to view the content from user A
    await expect(editorB.editor).toHaveText("Content from user A");

    // User B edits the note's content
    await editorB.editor.type("Content from user B");
    // User A is able to view the content from user B
    await expect(editorA.editor).toHaveText(
      "Content from user BContent from user A"
    );
  });
});
