export interface Note {
  name: string;
  title: string;
}

export enum NetworkStatus {
  IDLE = "IDLE",
  PROCESSING = "PROCESSING",
  ERROR = "ERROR",
}

export interface FormElements extends HTMLFormControlsCollection {
  noteTitle: HTMLInputElement;
}
export interface NoteFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}
