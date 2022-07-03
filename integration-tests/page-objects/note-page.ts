import { expect, Page, Locator } from "@playwright/test";

export class NotePage {
  readonly page: Page;
  readonly title: Locator;
  readonly notesList: Locator;
  readonly noteTitleInput: string;
  readonly noteSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator("h1", { hasText: "Notes" });
    this.notesList = page.locator("nav");
    this.noteTitleInput = "text='Note title'";
    this.noteSubmitButton = page.locator(`button[aria-label="create note"]`);
  }

  async goto(noteId = ""): Promise<void> {
    await this.page.goto(
      `${process.env.E2E_APP_URL}${noteId ? `/notes/${noteId}` : ""}`
    );
    await expect(this.title).toHaveText("Notes");
  }

  noteListItem(noteTitle: string): Locator {
    return this.page.locator("li", { hasText: noteTitle });
  }

  editNoteTitleButton(noteTitle: string): Locator {
    return this.page.locator(`button[aria-label="edit ${noteTitle} title"]`);
  }

  editNoteTitleInput(): string {
    return `[id="edit-note-title"]`;
  }

  confirmNoteTitleEditButton(noteTitle: string): Locator {
    return this.page.locator(`button[aria-label="edit ${noteTitle} title"]`);
  }
}
