const imgSrc = localStorage.getItem('image');

const signal = document.getElementById('signal');
const imageSignalChange = document.getElementById('signal-change-img');
const buttonSignalChange = document.getElementById('signal-change-button');

function signalChange() {
  imageSignalChange.src = imgSrc;
  imageSignalChange.style.transform = 'rotate3d(0, 180, 0, 180deg)';
  buttonSignalChange.style.display = 'none';
}

buttonSignalChange.onclick = signalChange;

signal.src = imgSrc;
