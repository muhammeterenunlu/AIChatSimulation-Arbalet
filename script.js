const QAs = [
	{
		question: "Test Sorusu 1",
		answer: "Test Yaniti 1"
	},
	{
		question: "Test Sorusu 2",
		answer: "Test Yaniti 2"
	},
	{
		question: "Test Sorusu 3",
		answer: "Test Yaniti 3"
	},
	{
		question: "Test Sorusu 4",
		answer: "Test Yaniti 4"
	}
];

let i = 0;
const speed = 50;
const messagesElement = document.getElementById('messages');

(function runSession(j) {
	if(j < QAs.length) setTimeout(function() {
		runSession(j);
		clearSession();
	}, 5000);
	else {
		clearSession();
		runSession(0);
	}

	startQA(QAs[j]);
	j++;

} (0));

function startQA(qa) {
	typeQuestion(document.getElementById("userQuestion"), qa.question, qa);
}

function clearSession() {
	messagesElement.innerHTML = "";
}

function typeMessage(messageElement, currentText) {
  if (i < currentText.length) {
    messageElement.innerHTML =
      currentText.substring(0, i) + '<span class="cursor"></span>';
    i++;
    setTimeout(() => typeMessage(messageElement, currentText), speed);
  } else {
		i = 0;
    messageElement.innerHTML = currentText;
  }
}

function typeQuestion(messageElement, currentText, currentQA) {
  if (i < currentText.length) {
    messageElement.value =
      currentText.substring(0, i);
    i++;
    setTimeout(() => typeQuestion(messageElement, currentText, currentQA), speed);
  } else {
		i = 0;
    messageElement.value = currentText;
    setTimeout(() => submitQuestion(currentQA), 1000);
  }
}


function submitQuestion(currentQA) {
  const userQuestion = document.getElementById('userQuestion').value;
  if (userQuestion.trim() === '') return;

  const userMessage = document.createElement('div');
  userMessage.className = 'user';
  userMessage.textContent = userQuestion;
  messagesElement.appendChild(userMessage);

  document.getElementById('userQuestion').value = '';

  const response = currentQA.answer;
  const botMessage = document.createElement('div');
  botMessage.className = 'bot';
  messagesElement.appendChild(botMessage);
  setTimeout(() => {
    i = 0;
    typeMessage(botMessage, response);
  }, 1000);

  messagesElement.scrollTop = messagesElement.scrollHeight;
}
