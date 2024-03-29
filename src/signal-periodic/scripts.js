const imageSrc = localStorage.getItem('image');

const signalPeriodicImage = document.getElementById('image');
const buttonGenerateSignal = document.getElementById('generate-signal');
const inputContainer = document.querySelector('.input-container');
const inputSpeed = document.getElementById('speed');
const inputTime = document.getElementById('time');

let distance = 0;
let imageWidth;
const windowWidth = window.innerWidth;
let speedImage = Number.parseInt(inputSpeed.value);
let timeImage = Number.parseInt(inputTime.value);
let interval;

function startSignal() {
  interval = setInterval(() => {
    let diferenceWidth = windowWidth - distance - imageWidth;
    let positionImage = distance - imageWidth;

    if (diferenceWidth > speedImage) {
      signalPeriodicImage.style.transform = `translateX(${positionImage}px)`;
      distance += speedImage;
    } else {
      signalPeriodicImage.style.transform = `translateX(-${imageWidth}px)`;
      distance = 0;
    }
  }, timeImage);
}

function loadImage() {
  signalPeriodicImage.style.transform = `translateX(-${imageWidth}px)`;
  startSignal();
}

function handleChangeSignal(event) {
  if (event.target.id === 'time') {
    clearInterval(interval);
    timeImage = Number.parseInt(inputTime.value);
    startSignal();
  }
  speedImage = Number.parseInt(inputSpeed.value);
}

function handleGenerateSignal() {
  inputContainer.style.display = 'flex';
  signalPeriodicImage.src = imageSrc;
  imageWidth = signalPeriodicImage.width;
  buttonGenerateSignal.style.display = 'none';
}

buttonGenerateSignal.onclick = handleGenerateSignal;
signalPeriodicImage.onload = loadImage;
inputContainer.onchange = handleChangeSignal;
