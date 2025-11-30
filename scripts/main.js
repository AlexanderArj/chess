import { initApp } from "./initApp.mjs";

const audio = document.getElementById("audio");
const modal = document.getElementById("startModal");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
  audio.play();

  modal.classList.add("fade-out");

  setTimeout(() => { modal.style.display = "none";}, 800);

  initApp();

});
