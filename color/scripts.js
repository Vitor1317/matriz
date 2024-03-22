import { hexToRgb, hexToRgba } from "../utils/conversion.js"

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const linkGoBack = document.getElementById('view')
const buttonChooseColor = document.getElementById('choose-color')
const input_red = document.getElementById('red')
const input_green = document.getElementById('green')
const input_blue = document.getElementById('blue')
const container_inputs = document.getElementById('container-inputs')
const preview_color = document.getElementById('preview-color')
const title = document.querySelectorAll('.title')
const input_color = document.getElementById("input-color")
const span_container = document.getElementById('span-container')

let counter = 0;

const matriz = JSON.parse(localStorage.getItem('matriz'))

const width = canvas.width = matriz[0].length
const height = canvas.height = matriz.length

const span = document.createElement('span')

container_inputs.addEventListener('change', ()=> {
    preview_color.style.backgroundColor = `rgb(${input_red.value},${input_green.value},${input_blue.value})`
})

function reDraw(color, swap) {
    function getRGBA(codeColor) {
        const rbga = codeColor.replace(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.?\d+)\)$/, '$1,$2,$3,$4')
        return rbga.split(',')
    }

    function isIntervalColor(colorChoose, colorMatriz) {
        colorMatriz = Number(colorMatriz)

        if(colorChoose <= colorMatriz && (colorChoose + 35) >= colorMatriz) {
            return true
        }

        if(colorChoose >= colorMatriz && (colorChoose - 35) <= colorMatriz) {
            return true
        }

        return false
    }

    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            const [red, green, blue] = color
            const [mRed, mGreen, mBlue] = getRGBA(matriz[y][x])
            if(matriz[y][x] === 'rgba(0,0,0,0)') continue
            if(isIntervalColor(red, mRed) && isIntervalColor(green, mGreen) && isIntervalColor(blue, mBlue)) {
                counter++
                ctx.fillStyle = hexToRgba(swap)
                ctx.fillRect(x, y, 1, 1)
            }
        }
    }
}

async function choosedColor() {
    const eyeDropper = new EyeDropper()

    const {sRGBHex} = await eyeDropper.open()

    const color = hexToRgb(sRGBHex)

    const [red, green, blue] = color

    container_inputs.style.display = 'flex'
    title[0].style.display = 'block'
    span_container.style.display = 'block'
    input_red.value = red
    input_green.value = green
    input_blue.value = blue
    preview_color.style.backgroundColor = `rgb(${input_red.value},${input_green.value},${input_blue.value})`

    const swap = input_color.value
    console.log(swap)

    reDraw(color, swap)

    span.innerHTML = `Color finded: <strong>${counter}</strong>`
    span_container.appendChild(span)
    counter = 0;
}

buttonChooseColor.addEventListener('click', choosedColor)

function draw() {
    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            ctx.fillStyle = matriz[y][x]
            ctx.fillRect(x, y, 1, 1)
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    draw(width, height)

    setTimeout(()=> {
        linkGoBack.style.display = 'block'
        buttonChooseColor.style.display = 'block'
    }, 1000)
})