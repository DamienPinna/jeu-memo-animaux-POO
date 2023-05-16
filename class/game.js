export default class Game {
  constructor() {
    this.restart = document.querySelector(".restart");
  }

  checkCell(cell) {
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
  }
}
