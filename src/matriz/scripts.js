// Carrega Matriz do localStorage
const matriz = JSON.parse(localStorage.getItem('matriz'));
// Elementos visuais que serão adicionados eventos ou manipulação de seus dados
const matrizContent = document.getElementById('matriz');
const matrizInfo = document.getElementById('matriz-info');
const span = document.createElement('span');
const span2 = document.createElement('span');
const span3 = document.createElement('span');

// carrega as variáveis de quantidade de linhas e colunas da matriz e o fator de proporção
const linhas = matriz.length;
const colunas = matriz[0].length;
const factor = localStorage.getItem('factor');

// Adiciona o valor das variáveis acima em tela
span.innerHTML = `Colunas: <strong>${colunas}</strong>`;
span2.innerHTML = `Linhas: <strong>${linhas}</strong>`;
span3.innerHTML = `Factor: <strong>${factor}</strong>`;
matrizInfo.appendChild(span);
matrizInfo.appendChild(span2);
matrizInfo.appendChild(span3);

// Adiciona a cor de cada pixel em uma matriz do tamanho da imagem. Redimencionanda de acordo com o fator de proporção
for (let y = 0; y < linhas; y++) {
  let li = document.createElement('li');
  for (let x = 0; x < colunas; x++) {
    const content = document.createTextNode(matriz[y][x] + ',');
    li.appendChild(content);
    matrizContent.appendChild(li);
  }
}
