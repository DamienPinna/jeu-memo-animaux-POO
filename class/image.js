export class Image {
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
