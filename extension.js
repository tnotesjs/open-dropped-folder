const vscode = require("vscode");
const fs = require("fs");

async function openInNewWindow(uri) {
  if (!uri || uri.scheme !== "file") {
    return;
  }
  try {
    if (!fs.statSync(uri.fsPath).isDirectory()) {
      return;
    }
  } catch (error) {
    console.error("[tnotesjs-open-folder-in-new-window]", error);
    return;
  }
  await vscode.commands.executeCommand("vscode.openFolder", uri, {
    forceNewWindow: true,
  });
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "open-folder-in-new-window.open",
      openInNewWindow,
    ),
  );
}

module.exports = { activate };
