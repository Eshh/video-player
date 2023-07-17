const player = document.querySelector(".player");
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
const playBack = document.querySelector("select");

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

function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

let lastVolume = 1;
// Volume Controls --------------------------- //
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  volume = volume < 0.1 ? 0 : volume > 0.9 ? 1 : volume;
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  let arr = ["fas"];
  volume > 0.7
    ? arr.push("fa-volume-up")
    : volume < 0.7 && volume > 0
    ? arr.push("fa-volume-down")
    : volume == 0
    ? arr.push("fa-volume-off")
    : arr;
  volumeIcon.className = `${arr[0]} ${arr[1]}`;
  lastVolume = volume;
}

function toggleMute() {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.className = "";
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add("fas", "fa-volume-up");
    volumeIcon.setAttribute("title", "mute");
  }
}

// Change Playback Speed -------------------- //
function changePlaybackRate() {
  video.playbackRate = playBack.value;
}

// Fullscreen ------------------------------- //
let fullScreenFlag = false;

function toggleFullScreen() {
  fullScreenFlag ? closeFullscreen() : openFullscreen(player);
  fullScreenFlag = !fullScreenFlag;
}
/* View in fullscreen */
function openFullscreen(elem) {
  video.classList.add("video-fullScreen");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  video.classList.remove("video-fullScreen");
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

playButton.addEventListener("click", playPauseVideo);
video.addEventListener("click", playPauseVideo);
video.addEventListener("ended", () => {
  video.pause();
  playButton.classList.replace("fa-pause", "fa-play");
  playButton.setAttribute("title", "Play");
});
video.addEventListener("canplay", updateProgress);
video.addEventListener("timeupdate", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
playBack.addEventListener("change", changePlaybackRate);
fullScreen.addEventListener("click", toggleFullScreen);
