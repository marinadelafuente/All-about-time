// Form
const form = document.querySelector("form");

// Inputs
let hoursInput = document.querySelector(".hours");
let minutesInput = document.querySelector(".minutes");
let secondsInput = document.querySelector(".seconds");

// Timer
const output = document.querySelector(".output");
const clock = document.querySelector(".clock");
const clock12 = document.querySelector(".clock12");

// Elements to show and hide
const d12 = document.querySelector(".d-12");
const d24 = document.querySelector(".d-24");
const counter = document.querySelector(".countdown");
const christmasCountdown = document.querySelector(".christmas-countdown");

// Buttons
const d12Button = document.querySelector(".button-12");
const d24Button = document.querySelector(".button-24");
const countdownButton = document.querySelector(".button-timer");
const christmasButton = document.querySelector(".button-christmas");
const startButton = document.querySelector(".start");
const pauseButton = document.querySelector(".pause");
const resetButton = document.querySelector(".reset");

const mainButtons = [d12Button, d24Button, countdownButton, christmasButton];
let totalSeconds = 0;
let countdown = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;
let paused = false;

// **Digital Clocks

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

  // Add a 0 before the hours, minutes and seconds when they are a single digit
  hh = hh >= 10 ? hh : `0${hh}`;
  h = h >= 10 ? h : `0${h}`;
  m = m >= 10 ? m : `0${m}`;
  s = s >= 10 ? s : `0${s}`;

  // Show the time in the browser
  clock.innerHTML = h + ":" + m + ":" + s + " ";
  clock12.innerHTML = hh + ":" + m + ":" + s + " " + session;

  // Call this function every 1 seconds
  setTimeout(getTime, 1000);
};

getTime();

// **Countdown
const startCountdown = (ev) => {
  if (!paused) {
    hours = hoursInput.value ? hoursInput.value : "0";
    minutes = minutesInput.value ? minutesInput.value : "0";
    seconds = secondsInput.value ? secondsInput.value : "0";
    manageUI();
  }

  output.innerHTML = hours + "h " + minutes + "m " + seconds + "s";
  totalSeconds = parseInt(hours) * 60 * 60 + parseInt(minutes) * 60 + parseInt(seconds);
  //   timer();
  countdown = setInterval(() => {
    timer();
  }, 1000);
};

const timer = () => {
  totalSeconds--;
  hours = Math.floor(totalSeconds / (60 * 60));
  // We get the number of seconds in an hour, then we convert them to minutes and then we substract this amount to the number of minutes in the total seconds
  minutes = Math.floor((totalSeconds % 3600) / 60);
  seconds = totalSeconds % 60;

  output.innerHTML = hours + "h " + minutes + "m " + seconds + "s";
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

// **Countdown Till Christmas

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

// **Show Different Clock Elements
const showClock = (ev) => {
  // Add hidden class to all hideable elements
  [d12, d24, counter, christmasCountdown].forEach((element) => {
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
