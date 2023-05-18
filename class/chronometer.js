import TimeUtils from "./timeUtils.js";

export default class Chronometer {
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
