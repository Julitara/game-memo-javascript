import Card from './card.js'



let timer;
let timerButton = document.querySelector('.main__btn_timer');
let timerBlock = document.getElementById('main__timer');


timerButton.addEventListener('click', function () {
  timerBlock.innerHTML = 60;
  clearInterval(timer);
  timer = setInterval(timerStart, 1000);
  newGame(document.getElementById('game'), 16);
});

function timerStart() {
  if (timerBlock.innerHTML > 0) {
    timerButton.disabled = true;
    timerBlock.innerHTML--;
  } else {
    clearInterval(timer);
    timerButton.disabled = false;
  }
}


function newGame(container, cardCount) {
  let cardNumberArray = [],
    cardsArray = [],
    firstCard = null,
    secondCard = null;

  for (let i = 1; i <= cardCount / 2; i++) {
    cardNumberArray.push(i);
    cardNumberArray.push(i);
  }
  cardNumberArray = cardNumberArray.sort(() => Math.random() - 0.5);

  for (const cardNumber of cardNumberArray) {
    cardsArray.push(new Card(container, cardNumber, flip))
  }

  //логика игры

  function flip(card) {

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number !== secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard == null) {
      firstCard = card;
    } else {
      if (secondCard == null) {
        secondCard = card;
      }
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number == secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
      }
    }

    if (document.querySelector('.main__timer').innerHTML == 0) {
      alert('Время вышло!');
      container.innerHTML = '';
      cardNumberArray = [];
      cardsArray = [];
      firstCard = null;
      secondCard = null;
      newGame(container, cardCount);
      setTimer();
    } else if (document.querySelectorAll('.card.success').length == cardNumberArray.length) {
      alert('Победа!');
      container.innerHTML = '';
      cardNumberArray = [];
      cardsArray = [];
      firstCard = null;
      secondCard = null;
      newGame(container, cardCount);
    }
  }

}


/*newGame(document.getElementById('game'), 16);*/




