import * as vscode from 'vscode';
const { ChatVectorDBQAChain } = require("langchain/chains");
const { HNSWLib } = require("langchain/vectorstores");
const { OpenAIEmbeddings } = require("langchain/embeddings");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { OpenAI } = require("langchain/llms");

export async function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vscode-chat.chat', async () => {
		if (currentPanel) {
			currentPanel.reveal(vscode.ViewColumn.One);
		} else {
			currentPanel = vscode.window.createWebviewPanel(
				'vscodeChat',
				'VSCode Chat',
				vscode.ViewColumn.Two,
				{
					enableScripts: true
				}
			);
			currentPanel.webview.html = getWebviewContent(currentPanel.webview, context);
			currentPanel.onDidDispose(
				() => {
					currentPanel = undefined;
				},
				undefined,
				context.subscriptions
			);
			// Handle messages from the webview
			currentPanel.webview.onDidReceiveMessage(
				async message =>  {
					const question = message.text; // "What does this file do?";
					const res = await chain.call({ question: question, chat_history: [] });
					if (currentPanel) {
						currentPanel.webview.postMessage({ text: res["text"] });
					}
					return;
				},
				undefined,
				context.subscriptions
			  );
		}
	});

	const configuration = vscode.workspace.getConfiguration('');
	const API_KEY = configuration.get("vscode-chat.OPENAI_KEY", "<API_KEY>");
	if (API_KEY === "<API_KEY>") {
		vscode.window.showErrorMessage("Please set OPENAI_KEY in the configuration");
		return;
	}
	/* Split the text into chunks */
	const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
	const model = new OpenAI({ openAIApiKey: API_KEY, temperature: 0.9 });
	const embedder = new OpenAIEmbeddings({ openAIApiKey: API_KEY})

	// Only allow a single VSCode Chat panel at a time
	let currentPanel: vscode.WebviewPanel | undefined = undefined;
	let chain: any;

	// Get the active text editor
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		let document = editor.document;

		// Get the document text
		const documentText = document.getText();
		const docs = textSplitter.createDocuments([documentText]);
		const vectorStore = await HNSWLib.fromDocuments(docs, embedder);
		chain = ChatVectorDBQAChain.fromLLM(model, vectorStore);
	}

	context.subscriptions.push(disposable);
}

function getWebviewContent(webview: vscode.Webview, context: vscode.ExtensionContext) {
	// Get the local path to main script run in the webview, then convert it to a uri we can use in the webview.
	const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'media', 'chat.js'));
	const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'media', 'style.css'));
	return `<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>VSCode Chat</title>
		<link href="${styleMainUri}" rel="stylesheet">
	</head>
	<body>
		<div id="chat-container"></div>
		<input id="chat-input" type="text" placeholder="Type your message here..." onkeydown="if (event.keyCode == 13) document.getElementById('send-button').click()">
		<button id="send-button">Send</button>

		<script src="${scriptUri}"></script>
	</body>
	</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}