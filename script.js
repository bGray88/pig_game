'use strict';

const playerElements = [document.querySelector('.player--0'), document.querySelector('.player--1')];
const scoreElements  = [document.getElementById('score--0'), document.getElementById('score--1')];
const curScrElements = [document.getElementById('current--0'), document.getElementById('current--1')];
const diceElement    = document.querySelector('.dice');
const btnNew         = document.querySelector('.btn--new');
const btnRoll        = document.querySelector('.btn--roll');
const btnHold        = document.querySelector('.btn--hold');
const diceImages     = 6;
let winningNumber    = 100;
let diceFace;
let currentScore;
let activePlayer;
let playerScores;
let playing;

const checkDice = function () {
  if (diceFace === 1) {
    changePlayer();
  } else {
    curScrElements[activePlayer].textContent = currentScore += Number(diceFace);
  }
};

const checkScore = function () {
  for (const playerScore of playerScores) {
    if (playerScore >= winningNumber) {
      playing = false;
      hideDice();
      playerElements[activePlayer].classList.toggle('player--winner');
      playerElements[activePlayer].classList.toggle('player--active');
    };
  };
};

const changePlayer = function () {
  diceFace = 0;
  curScrElements[activePlayer].textContent = currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerElements.forEach ( function(player, currentIndex, listObj) {
    player.classList.toggle('player--active');
  });
};

const setScore = function () {
  scoreElements[activePlayer].textContent = playerScores[activePlayer] += currentScore;
};

const init = function () {
  setPlayers();
  setScreen();
  playing = true;
};

const setPlayers = function () {
  currentScore = 0;
  activePlayer = 0;
  playerScores = [0, 0];
};

const setScreen = function () {
  hideDice();
  scoreElements.forEach ( function(playerScore, currentIndex, listObj) {
    playerScore.textContent = 0;
  });
  playerElements.forEach ( function(player, currentIndex, listObj) {
    player.classList.remove('player--winner');
  });
  playerElements[0].classList.add('player--active');
  playerElements[1].classList.remove('player--active');
};

const rollDice = function () {
  diceFace        = Math.ceil(Math.random() * diceImages);
  diceElement.src = `${document.location.pathname}images/dice/dice-${diceFace}.png`;
};

const hideDice = function () {
  diceElement.classList.add('hidden');
};

const showDice = function () {
  diceElement.classList.remove('hidden');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    rollDice();
    showDice();
    checkDice();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    setScore();
    checkScore();
    changePlayer();
  }
});

btnNew.addEventListener('click', init)

init();
