// Form
const form = document.querySelector("form");

// Inputs Countdown
let hoursInput = document.querySelector(".hours");
let minutesInput = document.querySelector(".minutes");
let secondsInput = document.querySelector(".seconds");

// Time
const output = document.querySelector(".output");
const clock = document.querySelector(".clock");
const clock12 = document.querySelector(".clock12");

// Elements to show and hide
const analog = document.querySelector(".analog");
const d12 = document.querySelector(".d-12");
const d24 = document.querySelector(".d-24");
const counter = document.querySelector(".countdown");
const christmasCountdown = document.querySelector(".christmas-countdown");

// Buttons
const analogButton = document.querySelector(".button-analog");
const d12Button = document.querySelector(".button-12");
const d24Button = document.querySelector(".button-24");
const countdownButton = document.querySelector(".button-timer");
const christmasButton = document.querySelector(".button-christmas");
const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".pause");
const resetButton = document.querySelector(".reset");

const mainButtons = [analogButton, d12Button, d24Button, countdownButton, christmasButton];
let totalSeconds = 0;
let countdown = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;
let paused = false;

/** ----------------- Analog Clock ---------------- */

const marks = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
let rotationDeg = 0;
marks.map((mark) => {
  analog.innerHTML += `<div class="number" style="transform: rotate(${rotationDeg}deg)"><div style="transform: rotate(${-rotationDeg}deg)">${mark}</div></div>`;
  rotationDeg += 30;
});

let secondHand = document.querySelector(".second");
let minuteHand = document.querySelector(".minute");
let hourHand = document.querySelector(".hour");

function moveAnalogTime() {
  console.log("gg");
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  secondHand.style.transform = `rotate(${seconds * (360 / 60)}deg)`;
  minuteHand.style.transform = `rotate(${minutes * (360 / 60)}deg)`;
  hourHand.style.transform = `rotate(${hours * (360 / 12)}deg)`;
}

setInterval(moveAnalogTime, 1000);

/** ----------------- Digital Clocks --------------- */

// Get the current time
const getTime = () => {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let session = "am";

  // Get the time and session for the 12h clock
  let hh = h;
  session = hh < 12 ? "am" : "pm";

  // Allow values only from 1 to 12 for the 12h clock
  if (hh === 0) hh = 12;
  if (hh > 12) hh = hh - 12;

  function addZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  // Show the time in the browser
  clock.innerHTML = addZero(h) + ":" + addZero(m) + ":" + addZero(s) + " ";
  clock12.innerHTML = addZero(hh) + ":" + addZero(m) + ":" + addZero(s) + " " + session;

  // Call this function every 1 seconds
  setTimeout(getTime, 1000);
};

getTime();

/** ----------------- Countdown --------------- */
function showTimer(hours, minutes, seconds) {
  output.textContent = `${parseInt(hours)}h : ${parseInt(minutes)}m : ${parseInt(seconds)}s `;
}
const startCountdown = (ev) => {
  if (!paused) {
    hours = hoursInput.value ? hoursInput.value : "0";
    minutes = minutesInput.value ? minutesInput.value : "0";
    seconds = secondsInput.value ? secondsInput.value : "0";
    manageUI();
  }

  showTimer(hours, minutes, seconds);
  totalSeconds = parseInt(hours) * 60 * 60 + parseInt(minutes) * 60 + parseInt(seconds);
  countdown = setInterval(() => {
    moveTime();
  }, 1000);
};

const moveTime = () => {
  totalSeconds--;
  hours = Math.floor(totalSeconds / (60 * 60));
  // We get the number of seconds in an hour, then we convert them to minutes and then we substract this amount to the number of minutes in the total seconds
  minutes = Math.floor((totalSeconds % 3600) / 60);
  seconds = totalSeconds % 60;

  showTimer(hours, minutes, seconds);
  if (totalSeconds < 0) {
    clearInterval(countdown);
    setTimeout(resetCountdown, 500);
    alert("Time's up!");
  }
};

const manageUI = () => {
  output.classList.toggle("hidden");
  pauseButton.classList.toggle("hidden");
  resetButton.classList.toggle("hidden");
  form.classList.toggle("hidden");
  startButton.classList.toggle("hidden");
};

const pauseCountdown = () => {
  if (pauseButton.innerHTML === "Pause") {
    clearInterval(countdown);
    pauseButton.innerHTML = "Resume";
    paused = true;
  } else {
    pauseButton.innerHTML = "Pause";
    startCountdown();
    paused = false;
  }
};

const resetCountdown = () => {
  clearInterval(countdown);
  form.reset();
  manageUI();
  startButton.setAttribute("disabled", "disabled");
};
// Enable the start button once at least one of the inputs have changed
const validateStart = () => {
  startButton.removeAttribute("disabled");
};

/** ----------------- Countdown Till Christmas --------------- */

function getDaysUntilChristmas() {
  const today = new Date();
  let christmasDay = new Date(today.getFullYear(), 11, 25);

  let currentMonth = today.getMonth() + 1;
  let currentDay = today.getDate();
  let daysTo = 0;
  let hoursTo = 0;
  let minutesTo = 0;
  let secondsTo = 0;

  if (currentMonth === 12 && currentDay > 25) {
    christmasDay.setFullYear(christmasDay.getFullYear() + 1);
  }

  // Total seconds of difference between today and Christmas day in milliseconds divided by the amount of miliseconds in a second
  let totalSeconds = Math.ceil((christmasDay - today) / 1000);

  daysTo = Math.floor(totalSeconds / (24 * 60 * 60));
  hoursTo = Math.floor((totalSeconds / (60 * 60)) % 24);
  minutesTo = Math.floor(totalSeconds / 60) % 60;
  secondsTo = Math.floor(totalSeconds) % 60;

  const intervalCountdown = setTimeout(() => {
    getDaysUntilChristmas();
  }, 1000);

  showCountdown = () => {
    document.querySelector(".ch-days").textContent = `${daysTo} days`;
    document.querySelector(".ch-hours").textContent = `${hoursTo} hours`;
    document.querySelector(".ch-minutes").textContent = `${minutesTo} mins`;
    document.querySelector(".ch-seconds").textContent = `${secondsTo} sec`;
  };
  showCountdown();

  if (daysTo === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    clear.setTimeout(intervalCountdown);
    document.querySelector(".d-day").classList.remove("hidden");
  }
}

getDaysUntilChristmas();

/** ----------------- Show different time elements --------------- */

const showClock = (ev) => {
  // Add hidden class to all hideable elements
  [analog, d12, d24, counter, christmasCountdown].forEach((element) => {
    return element.classList.add("hidden");
  });

  // Remove the active button class from all elements
  mainButtons.forEach((button) => {
    return button.classList.remove("active-button");
  });
  // Add the active button class to the clicked button
  ev.target.classList.add("active-button");

  // Remove hidden class from the element we want to see
  const className = ev.target.classList;
  document.querySelector("body").classList.remove("christmas");
  switch (true) {
    case className.contains("button-analog"):
      return analog.classList.remove("hidden");
    case className.contains("button-12"):
      return d12.classList.remove("hidden");
    case className.contains("button-24"):
      return d24.classList.remove("hidden");
    case className.contains("button-timer"):
      return counter.classList.remove("hidden");
    case className.contains("button-christmas"):
      document.querySelector("body").classList.add("christmas");
      return christmasCountdown.classList.remove("hidden");
  }
};

mainButtons.map((button) => button.addEventListener("click", showClock));
