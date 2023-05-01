"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as fs from "fs";
import * as vscode from "vscode";

const identity = <T>(x: T): T => x;
const reverse = <T>(x: T[]): T[] => x.reverse();

//Allowed extension in order
const allowedExtensions = ["ts", "html", "css", "scss", "sass", "less"];

const getExtensions = (currentFileExtension: string): string[] => {
  // Find the current extension in the list of allowed exstensions
  const index = allowedExtensions.findIndex((ext) => ext === currentFileExtension);

  // if the current file doesn't appear to be an Angular component file, return
  if (index < 0) {
    return [];
  }

  const beforeExts = allowedExtensions.slice(0, index);
  const afterExts = allowedExtensions.slice(index + 1);

  // construct the exts for navigation in normal order
  return [...afterExts, ...beforeExts];
};

const getNextValidExtension = (currentFilenameWithoutExtension: string, nextExtensions: string[]): string | null => {
  if (nextExtensions.length === 0) {
    return null;
  }

  let newExtension: string | null = null;
  for (let ne of nextExtensions) {
    if (fileExists(currentFilenameWithoutExtension + ne)) {
      newExtension = ne;
      break;
    }
  }

  return newExtension;
};

const switchFiles = (orderFn: (exts: string[]) => string[]) => () => {
  if (vscode.window.activeTextEditor === undefined) {
    return;
  }

  const currentFilename: string = vscode.window.activeTextEditor.document.fileName;
  const currentFileExtension: string = currentFilename.substring(currentFilename.lastIndexOf(".") + 1).toLowerCase();
  const currentFilenameWithoutExtension: string = currentFilename.substring(0, currentFilename.lastIndexOf(".") + 1);

  const nextExtensions = orderFn(getExtensions(currentFileExtension));
  const newFileExtension: string | null = getNextValidExtension(currentFilenameWithoutExtension, nextExtensions);

  // if an appropriate next file was found, switch to it
  if (newFileExtension) {
    vscode.workspace
      .openTextDocument(currentFilenameWithoutExtension + newFileExtension)
      .then((doc) => vscode.window.showTextDocument(doc));
  }
};

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const disposable1 = vscode.commands.registerCommand("extension.switchAngularComponentFiles", switchFiles(identity));
  const disposable2 = vscode.commands.registerCommand(
    "extension.switchAngularComponentFilesReverse",
    switchFiles(reverse)
  );

  context.subscriptions.push(disposable1);
  context.subscriptions.push(disposable2);
}

export function deactivate() {}

function fileExists(filename: string): boolean {
  return fs.existsSync(filename);
}
