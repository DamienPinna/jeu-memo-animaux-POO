export default class Score {
  constructor() {
    this.seconds = 0;
    this.intervalId = null;
    this.score = 0;
    this.chronometer = document.querySelector("#chronometer");
    this.record = document.querySelector(".record");
    this.message = document.querySelector(".message");
    this.content = document.querySelector("#content");
    this.modal = document.querySelector("#modal");
  }

  formatTime(secondsScore) {
    const minutes = Math.floor(secondsScore / 60);
    const seconds = secondsScore % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  startChronometer() {
    this.intervalId = setInterval(this.updateChronometer, 1000);
  }

  updateChronometer() {
    this.seconds++;
    const formattedTime = this.formatTime(this.seconds);
    this.chronometer.innerText = `${formattedTime}`;
  }

  stopChronometer() {
    clearInterval(this.intervalId);
  }

  viewBestScore(score) {
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
  }

  viewModal() {
    content.classList.add("hide");
    modal.classList.remove("hide");
  }
}
