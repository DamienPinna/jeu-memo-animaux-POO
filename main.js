const content = document.querySelector("#content");
const chronometer = document.querySelector("#chronometer");
const modal = document.querySelector("#modal");
const restart = document.querySelector(".restart");
const record = document.querySelector(".record");
const message = document.querySelector(".message");

let seconds = 0;
let intervalId;
let odlSelection = [];
let nbClick = 0;
let canPlay = true;
let score = 0;

const gameBoard = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];

const formatTime = (secondsScore) => {
  const minutes = Math.floor(secondsScore / 60);
  const seconds = secondsScore % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
};

const updateChronometer = () => {
  seconds++;

  const formattedTime = formatTime(seconds);
  chronometer.innerText = `${formattedTime}`;
};

const startChronometer = () => {
  intervalId = setInterval(updateChronometer, 1000);
};

const stopChronometer = () => {
  clearInterval(intervalId);
};

startChronometer();

const randowArrayGenerator = () => {
  let array = [];
  let arrayImages = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < gameBoard.length; i++) {
    let row = [];
    for (let j = 0; j < gameBoard[0].length; j++) {
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

const resultBoard = randowArrayGenerator();

const getImage = (valueCell) => {
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
};

const displayGameBoard = () => {
  let text = "";

  gameBoard.forEach((row, indexRow) => {
    text += "<div>";
    row.forEach((cell, indexColumn) => {
      if (cell === 0) {
        text += `<button class='item' id='button-${indexRow}-${indexColumn}'><span class='text-item'>Dévoiler</span></button>`;
      } else {
        text += `<img src='${getImage(
          cell
        )}' alt='image' class='p_size-card'/>`;
      }
    });
    text += "</div>";
  });

  content.innerHTML = text;

  gameBoard.forEach((row, indexRow) => {
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
    gameBoard[row][column] = resultBoard[row][column];
    displayGameBoard();

    if (nbClick > 1) {
      canPlay = false;
      setTimeout(() => {
        if (
          gameBoard[row][column] !==
          resultBoard[odlSelection[0]][odlSelection[1]]
        ) {
          gameBoard[row][column] = 0;
          gameBoard[odlSelection[0]][odlSelection[1]] = 0;
        }
        displayGameBoard();
        canPlay = true;
        nbClick = 0;
        odlSelection = [row, column];
        if (!gameBoard.flat().includes(0)) {
          stopChronometer();
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
