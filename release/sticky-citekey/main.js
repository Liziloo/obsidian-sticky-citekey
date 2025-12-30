"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => StickyCitekeyPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var StickyCitekeyPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.activeCitekey = null;
  }
  onload() {
    this.addCommand({
      id: "set-active-citekey",
      name: "Set active citekey",
      editorCallback: (editor) => {
        const line = editor.getLine(editor.getCursor().line);
        const match = line.match(
          /(\[[^\]]+\]|\[@[^\]]+\]|@[A-Za-z0-9:_-]+)/
        );
        if (!match) {
          new import_obsidian.Notice("No citation found on this line");
          return;
        }
        const raw = match[1];
        const keyMatch = raw.match(/@?([A-Za-z0-9:_-]+)/);
        if (!keyMatch) {
          new import_obsidian.Notice("No citekey found");
          return;
        }
        this.activeCitekey = keyMatch[1];
      }
    });
    this.addCommand({
      id: "reuse-active-citekey",
      name: "Reuse active citekey",
      editorCallback: (editor) => {
        if (!this.activeCitekey) {
          new import_obsidian.Notice("No active citekey set");
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
};
