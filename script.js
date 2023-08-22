const QAs = [
  {
    question: 'Merhaba',
    answer: 'Selam! Ben Arbalet, sana nasıl yardımcı olabilirim?',
  },
  {
    question: 'Nasılsın',
    answer:
      'Bir yapay zeka olarak duygularım yok ama sorularını yanıtlamak için buradayım!',
  },
  {
    question: 'Adın ne',
    answer: 'Benim adım Arbalet!',
  },
  {
    question: 'Ne yapıyorsun',
    answer:
      'Kullanıcıların sorularını yanıtlıyorum ve onlara yardımcı olmaya çalışıyorum.',
  },
  {
    question: 'Kaç yaşındasın',
    answer:
      'Ben bir programım, dolayısıyla yaşım yok. Ancak, Arbalet ne zaman oluşturulduysa o zamandan beri buradayım.',
  },
  {
    question: 'Kim tarafından oluşturdun',
    answer:
      'Ben Arbalet yapay zeka aracıyım. Beni geliştiren 6Kare ekibine özel teşekkürler!',
  },
  {
    question: 'Nasıl hissediyorsun',
    answer: 'Duygularım yok, ama sana yardımcı olmak için buradayım!',
  },
  {
    question: 'Hangi işletim sistemlerinde çalışıyorsun',
    answer:
      'Ben web tabanlı bir servisim, bu nedenle çoğu işletim sisteminde çalışabilirim.',
  },
];

let i = 0;
const speed = 50;
const messagesElement = document.getElementById('messages');

function runSession(j) {
  if (j >= QAs.length) {
    j = 0;
  }

  startQA(QAs[j]);

  setTimeout(() => {
    clearSession();
    runSession(j + 1);
  }, calculateDuration(QAs[j]) + 1000);
}

function calculateDuration(qa) {
  return (qa.question.length + qa.answer.length) * speed;
}

function clearSession() {
  messagesElement.innerHTML = '';
}

function startQA(qa) {
  typeMessage(createMessageElement('user', 'User: '), qa.question, () => {
    typeMessage(createMessageElement('bot', 'Arbalet: '), qa.answer);
  });
}

function createMessageElement(type, prefix) {
  const containerElement = document.createElement('div');
  containerElement.className = type;

  const labelElement = document.createElement('span');
  labelElement.className = 'label';
  labelElement.textContent = prefix;

  const textElement = document.createElement('div');
  textElement.className = 'text';

  containerElement.appendChild(labelElement);
  containerElement.appendChild(textElement);

  messagesElement.appendChild(containerElement);

  return textElement;
}

function typeMessage(messageElement, currentText, callback = null) {
  if (i === 0) {
    const cursorElement = document.createElement('span');
    cursorElement.className = 'cursor';
    messageElement.appendChild(cursorElement);
  }

  if (i < currentText.length) {
    const cursorElement = messageElement.querySelector('.cursor');
    messageElement.insertBefore(
      document.createTextNode(currentText[i]),
      cursorElement
    );
    i++;
    setTimeout(() => typeMessage(messageElement, currentText, callback), speed);
  } else {
    const cursorElement = messageElement.querySelector('.cursor');
    if (cursorElement) messageElement.removeChild(cursorElement);
    i = 0;
    if (callback) callback();
  }
}

runSession(0);
