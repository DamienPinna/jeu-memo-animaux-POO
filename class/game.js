export default class Game {
  constructor() {
    this.content = document.querySelector("#content");
    this.modal = document.querySelector("#modal");
  }

  viewModal = () => {
    content.classList.add("hide");
    modal.classList.remove("hide");
  };
}
