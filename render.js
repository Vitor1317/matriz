const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

window.addEventListener('DOMContentLoaded', () => {
    const matriz = JSON.parse(localStorage.getItem('matriz'))

    canvas.width = matriz[0].length
    canvas.height = matriz.length

    for(let y = 0; y < canvas.height; y++) {
        for(let x = 0; x < canvas.width; x++) {
            setTimeout(() => {
                ctx.fillStyle = matriz[y][x]
                ctx.fillRect(x, y, 1, 1)
            }, 100)
        }
    }
})