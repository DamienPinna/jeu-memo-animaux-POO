import Chronometer from "./class/chronometer.js";
import Game from "./class/game.js";

const chronometer = new Chronometer();
const game = new Game(chronometer);
const restart = document.querySelector(".restart");

chronometer.startChronometer();

game.displayGameBoard();

restart.addEventListener("click", () => {
  location.reload();
});
