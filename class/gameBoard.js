export default class GameBoard {
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
