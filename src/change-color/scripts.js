// importa da pasta utils funções de conversão de cores
import { hexToRgb, hexToRgba } from '../../utils/conversion.js';

// Elementos visuais que serão adicionados eventos ou manipulação de seus dados
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const linkGoBack = document.getElementById('go-back');
const buttonChooseColor = document.getElementById('choose-color');
const input_red = document.getElementById('red');
const input_green = document.getElementById('green');
const input_blue = document.getElementById('blue');
const container_inputs = document.getElementById('container-inputs');
const preview_color = document.getElementById('preview-color');
const title = document.querySelectorAll('.title');
const input_color = document.getElementById('input-color');
const span_container = document.getElementById('span-container');

//Variável que conta as cores de mesma tonalidade encontradas
let counter = 0;

//Carrega Matriz do localStorage
const matriz = JSON.parse(localStorage.getItem('matriz'));

const width = (canvas.width = matriz[0].length);
const height = (canvas.height = matriz.length);

const span = document.createElement('span');

container_inputs.addEventListener('change', () => {
  preview_color.style.backgroundColor = `rgb(${input_red.value},${input_green.value},${input_blue.value})`;
});

// Muda as cores da imagem
function reDraw(color, swap) {
  function getRGBA(codeColor) {
    const rbga = codeColor.replace(
      /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)$/,
      '$1,$2,$3,$4',
    );
    return rbga.split(',');
  }
  //verifica para todas as cores de mesma tonalidade
  function isIntervalColor(colorChoose, colorMatriz) {
    colorMatriz = Number(colorMatriz);

    if (colorChoose <= colorMatriz && colorChoose + 50 >= colorMatriz) {
      return true;
    }

    if (colorChoose >= colorMatriz && colorChoose - 50 <= colorMatriz) {
      return true;
    }

    return false;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (matriz[y][x] === 'rgba(0,0,0,0)') continue;
      const [red, green, blue] = color;
      const [mRed, mGreen, mBlue] = getRGBA(matriz[y][x]);
      if (
        isIntervalColor(red, mRed) &&
        isIntervalColor(green, mGreen) &&
        isIntervalColor(blue, mBlue)
      ) {
        counter++;
        const color = hexToRgba(swap);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
        matriz[y][x] = color;
      }
    }
  }
}

// Responsável por pegar a cor escolhida e disparar o evento de mudar as cores da imagem
async function choosedColor() {
  const eyeDropper = new EyeDropper();

  const { sRGBHex } = await eyeDropper.open();

  const color = hexToRgb(sRGBHex);

  const [red, green, blue] = color;

  container_inputs.style.display = 'flex';
  title[0].style.display = 'block';
  span_container.style.display = 'block';
  input_red.value = red;
  input_green.value = green;
  input_blue.value = blue;
  preview_color.style.backgroundColor = `rgb(${input_red.value},${input_green.value},${input_blue.value})`;

  const swap = input_color.value;
  console.log(swap);

  reDraw(color, swap);

  span.innerHTML = `Color finded: <strong>${counter}</strong>`;
  span_container.appendChild(span);
  counter = 0;
}

// addiciona evento de click ao botão de escolha de cor
buttonChooseColor.addEventListener('click', choosedColor);

// Desenha a Imagem em tela quando a página é carregada
function draw() {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      ctx.fillStyle = matriz[y][x];
      ctx.fillRect(x, y, 1, 1);
    }
  }
}

// evento de carregamento de página
window.addEventListener('DOMContentLoaded', () => {
  draw();

  linkGoBack.style.display = 'block';
  buttonChooseColor.style.display = 'block';
});
