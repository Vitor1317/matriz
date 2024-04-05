// Carrega Imagem do localStorage
const imgSrc = localStorage.getItem('image');

// Elementos visuais que serão adicionados eventos ou manipulação de seus dados
const signal = document.getElementById('signal');
const rotateToLeft = document.getElementById('rotate-to-left');
const rotateToRight = document.getElementById('rotate-to-right');
const actualDegree = document.querySelector('#actual-degree');
const degree = document.querySelector('#value');
const input = document.querySelector('#pi_input');

// Valor inicial da rotação
let previousRotate = 0;

// Adiciona o evento de input e carrega valor dos graus do input em tela
input.addEventListener('input', (event) => {
  degree.textContent = event.target.value;
});

// Função que rotaciona a imagem
function rotateImage(e) {
  let direction = e.srcElement.id == 'rotate-to-left' ? 'left' : 'right';

  direction == 'left'
    ? (previousRotate -= Number(degree.value))
    : (previousRotate += Number(degree.value));

  actualDegree.textContent = calculateNextDegree(direction);

  signal.style.transform = `rotate(${previousRotate}deg)`;
}

// Define a direção da rotação e rotaciona a imagem para o valor escolhido
function calculateNextDegree(direction) {
  const qtdToSum = Number(degree.value);
  const qtdAtual = Number(actualDegree.value);

  if (direction == 'left') {
    const finalDegree = qtdAtual - qtdToSum;

    return finalDegree < 0 ? 360 - Math.abs(finalDegree) : finalDegree;
  } else if (direction == 'right') {
    const finalDegree = qtdAtual + qtdToSum;

    if (finalDegree == 360) return 0;

    return finalDegree > 360 ? finalDegree - 360 : finalDegree;
  }
}

// adiciona Evento as setas de rotação
rotateToLeft.onclick = rotateImage;
rotateToRight.onclick = rotateImage;

// Carrega a imagem
signal.src = imgSrc;
