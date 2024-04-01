const imgSrc = localStorage.getItem('image');

const signal = document.getElementById('signal');

const rotateToLeft = document.getElementById('rotate-to-left');
const rotateToRight = document.getElementById('rotate-to-right');

const actualDegree = document.querySelector('#actual-degree');

const degree = document.querySelector('#value');
const input = document.querySelector('#pi_input');

let previousRotate = 0;

input.addEventListener('input', (event) => {
  degree.textContent = event.target.value;
});

function rotateImage(e) {
  let direction = e.srcElement.id == 'rotate-to-left' ? 'left' : 'right';

  direction == 'left'
    ? (previousRotate -= Number(degree.value))
    : (previousRotate += Number(degree.value));

  actualDegree.textContent = calculateNextDegree(direction);

  signal.style.transform = `rotate(${previousRotate}deg)`;
}

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

rotateToLeft.onclick = rotateImage;
rotateToRight.onclick = rotateImage;

signal.src = imgSrc;
