// Soru ve cevap arrayi
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
    question: 'Kim tarafından oluşturuldun',
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

// Başlangıç indeksini tanımlama
let i = 0;

// Karakter başına yazma hızını tanımlama (milisaniye cinsinden)
const speed = 50;

// Mesajların gösterileceği HTML elemanını alır.
const messagesElement = document.getElementById('messages');

// Chat oturumunu başlatan ana fonksiyon.
function runSession(j) {
  // Eğer QAs dizisinin sonuna gelindi ise başa dön.
  if (j >= QAs.length) {
    j = 0;
  }

  // Soru-cevap oturumunu başlat.
  startQA(QAs[j], () => {
    // Soru-cevap oturumu tamamlandığında yeni oturuma başlamak için bu kısmı kullanıyoruz.
    setTimeout(() => {
      clearSession();
      runSession(j + 1);
    }, 1000);
  });
}

// Belirli bir soru ve cevabın toplam süresini hesaplar.
function calculateDuration(qa) {
  return (qa.question.length + qa.answer.length) * speed;
}

// Mesajları sıfırlar.
function clearSession() {
  messagesElement.innerHTML = '';
}

// Belirli bir soru ve cevabı ekranda yazdırır.
function startQA(qa, done) {
  typeMessage(createMessageElement('user'), qa.question, () => {
    typeMessage(createMessageElement('bot'), qa.answer, done); // Botun cevabını yazdırdıktan sonra `done` fonksiyonunu çağırıyoruz
  });
}

// Mesaj kutusu oluşturan fonksiyon.
// Gelen mesaj tipine göre (kullanıcı veya bot) uygun bir mesaj kutusu oluşturur.
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

// Belirli bir mesajı belirli bir hızda yazdırır.
// Mesaj yazdırma tamamlandığında isteğe bağlı bir geri çağırma fonksiyonunu çalıştırır.
function typeMessage(messageElement, currentText, callback = null) {
  const cursorElement = document.createElement('span');
  cursorElement.className = 'cursor';
  messageElement.appendChild(cursorElement);

  let i = 0;
  function type() {
    if (i < currentText.length) {
      messageElement.insertBefore(
        document.createTextNode(currentText[i]),
        cursorElement
      );
      i++;
      setTimeout(type, speed);
    } else {
      messageElement.removeChild(cursorElement);
      if (callback) callback();
    }
  }
  type();
}

// Chat oturumunu başlat.
runSession(0);
