// Elementos visuais que serão adicionados eventos ou manipulação de seus dados
const buttonSelect = document.getElementById('select-image');
const upload = document.getElementById('upload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const buttonGenerate = document.getElementById('generate');
const linkViewImage = document.getElementById('view-image');
const linkViewMatriz = document.getElementById('view-matriz');
const linkViewSignalChange = document.getElementById('view-signal-change');
const linkViewEscalation = document.getElementById('view-escalation');
const linkViewSignalPeriodic = document.getElementById('view-signal-periodic');
const linkViewRotate = document.getElementById('view-rotate');
const linkViewCrop = document.getElementById('view-crop');
const linkViewFilter = document.getElementById('view-filter');
const linkViewHistogram = document.getElementById('view-histogram');

const matriz = [];
const redSignal = {};
const greenSignal = {};
const blueSignal = {};
let image;

//Adiciona evento ao butão de escolher imagem
buttonSelect.onclick = () => {
  upload.click();
};

// Calcula fator de proporção da imagem
function imageFactor(length) {
  let factor = 1;

  if (length > 400) {
    length = length / 2;
    factor = factor * 2;
  }

  if (length > 400) {
    factor = factor * imageFactor(length);
  }

  return factor;
}

// Desenha Imagem em tela e salva fator de proporção no localStorage
function loadImage() {
  const { width, height } = image;

  const factor = width > height ? imageFactor(width) : imageFactor(height);
  localStorage.setItem('factor', factor.toString());

  canvas.width = width / factor;
  canvas.height = height / factor;

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  buttonGenerate.style.display = 'block';
}

// Assim que a página carrega é adicionado evento para carregar a imagem quando for enviada pelo usuário
window.addEventListener('DOMContentLoaded', () => {
  upload.addEventListener('change', () => {
    let file = upload.files.item(0);
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      image = new Image();
      image.src = event.target.result;
      localStorage.setItem('image-name', file.name);
      localStorage.setItem('image', image.src);
      image.onload = loadImage;
    };
  });
});

// Ações de realizadas ao clicar no butão de gerar matriz
buttonGenerate.onclick = () => {
  //Cria matriz
  for (let y = 0; y < canvas.height; y++) {
    matriz.push([]);
    for (let x = 0; x < canvas.width; x++) {
      const [red, green, blue, alpha] = ctx.getImageData(x, y, 1, 1).data;
      redSignal[red] !== undefined ? redSignal[red]++ : (redSignal[red] = 1);

      blueSignal[blue] !== undefined
        ? blueSignal[blue]++
        : (blueSignal[blue] = 1);

      greenSignal[green] !== undefined
        ? greenSignal[green]++
        : (greenSignal[green] = 1);

      matriz[y][x] = `rgba(${red},${green},${blue},${alpha})`;
    }
  }
  // salva matriz no localStorage
  localStorage.setItem('matriz', JSON.stringify(matriz));
  localStorage.setItem('redSignal', JSON.stringify(redSignal));
  localStorage.setItem('blueSignal', JSON.stringify(blueSignal));
  localStorage.setItem('greenSignal', JSON.stringify(greenSignal));
  // Adiciona os botões de operações de sinal na tela
  linkViewImage.style.display = 'block';
  linkViewMatriz.style.display = 'block';
  linkViewSignalChange.style.display = 'block';
  linkViewEscalation.style.display = 'block';
  linkViewSignalPeriodic.style.display = 'block';
  linkViewRotate.style.display = 'block';
  linkViewCrop.style.display = 'block';
  linkViewFilter.style.display = 'block';
  linkViewHistogram.style.display = 'block';
  buttonGenerate.style.display = 'none';
};
