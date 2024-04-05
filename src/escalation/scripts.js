// Carrega imgagem do localStorage
const imageSrc = localStorage.getItem('image');
// Elementos visuais que serão adicionados eventos ou manipulação de seus dados
const imageScale = document.getElementById('scale-image');
const scaleX = document.getElementById('scaleX');
const scaleY = document.getElementById('scaleY');
const scaleP = document.getElementById('scaleP');

// Carrega a Imagem
imageScale.src = imageSrc;

// Modifica a escala da imagem para 50% de seu tamanho assim que a imagem é carregada
function loadImageScale() {
  imageScale.style.transform = 'scale(0.5, 0.5)';
}

// Captura a proporção desejada pelo usuário e modifica a escala da imagem
function handleChangeScaleImage(event) {
  event.target.id === 'scaleP'
    ? (imageScale.style.transform = `scale(${scaleP.value}%, ${scaleP.value}%)`)
    : (imageScale.style.transform = `scale(${scaleX.value}%, ${scaleY.value}%)`);
}

// Adiciona evento de carregamento à imagem
imageScale.onload = loadImageScale;
//Adiciona evento aos inputs
scaleX.onchange = handleChangeScaleImage;
scaleY.onchange = handleChangeScaleImage;
scaleP.onchange = handleChangeScaleImage;
