// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "glab-manager" is now active!');

  const setGitlabHostUrlHandler = () => {
    vscode.window.showInputBox().then((hostUrl = "https://gitlab.com") => {
      vscode.workspace
        .getConfiguration()
        .update("glab-manager.hostUrl", hostUrl, true);
    });
  };

  const setGitlabAccessTokenHandler = () => {
    vscode.window.showInputBox().then((accessToken) => {
      if (!accessToken || accessToken.trim() === "") {
        vscode.window.showErrorMessage(
          "It appears you have entered an empty token, until you re-run the 'Glab Manager: Set Acces Token', the extension won't be able to work",
        );
        return;
      }
      context.secrets.store("gitlabAccessToken", accessToken).then(() => {
        vscode.window.showInformationMessage(
          "Your Gitlab Acces Token has been set! You're ready to go!",
        );
      });
    });
  };

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const registeredSetGitlabHostUrlCommand = vscode.commands.registerCommand(
    "glab-manager.setGitlabHostUrl",
    setGitlabHostUrlHandler,
  );

  const registeredSetGitlabAccessTokenCommand = vscode.commands.registerCommand(
    "glab-manager.setGitlabAccessToken",
    setGitlabAccessTokenHandler,
  );

  const commandsToPush = [
    registeredSetGitlabHostUrlCommand,
    registeredSetGitlabAccessTokenCommand,
  ];
  commandsToPush.map((command) => context.subscriptions.push(command));
}

// This method is called when your extension is deactivated
export function deactivate() {}
