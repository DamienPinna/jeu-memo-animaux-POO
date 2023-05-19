'use strict';

class TimeUtils {
  static formatTime = (secondsScore) => {
    const minutes = Math.floor(secondsScore / 60);
    const seconds = secondsScore % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };
}

class Chronometer {
  constructor() {
    this.seconds = 0;
    this.intervalId = null;
    this.chronometer = document.querySelector("#chronometer");
  }

  updateChronometer = () => {
    this.seconds++;

    const formattedTime = TimeUtils.formatTime(this.seconds);
    this.chronometer.innerText = `${formattedTime}`;
  };

  startChronometer = () => {
    this.intervalId = setInterval(this.updateChronometer, 1000);
  };

  stopChronometer = () => {
    clearInterval(this.intervalId);
  };
}

class Image {
  static getImage(valueCell) {
    let pathImage = "./images/";
    switch (valueCell) {
      case 1:
        pathImage += "elephant.png";
        break;
      case 2:
        pathImage += "giraffe.png";
        break;
      case 3:
        pathImage += "/hippo.png";
        break;
      case 4:
        pathImage += "monkey.png";
        break;
      case 5:
        pathImage += "panda.png";
        break;
      case 6:
        pathImage += "parrot.png";
        break;
      case 7:
        pathImage += "penguin.png";
        break;
      case 8:
        pathImage += "pig.png";
        break;
      case 9:
        pathImage += "rabbit.png";
        break;
      case 10:
        pathImage += "snake.png";
        break;
      default:
        console.log("cellule non trouvée");
    }
    return pathImage;
  }
}

class GameBoard {
  constructor() {
    this.gameBoard = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];

    this.resultBoard = this.randomArrayGenerator();
  }

  randomArrayGenerator = () => {
    let array = [];
    let arrayImages = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < this.gameBoard.length; i++) {
      let row = [];
      for (let j = 0; j < this.gameBoard[0].length; j++) {
        let randowArrayGenerator = false;
        while (!randowArrayGenerator) {
          let randomImage = Math.floor(Math.random() * 10);
          if (arrayImages[randomImage] < 2) {
            row.push(randomImage + 1);
            arrayImages[randomImage]++;
            randowArrayGenerator = true;
          }
        }
      }
      array.push(row);
    }
    return array;
  };
}

class Game {
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

const chronometer = new Chronometer();
const game = new Game(chronometer);
const restart = document.querySelector(".restart");

chronometer.startChronometer();

game.displayGameBoard();

restart.addEventListener("click", () => {
  location.reload();
});
