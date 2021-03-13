const $start = document.querySelector('#start');

const $game = document.querySelector('#game');

let count = 0;

$start.addEventListener('click', () => {
  $start.classList.add('hide');
  $game.style.backgroundColor = '#fff';
});
