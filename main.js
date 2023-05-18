import Image from "./class/image.js";
import Chronometer from "./class/chronometer.js";
import GameBoard from "./class/gameBoard.js";
import Game from "./class/game.js";

const chronometer = new Chronometer();
const gameBoard = new GameBoard();
const game = new Game();
const restart = document.querySelector(".restart");

let odlSelection = [];
let nbClick = 0;
let canPlay = true;
let score = 0;

chronometer.startChronometer();

const displayGameBoard = () => {
  let text = "";

  gameBoard.gameBoard.forEach((row, indexRow) => {
    text += "<div>";
    row.forEach((cell, indexColumn) => {
      if (cell === 0) {
        text += `<button class='item' id='button-${indexRow}-${indexColumn}'><span class='text-item'>Dévoiler</span></button>`;
      } else {
        text += `<img src='${Image.getImage(
          cell
        )}' alt='image' class='p_size-card'/>`;
      }
    });
    text += "</div>";
  });

  game.content.innerHTML = text;

  gameBoard.gameBoard.forEach((row, indexRow) => {
    row.forEach((cell, indexColumn) => {
      if (cell === 0) {
        const button = document.getElementById(
          `button-${indexRow}-${indexColumn}`
        );
        button.addEventListener("click", () => {
          checkCell(`${indexRow}-${indexColumn}`);
        });
      }
    });
  });
};

const checkCell = (cell) => {
  if (canPlay) {
    nbClick++;
    const row = cell.substr(0, 1);
    const column = cell.substr(2, 1);
    gameBoard.gameBoard[row][column] = gameBoard.resultBoard[row][column];
    displayGameBoard();

    if (nbClick > 1) {
      canPlay = false;
      setTimeout(() => {
        if (
          gameBoard.gameBoard[row][column] !==
          gameBoard.resultBoard[odlSelection[0]][odlSelection[1]]
        ) {
          gameBoard.gameBoard[row][column] = 0;
          gameBoard.gameBoard[odlSelection[0]][odlSelection[1]] = 0;
        }
        displayGameBoard();
        canPlay = true;
        nbClick = 0;
        odlSelection = [row, column];
        if (!gameBoard.gameBoard.flat().includes(0)) {
          chronometer.stopChronometer();
          score = chronometer.seconds;
          game.viewBestScore(score);
          game.viewModal();
        }
      }, 1000);
    } else {
      odlSelection = [row, column];
    }
  }
};

displayGameBoard();

restart.addEventListener("click", () => {
  location.reload();
});
