const imageSrc = localStorage.getItem('image');
const image = document.getElementById('image');
const inputBlur = document.getElementById('blur');
const inputContrast = document.getElementById('contrast');
const inputGrayscale = document.getElementById('grayscale');
const inputHuerotate = document.getElementById('hue-rotate');

image.src = imageSrc;

function blur() {
  image.style.filter = `blur(${inputBlur.value / 5}px)`;
}

function contrast() {
  image.style.filter = `contrast(${inputContrast.value * 10}%)`;
}

function grayscale() {
  image.style.filter = `grayscale(${inputGrayscale.value}%)`;
}

function huerotate() {
  image.style.filter = `hue-rotate(${inputHuerotate.value * 3.6}deg)`;
}

inputBlur.onchange = blur;
inputContrast.onchange = contrast;
inputGrayscale.onchange = grayscale;
inputHuerotate.onchange = huerotate;
