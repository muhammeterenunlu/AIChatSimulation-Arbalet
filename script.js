let i = 0;
const speed = 50;
const messagesElement = document.getElementById('messages');

function typeMessage(messageElement, currentText) {
  if (i < currentText.length) {
    messageElement.innerHTML =
      currentText.substring(0, i) + '<span class="cursor"></span>';
    i++;
    setTimeout(() => typeMessage(messageElement, currentText), speed);
  } else {
    messageElement.innerHTML = currentText;
  }
}

function askQuestion() {
  const userQuestion = document.getElementById('userQuestion').value;
  if (userQuestion.trim() === '') return;

  const userMessage = document.createElement('div');
  userMessage.className = 'user';
  userMessage.textContent = userQuestion;
  messagesElement.appendChild(userMessage);

  document.getElementById('userQuestion').value = '';

  const response = getResponse(userQuestion);
  const botMessage = document.createElement('div');
  botMessage.className = 'bot';
  messagesElement.appendChild(botMessage);
  setTimeout(() => {
    i = 0;
    typeMessage(botMessage, response);
  }, 1000);

  messagesElement.scrollTop = messagesElement.scrollHeight;
}

function getResponse(question) {
  if (question.includes('merhaba')) return 'Merhaba!';
  if (question.includes('nasılsın'))
    return 'İyiyim, teşekkür ederim. Sen nasılsın?';
  return 'Anlamadım, lütfen başka bir şey sorun.';
}
