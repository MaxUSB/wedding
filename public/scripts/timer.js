const getTimeRemaining = (deadline) => {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let days = 0;

  const time = Date.parse(deadline) - new Date();
  if (time > 0) {
    seconds = Math.floor((time / 1000) % 60);
    minutes = Math.floor((time / 1000 / 60) % 60);
    hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    days = Math.floor(time / (1000 * 60 * 60 * 24));
  }

  return {
    total: time,
    seconds: seconds,
    minutes: minutes,
    hours: hours,
    days: days,
  };
}

const initializeClock = (deadline) => {
  const daysSpan = $('#timer-days');
  const hoursSpan = $('#timer-hours');
  const minutesSpan = $('#timer-minutes');
  const secondsSpan = $('#timer-seconds');

  const updateClock = () => {
    const time = getTimeRemaining(deadline);

    if (time.days >= 100) {
      daysSpan.text(time.days);
    } else {
      daysSpan.text(('0' + time.days).slice(-2));
    }
    hoursSpan.text(('0' + time.hours).slice(-2));
    minutesSpan.text(('0' + time.minutes).slice(-2));
    secondsSpan.text(('0' + time.seconds).slice(-2));

    if (time.total <= 0) {
      clearInterval(timeInterval);
    }
  }

  updateClock();
  const timeInterval = setInterval(updateClock, 1000);
}

const deadlineDate = "2024-08-08";
const deadlineTime = "18:00";
const deadlineUtc = "+05:00";

const deadline = new Date(deadlineDate + 'T' + ('0' + deadlineTime).slice(-5) + deadlineUtc);
initializeClock(deadline);
