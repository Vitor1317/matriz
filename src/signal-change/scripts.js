//Carrega Imagem do localStorage
const imgSrc = localStorage.getItem('image');
// Elementos visuais que serão adicionados eventos ou manipulação de seus dados
const signal = document.getElementById('signal');
const imageSignalChange = document.getElementById('signal-change-img');
const buttonSignalChange = document.getElementById('signal-change-button');

//Muda Sinal da Imagem
function signalChange() {
  imageSignalChange.src = imgSrc;
  imageSignalChange.style.transform = 'rotate3d(0, 180, 0, 180deg)';
  buttonSignalChange.style.display = 'none';
}

//Adiciona Evento de click ao botão de mudar sinal
buttonSignalChange.onclick = signalChange;

signal.src = imgSrc;
