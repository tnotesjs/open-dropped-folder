const vscode = require("vscode");
const fs = require("fs");

let opening = false;

function tabUri(tab) {
  const input = tab && tab.input;
  if (!input || !input.uri || input.original || input.modified) {
    return undefined;
  }
  return input.uri;
}

function isDirectory(uri) {
  if (!uri || uri.scheme !== "file") {
    return false;
  }
  try {
    return fs.statSync(uri.fsPath).isDirectory();
  } catch {
    return false;
  }
}

function isCurrentFolder(uri) {
  const folders = vscode.workspace.workspaceFolders ?? [];
  return folders.length === 1 && folders[0].uri.fsPath === uri.fsPath;
}

async function openIfDirectory(uri) {
  if (opening || !isDirectory(uri) || isCurrentFolder(uri)) {
    return;
  }
  opening = true;
  try {
    await vscode.commands.executeCommand("vscode.openFolder", uri, {
      forceReuseWindow: true,
    });
  } catch (error) {
    opening = false;
    console.error("[open-dropped-folder]", error);
  }
}

function activate(context) {
  context.subscriptions.push(
    vscode.window.tabGroups.onDidChangeTabs((event) => {
      for (const tab of event.opened) {
        const uri = tabUri(tab);
        if (uri) {
          void openIfDirectory(uri);
        }
      }
    }),
  );

  for (const group of vscode.window.tabGroups.all) {
    for (const tab of group.tabs) {
      const uri = tabUri(tab);
      if (uri) {
        void openIfDirectory(uri);
      }
    }
  }
}

module.exports = { activate };
