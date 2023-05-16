export default class GameBoard {
  constructor() {
    this.gameBoard = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ];
    this.resultBoard = this.randowArrayGenerator();
    this.content = document.querySelector("#content");
    this.nbClick = 0;
    this.canPlay = true;
    this.oldSelection = [];
    this.displayGameBoard();
  }

  randowArrayGenerator() {
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
  }

  displayGameBoard() {
    let text = "";

    this.gameBoard.forEach((row, indexRow) => {
      text += "<div>";
      row.forEach((cell, indexColumn) => {
        if (cell === 0) {
          text += `<button class='item' onclick='checkCell(\"${indexRow}-${indexColumn}\")'><span class='text-item'>Dévoiler</span></button>`;
        } else {
          text += `<img src='${getImage(
            cell
          )}' alt='image' class='p_size-card'/>`;
        }
      });
      text += "</div>";
    });

    content.innerHTML = text;
  }
}
