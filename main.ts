import { Plugin, Notice, Editor } from "obsidian";

export default class StickyCitekeyPlugin extends Plugin {
  private activeCitekey: string | null = null;

  onload() {
    this.addCommand({
      id: "set-active-citekey",
      name: "Set active citekey",
      editorCallback: (editor: Editor) => {
        const line = editor.getLine(editor.getCursor().line);
        const match = line.match(/@([A-Za-z0-9:_-]+)/);

        if (!match) {
          new Notice("No citekey found on this line");
          return;
        }

        this.activeCitekey = match[1];
        new Notice(`Active citekey set: @${this.activeCitekey}`);
      }
    });

    this.addCommand({
      id: "reuse-active-citekey",
      name: "Reuse active citekey",
      editorCallback: (editor: Editor) => {
        if (!this.activeCitekey) {
          new Notice("No active citekey set");
          return;
        }

        const lineNum = editor.getCursor().line;
        const line = editor.getLine(lineNum);

        if (line.includes(`@${this.activeCitekey}`)) {
          return;
        }

        editor.setLine(lineNum, `${line} @${this.activeCitekey}`);
      }
    });
  }
}
