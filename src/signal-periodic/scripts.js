// Carrega Imagem do localStorage
const imageSrc = localStorage.getItem('image');

// Elementos visuais que serão adicionados eventos ou manipulação de seus dados
const signalPeriodicImage = document.getElementById('image');
const buttonGenerateSignal = document.getElementById('generate-signal');
const inputContainer = document.querySelector('.input-container');
const inputSpeed = document.getElementById('speed');
const inputTime = document.getElementById('time');

//variáveis de distância percorrida, tamanho da imagem, tamanho da tela, velocidade da imagem, valor do intervalo de deslocamento e do intervalo atual
let distance = 0;
let imageWidth;
const windowWidth = window.innerWidth;
let speedImage = Number.parseInt(inputSpeed.value);
let timeImage = Number.parseInt(inputTime.value);
let interval;

// Começa deslocamento com 5px em 100 milisegundos
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

// Desloca a imagem para a esquerda assim que é carregada em tela
function loadImage() {
  signalPeriodicImage.style.transform = `translateX(-${imageWidth}px)`;
  startSignal();
}

// Muda a velocidade e o intervalo de tempo do Deslocamento
function handleChangeSignal(event) {
  if (event.target.id === 'time') {
    clearInterval(interval);
    timeImage = Number.parseInt(inputTime.value);
    startSignal();
  }
  speedImage = Number.parseInt(inputSpeed.value);
}

// Carrega o Deslocamento
function handleGenerateSignal() {
  inputContainer.style.display = 'flex';
  signalPeriodicImage.src = imageSrc;
  imageWidth = signalPeriodicImage.width;
  buttonGenerateSignal.style.display = 'none';
}

// Adiciona evento à image, aos inputs e ao butão de gerar deslocamento
buttonGenerateSignal.onclick = handleGenerateSignal;
signalPeriodicImage.onload = loadImage;
inputContainer.onchange = handleChangeSignal;
