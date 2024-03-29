const imageSrc = localStorage.getItem('image');

const imageScale = document.getElementById('scale-image');
const scaleX = document.getElementById('scaleX');
const scaleY = document.getElementById('scaleY');
const scaleP = document.getElementById('scaleP');

imageScale.src = imageSrc;

function loadImageScale() {
  imageScale.style.transform = 'scale(0.5, 0.5)';
}

function handleChangeScaleImage(event) {
  event.target.id === 'scaleP'
    ? (imageScale.style.transform = `scale(${scaleP.value}%, ${scaleP.value}%)`)
    : (imageScale.style.transform = `scale(${scaleX.value}%, ${scaleY.value}%)`);
}

imageScale.onload = loadImageScale;
scaleX.onchange = handleChangeScaleImage;
scaleY.onchange = handleChangeScaleImage;
scaleP.onchange = handleChangeScaleImage;
