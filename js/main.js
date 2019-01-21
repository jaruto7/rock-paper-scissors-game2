// Stwórz w zmiennej stałej właściwości które przechowują obiekty gry
const game = {
 playerChoice: "",
 aiChoice: "",
}

const gameSummary = {
 rounds: 0,
 wins: 0,
 losses: 0,
 draws: 0,
}

// Utwórz zmienną stałą która pobierze wszystkie elementy img
const hands = document.querySelectorAll('.select img');

// Stwórz zmienną stałą która przechowuje parametry w anonimowej funkcji
const checkResult = (player, ai) => {
 // console.log(player, ai);
 // Sprawdź czy gracz i komputer wybrał te same dłonie i zwróć wartość
 if (player === ai) {
  return 'draw';
  // Sprawdź czy gracz przegrał z komputerem i zwróć wartość
 } else if ((player === 'papier' && ai === 'kamień') || (player === 'kamień' && ai === 'nożyczki') || (player === 'nożyczki' && ai === 'papier')) {
  return 'win';
  // W przeciwnym razie zwróć inną wartość
 } else {
  return 'lose';
 }
}

// Przypisz anonimową funcję do zmiennej stałej
const randomChoice = () => {
 // Przypisz zmienną stałą która przechowuje tablicę i losową wartość index a następnie użyj właściwości aby pobrać nazwę losowo wybranego elementu img
 const number = hands[Math.floor(Math.random() * 3)].dataset.option;
 // Zwróć wynik
 return number;
}
// Przypisz do anonimowej funkcji zmienną stałą
const selectHand = function () {
 // console.log(this);
 // Przypisz do obiektu wartość elementu który został kliknięty
 game.playerChoice = this.dataset.option;
 // Użyj metody forEach aby dezaktywować obramowanie przy elementach img
 hands.forEach(img => img.style.boxShadow = '');
 // Użyj obiektu this aby aktywować obramowanie elementu który został kliknięty
 this.style.boxShadow = '0 0 0 4px cadetblue';

}

// Publikacja wyniku
// Przypisz do funkcji parametr trzeci który sprawdza rezultat wyniku funkcji checkResult()
const publishResult = (player, ai, result) => {
 // Pobierz elementy i wyświetl w tych elementach zawartość wyniku gry - preinkrementuj o 1
 // Zwiększ liczbę gier za każdym razem o jeden
 document.querySelector('.numbers span').textContent = ++gameSummary.rounds;
 document.querySelector('[data-summary="your-choice"]').textContent = player;
 document.querySelector(`[data-summary="ai-choice"]`).textContent = ai;
 // Jeśli wynik jest równy wartości, wyświetl blok kodu
 if (result === 'win') {
  document.querySelector('.wins span').textContent = ++gameSummary.wins;
  document.querySelector('[data-summary="who-win"]').textContent = 'Wygrałeś!';
  // Pobierz element i zmień kolor wyświetlanej informacji
  document.querySelector('[data-summary="who-win"]').style.color = 'green';
 } else if (result === 'lose') {
  document.querySelector('.losses span').textContent = ++gameSummary.losses;
  document.querySelector('[data-summary="who-win"]').textContent = 'Przegrałeś :/';
  document.querySelector('[data-summary="who-win"]').style.color = 'red';
 } else {
  document.querySelector('.draws span').textContent = ++gameSummary.draws;
  document.querySelector('[data-summary="who-win"]').textContent = 'Remis!';
  document.querySelector('[data-summary="who-win"]').style.color = 'gray';
 }
}

// Funkcja sterujaca
const startGame = () => {
 // Sprawdz czy użytkownik wybrał którąś z opcji, jeśli nie wybrał, wyświetl komunikat powiadamiający 
 if (game.playerChoice === "") {
  return alert('Musisz najpierw wybrać rękę!');
 }
 // Przypisz do właściwości obiektu funkcję i wywołaj ją
 game.aiChoice = randomChoice();
 // przypisz do zmiennej walidację wyniku przekazując wartości w środku funkcji
 const gameResult = checkResult(game.playerChoice, game.aiChoice);
 // Wywołaj funkcję która wyświetla rezultat wyniku i przekaż wartości w środku funkcji
 publishResult(game.playerChoice, game.aiChoice, gameResult);
}

// Użyj metody forEach do iterowania po elementach img
hands.forEach(hand => hand.addEventListener('click', selectHand));

// Nasłuchuj na kliknięcie przycisku i wywołaj funkcję
document.querySelector('.start').addEventListener('click', startGame);