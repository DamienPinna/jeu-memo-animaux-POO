import Image from "./image.js";
import TimeUtils from "./timeUtils.js";
import GameBoard from "./gameBoard.js";

export default class Game {
  constructor(chronometer) {
    this.gameBoard = new GameBoard();
    this.chronometer = chronometer;
    this.content = document.querySelector("#content");
    this.modal = document.querySelector("#modal");
    this.record = document.querySelector(".record");
    this.message = document.querySelector(".message");
    this.odlSelection = [];
    this.nbClick = 0;
    this.canPlay = true;
    this.score = 0;
  }

  displayGameBoard = () => {
    let text = "";

    this.gameBoard.gameBoard.forEach((row, indexRow) => {
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

    this.content.innerHTML = text;

    this.gameBoard.gameBoard.forEach((row, indexRow) => {
      row.forEach((cell, indexColumn) => {
        if (cell === 0) {
          const button = document.getElementById(
            `button-${indexRow}-${indexColumn}`
          );
          button.addEventListener("click", () => {
            this.checkCell(`${indexRow}-${indexColumn}`);
          });
        }
      });
    });
  };

  checkCell = (cell) => {
    if (this.canPlay) {
      this.nbClick++;
      const row = cell.substr(0, 1);
      const column = cell.substr(2, 1);
      this.gameBoard.gameBoard[row][column] =
        this.gameBoard.resultBoard[row][column];
      this.displayGameBoard();

      if (this.nbClick > 1) {
        this.canPlay = false;
        setTimeout(() => {
          if (
            this.gameBoard.gameBoard[row][column] !==
            this.gameBoard.resultBoard[this.odlSelection[0]][
              this.odlSelection[1]
            ]
          ) {
            this.gameBoard.gameBoard[row][column] = 0;
            this.gameBoard.gameBoard[this.odlSelection[0]][
              this.odlSelection[1]
            ] = 0;
          }
          this.displayGameBoard();
          this.canPlay = true;
          this.nbClick = 0;
          this.odlSelection = [row, column];
          if (!this.gameBoard.gameBoard.flat().includes(0)) {
            this.chronometer.stopChronometer();
            this.score = this.chronometer.seconds;
            this.viewBestScore(this.score);
            this.viewModal();
          }
        }, 1000);
      } else {
        this.odlSelection = [row, column];
      }
    }
  };

  viewModal = () => {
    this.content.classList.add("hide");
    this.modal.classList.remove("hide");
  };

  viewBestScore = (score) => {
    let bestScore = localStorage.getItem("bestScoreMemoAnimauxDP");
    bestScore = bestScore ? parseInt(bestScore) : 3600;

    if (score < bestScore) {
      if (bestScore !== 3600) {
        this.message.textContent = "Bravo ! Vous avez battu votre reccord !";
      }
      bestScore = score;
      localStorage.setItem("bestScoreMemoAnimauxDP", bestScore);
    } else {
      this.message.textContent = "Rejouez pour tenter de battre votre record.";
    }

    const formattedBestScore = TimeUtils.formatTime(bestScore);
    this.record.textContent = `Votre meilleur temps est ${formattedBestScore}`;
  };
}
