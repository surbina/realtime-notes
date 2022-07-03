import { Page, Locator } from "@playwright/test";

export class Editor {
  readonly page: Page;
  readonly editor: Locator;

  constructor(page: Page) {
    this.page = page;
    this.editor = page.locator('[data-slate-editor="true"]');
  }
}
