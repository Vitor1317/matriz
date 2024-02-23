const matrizContent = document.getElementById('matriz')
const matriz = JSON.parse(localStorage.getItem('matriz'))
const matrizInfo = document.getElementById('matriz-info')
const span = document.createElement('span')
const span2 = document.createElement('span')

const linhas = matriz.length
const colunas = matriz[0].length

span.innerHTML = `Linhas: <strong>${colunas}</strong>`
span2.innerHTML = `Linhas: <strong>${linhas}</strong>`
matrizInfo.appendChild(span)
matrizInfo.appendChild(span2)

for(let y = 0; y < linhas; y++) {
    let li = document.createElement('li')
    for(let x = 0; x < colunas; x++) {
        const content = document.createTextNode(matriz[y][x] + "|__|")
        li.appendChild(content)
        matrizContent.appendChild(li)
    }
}