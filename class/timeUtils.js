export default class TimeUtils {
  static formatTime = (secondsScore) => {
    const minutes = Math.floor(secondsScore / 60);
    const seconds = secondsScore % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };
}
