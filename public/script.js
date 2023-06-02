const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');

// Function to add message to chat box
function addMessage(content, isUser = false) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(isUser ? 'user' : 'bot');
  messageElement.innerHTML = `<span class="message-content">${content}</span>`;
  chatMessages.appendChild(messageElement);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message to the server and get a response
async function sendMessage() {
  const message = messageInput.value.trim();

  if (message !== '') {
    addMessage(message, true);
    messageInput.value = '';

    try {
      const response = await axios.post('/chat', { message });

      if (response.data.reply) {
        addMessage(response.data.reply, false);
      }
    } catch (error) {
      console.error(error);
      addMessage('Oops! Something went wrong.', false);
    }
  }
}

// Handle send button click event
sendButton.addEventListener('click', sendMessage);

// Handle enter key press event
messageInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
