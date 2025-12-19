import { Plugin, Notice, Editor } from "obsidian";

export default class StickyCitekeyPlugin extends Plugin {
  private activeCitekey: string | null = null;

  onload() {
    this.addCommand({
        id: "set-active-citekey",
        name: "Set active citekey",
        editorCallback: (editor: Editor) => {
        const line = editor.getLine(editor.getCursor().line);

        // Match full Markdown citation link, bracketed citation, or bare citekey
        const match = line.match(
            /(\[[^\]]+\]|\[@[^\]]+\]|@[A-Za-z0-9:_-]+)/
        );

        if (!match) {
            new Notice("No citation found on this line");
            return;
        }

        const raw = match[1];
        const keyMatch = raw.match(/@?([A-Za-z0-9:_-]+)/);

        if (!keyMatch) {
            new Notice("No citekey found");
            return;
        }

        this.activeCitekey = keyMatch[1];
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

        const citation = `[@${this.activeCitekey}]`;

        if (line.includes(citation)) {
            return;
        }

        editor.setLine(lineNum, `${line} ${citation}`);

        }
    });
}

}
