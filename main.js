import Image from "./class/image.js";
import Chronometer from "./class/chronometer.js";
import GameBoard from "./class/gameBoard.js";

const chronometer = new Chronometer();
const gameBoard = new GameBoard();
const content = document.querySelector("#content");
const modal = document.querySelector("#modal");
const restart = document.querySelector(".restart");
const record = document.querySelector(".record");
const message = document.querySelector(".message");

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

  content.innerHTML = text;

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

const viewModal = () => {
  content.classList.add("hide");
  modal.classList.remove("hide");
};

const viewBestScore = (score) => {
  let bestScore = localStorage.getItem("bestScoreMemoAnimauxDP");
  bestScore = bestScore ? parseInt(bestScore) : 3600;

  if (score < bestScore) {
    if (bestScore !== 3600) {
      message.textContent = "Bravo ! Vous avez battu votre reccord !";
    }
    bestScore = score;
    localStorage.setItem("bestScoreMemoAnimauxDP", bestScore);
  } else {
    message.textContent = "Rejouez pour tenter de battre votre record.";
  }

  const formattedBestScore = formatTime(bestScore);
  record.textContent = `Votre meilleur temps est ${formattedBestScore}`;
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
          score = seconds;
          viewBestScore(score);
          viewModal();
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
