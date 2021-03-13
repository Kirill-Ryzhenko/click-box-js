const $start = document.querySelector('#start');
const $game = document.querySelector('#game');
const $time = document.querySelector('#time');
const $result = document.querySelector('#result');
const $timeTitle = document.querySelector('#time-header');
const $resultTitle = document.querySelector('#result-header');
const $gameTime = document.querySelector('#game-time');

let count = 0;
let startGame = true;

const hide = ($el) => {
  $el.classList.remove('hide');
};

const add = ($el) => {
  $el.classList.add('hide');
};

$gameTime.addEventListener('input', setGameTime);

$start.addEventListener('click', () => {
  count = 0;
  setGameTime();
  $gameTime.setAttribute('disabled', 'true');
  add($start);
  hide($timeTitle);
  add($resultTitle);
  $game.style.backgroundColor = '#fff';
  startGame = false;
  let interval = setInterval(() => {
    let time = parseFloat($time.textContent);
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  renderBox();
});

function endGame() {
  startGame = true;
  $gameTime.removeAttribute('disabled');
  hide($start);
  $game.style.backgroundColor = '#ccc';
  $game.innerHTML = '';
  add($timeTitle);
  hide($resultTitle);
  $result.textContent = count;
}

function setGameTime() {
  hide($timeTitle);
  add($resultTitle);
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
}

$game.addEventListener('click', (event) => {
  if (!startGame && event.target.dataset.box) {
    count++;
    renderBox();
  }
});

function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}
function renderBox() {
  $game.innerHTML = '';
  let box = document.createElement('div');
  let boxSize = getRandom(30, 85);
  let gameSize = $game.getBoundingClientRect();
  let maxLeft = getRandom(0, gameSize.width - boxSize);
  let maxTop = getRandom(0, gameSize.height - boxSize);

  box.style.position = 'absolute';
  box.style.top = maxTop + 'px';
  box.style.left = maxLeft + 'px';
  box.style.width = box.style.height = boxSize + 'px';
  box.style.border = '1px solid black';
  box.style.backgroundColor = '#' + randomColor();
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true');

  $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
