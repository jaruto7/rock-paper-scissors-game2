const actualScore = {
 rounds: 0,
 wins: 0,
 losses: 0,
 draws: 0,
}

const game = {
 playerSelect: "",
 aiSelect: "",
}


function gameScore(player, ai, result) {
 document.querySelector('[data-summary="your-choice"]').textContent = player;
 document.querySelector('[data-summary="ai-choice"]').textContent = ai;
 document.querySelector('.numbers span').textContent = ++actualScore.rounds;

 if (result === "win") {
  document.querySelector('[data-summary="who-win"]').textContent = "Ty wygrałeś!";
  document.querySelector('[data-summary="who-win"]').style.color = 'lightgreen';
  document.querySelector('.wins span').textContent = ++actualScore.wins;
 } else if (result === "loss") {
  document.querySelector('[data-summary="who-win"]').textContent = "Przegrałeś :(";
  document.querySelector('[data-summary="who-win"]').style.color = 'red';
  document.querySelector('.losses span').textContent = ++actualScore.losses;
 } else {
  document.querySelector('[data-summary="who-win"]').textContent = "Remis.";
  document.querySelector('[data-summary="who-win"]').style.color = 'darkgray';
  document.querySelector('.draws span').textContent = ++actualScore.draws;
 }
}

function checkResult(player, ai) {
 if (player === ai) {
  return 'draw';
 } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
  return 'win';
 } else {
  return 'loss';
 }
}

function aiChoice() {
 const randomChoice = hands[Math.floor(Math.random() * 3)].dataset.option;
 return randomChoice;
}

function playerChoice() {
 game.playerSelect = this.dataset.option;
 hands.forEach(hand => hand.style.boxShadow = '');
 this.style.boxShadow = '0 0 0 4px cadetblue';
}

function endGame() {
 document.querySelector(`[data-option="${game.playerSelect}"]`).style.boxShadow = '';
 game.playerSelect = '';
}

function startGame() {
 if (!game.playerSelect) {
  return alert("Wybierz najpierw dłoń!");
 }
 game.aiSelect = aiChoice();
 const gameResult = checkResult(game.playerSelect, game.aiSelect);
 gameScore(game.playerSelect, game.aiSelect, gameResult);
 endGame();
}

const hands = document.querySelectorAll('.select img');

hands.forEach(hand => hand.addEventListener('click', playerChoice));

document.querySelector('.start').addEventListener('click', startGame);