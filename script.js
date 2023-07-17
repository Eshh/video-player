const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playButton = document.getElementById("play-button");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullScreen = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //
function playPauseVideo() {
  if (video.paused) {
    video.play();
    playButton.classList.replace("fa-play", "fa-pause");
    playButton.setAttribute("title", "Pause");
  } else {
    video.pause();
    playButton.classList.replace("fa-pause", "fa-play");
    playButton.setAttribute("title", "Play");
  }
}
// Progress Bar ---------------------------------- //

function calculateDisplayTimeFormat(time) {
  const min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  sec = sec < 10 ? `0${sec}` : sec;
  return `${min}:${sec}`;
}
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = calculateDisplayTimeFormat(video.currentTime) + "/";
  duration.textContent = calculateDisplayTimeFormat(video.duration);
}

// Volume Controls --------------------------- //

// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

playButton.addEventListener("click", playPauseVideo);
video.addEventListener("click", playPauseVideo);
video.addEventListener("ended", playPauseVideo);
video.addEventListener("canplay", updateProgress);
video.addEventListener("timeupdate", updateProgress);
