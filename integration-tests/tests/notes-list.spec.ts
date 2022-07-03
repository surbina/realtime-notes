import { test, expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { NotePage, Editor } from "../page-objects";
import { createNote } from "../data-manager";

test.describe("Notes list", () => {
  test("I can see existing notes", async ({ page }) => {
    const note = await createNote("E2E test note");
    const notePage = new NotePage(page);

    await notePage.goto();
    await expect(notePage.notesList).toContainText(note.title);
  });

  test("I can select a note", async ({ page }) => {
    const note = await createNote("E2E test note");
    const notePage = new NotePage(page);

    await notePage.goto();
    const noteItem = notePage.noteListItem(note.title);
    await noteItem.click();
    const urlRegEx = new RegExp(`.*/notes/${note.name}$`);
    await expect(page).toHaveURL(urlRegEx);
  });

  test("I can create a note", async ({ page }) => {
    const notePage = new NotePage(page);
    const editor = new Editor(page);
    const noteTitle = `Note title-${uuidv4().substring(0, 8)}`;

    await notePage.goto();
    await page.fill(notePage.noteTitleInput, noteTitle);
    await notePage.noteSubmitButton.click();
    await expect(editor.editor).toHaveText(
      "This is the beginning of something awesome ..."
    );
  });

  test("I can edit the note title", async ({ page }) => {
    const note = await createNote("E2E test note");
    const notePage = new NotePage(page);
    const newNoteTitle = `New note title-${uuidv4().substring(0, 8)}`;

    await notePage.goto(note.name);
    await notePage.editNoteTitleButton(note.title).click();
    await page.fill(notePage.editNoteTitleInput(), newNoteTitle);
    await notePage.confirmNoteTitleEditButton(note.title).click();
    await expect(notePage.notesList).toContainText(newNoteTitle);
  });
});
