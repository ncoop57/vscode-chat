# VSCode Chat README

VSCode Chat is a VSCode extension that leverages LangChain and OpenAI's GPT API to allow you to ask questions about your files inside of VSCode.

<p align="center">
    <br>
    <img src="https://raw.githubusercontent.com/ncoop57/vscode-chat/main/public/demo_vscode_chat.png" width="1024"/>
    <br>
<p>

## Features

* Ask natural language questions about your files within the VSCode editor.
* Get relevant answers about your files instantly, without having to leave the editor.

## Usage

First you will need to add your OpenAI API key to the extension settings. You can open your settings by pressing `Ctrl + ,`. Then, search for "VSCode Chat" and add your API key to the "OpenAI API Key" field.

Now that the setup is complete, you can ask questions about your files by following these steps:

1. Open the file you want to ask questions about.
2. Press Ctrl + Shift + P to open the VSCode command palette.
3. Type `VSCode Chat: Ask a question` and press enter.
4. A chat window will appear in the right panel of VSCode.
5. Type your question in natural language and press enter.
6. Wait for the extension to generate an answer.
7. The answer will be displayed in the chat window.

## Extension Settings

This extension contributes the following settings:

* `vscode-chat.OPENAI_KEY`: OpenAI API Key

## Known Issues

1. It's ugly, I know it, you know it, we all know it. :( I'm working on it.
2. This is using the paid version of OpenAI's API, so it's not free, i.e., it is bring your own credits.
3. It's using a Large Language Model, so the responses it generates might be completely wrong, something called "hallucinations".


## Release Notes

Here are the release notes for the extension.

### 0.0.1

Initial release of VSCode Chat with basic functionality. Namely, you can ask questions about your currently open file and get an answer.

## Roadmap

Here are some features I plan to add in the future:

- [ ] Add a "Refresh" button to the chat window to refresh the content that you can ask questions about.
- [ ] Add a "Clear" button to the chat window to clear the chat history.
- [ ] Add ability to ask questions about multiple files at once.