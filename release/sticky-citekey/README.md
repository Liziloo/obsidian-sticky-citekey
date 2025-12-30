# Obsidian Sticky Citekey Plugin
*Community micro-plugin for Obsidian notetaking*

## Purpose
Improve efficiency when inserting the **same citekey repeatedly** during source-dense note taking.

## Dependencies
- **Citations** community plugin

## What It Does
Works alongside the existing Citations plugin to let the user:
1. Capture a citekey that has already been inserted into the editor
2. Re-insert that same citekey on subsequent lines using a single hotkey

This is intended for workflows where many facts are drawn from one source.

## What It Does Not Do
- Automatically generate citations
- Integrate directly with Zotero
- Modify or replace the Citations plugin

## Example Workflow
1. In an Obsidian note, enter a fact.
```text
Birth: abt. 1742
```
2. Use **Citations: Insert citation** to insert that citekey for the session.
```text
Birth: abt. 1742 @usPensionGlover1818
```
3. Run **Sticky Citekey: Set active citekey** to store that citekey for the session.
4. For subsequent facts from the same source, enter the fact and run **Sticky Citekey: Reuse active citekey.**
```text
Enlisted: June 1775 @usPensionGlover1818
Discharged: July 1778 @usPensionGlover1818
```
5. When switching to a new source, repeat steps 2-3.