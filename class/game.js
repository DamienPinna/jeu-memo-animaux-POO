import TimeUtils from "./timeUtils.js";

export default class Game {
  constructor() {
    this.content = document.querySelector("#content");
    this.modal = document.querySelector("#modal");
    this.record = document.querySelector(".record");
    this.message = document.querySelector(".message");
  }

  viewModal = () => {
    this.content.classList.add("hide");
    this.modal.classList.remove("hide");
  };

  viewBestScore = (score) => {
    let bestScore = localStorage.getItem("bestScoreMemoAnimauxDP");
    bestScore = bestScore ? parseInt(bestScore) : 3600;

    if (score < bestScore) {
      if (bestScore !== 3600) {
        message.textContent = "Bravo ! Vous avez battu votre reccord !";
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
