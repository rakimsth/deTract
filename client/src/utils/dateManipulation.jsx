import moment from "moment";

export const getRemainingTime = (time) => {
  const givenDateSeconds = time;
  //   // Convert seconds to milliseconds and create a Date object
  const givenDate = new Date(givenDateSeconds * 1000);
  //   // Calculate the countdown duration (1 week in milliseconds)
  const countdownDuration = 7 * 24 * 60 * 60 * 1000;
  //   // Calculate the target date by subtracting the countdown duration
  const targetDate = new Date(givenDate.getTime() + countdownDuration);
  return moment(targetDate).from(new Date()).toString();
};
