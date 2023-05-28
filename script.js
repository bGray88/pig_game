'use strict';

const playerElements = [document.querySelector('.player--0'), document.querySelector('.player--1')];
const scoreElements  = [document.getElementById('score--0'), document.getElementById('score--1')];
const curScrElements = [document.getElementById('current--0'), document.getElementById('current--1')];
const diceElement    = document.querySelector('.dice');
const btnNew         = document.querySelector('.btn--new');
const btnRoll        = document.querySelector('.btn--roll');
const btnHold        = document.querySelector('.btn--hold');
const diceImages     = 6;
let diceFace         = 0;
let currentScore     = 0;
let activePlayer     = 0;
let playerScores     = [0, 0];

const checkDice = function () {
  if (diceFace === 1) {
    changePlayer();
  } else {
    setScore();
  }
};

const changePlayer = function () {
  curScrElements[activePlayer].textContent = currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerElements.forEach ( function(player, currentIndex, listObj) {
    player.classList.toggle('player--active');
  });
};

const setScore = function () {
  curScrElements[activePlayer].textContent = currentScore += Number(diceFace);
  scoreElements[activePlayer].textContent = playerScores[activePlayer] += Number(diceFace);
};

const setGame = function () {
  scoreElements[0].textContent = 0;
  scoreElements[1].textContent = 0;
  hideDice();
};

const rollDice = function () {
  diceFace        = Math.ceil(Math.random() * diceImages);
  diceElement.src = `dice-${diceFace}.png`;
};

const hideDice = function () {
  diceElement.classList.add('hidden');
};

const showDice = function () {
  diceElement.classList.remove('hidden');
};

btnRoll.addEventListener('click', function () {
  rollDice();
  showDice();
  checkDice();
});

setGame();
