const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const vscode = acquireVsCodeApi();

sendButton.addEventListener('click', () => {
    const message = chatInput.value;

    // Append message to chat container
    const messageNode = document.createElement('div');
    messageNode.textContent = message;
    // blue
    messageNode.style.backgroundColor = '#e6f7ff';
    chatContainer.appendChild(messageNode);
    vscode.postMessage({
        text: message
    })

    // Clear input
    chatInput.value = '';
});

// Handle the message inside the webview
window.addEventListener('message', event => {
    const message = event.data; // The JSON data our extension sent
    // Append message to chat container
    const messageNode = document.createElement('div');
    messageNode.textContent = message.text;
    messageNode.style.backgroundColor = '#fffbe6';
    chatContainer.appendChild(messageNode);
});