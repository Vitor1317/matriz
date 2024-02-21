const buttonSelect = document.getElementById('select-image')
const upload = document.getElementById('upload')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const buttonGenerate = document.getElementById('generate')
const linkViewImage = document.getElementById('view-image')

const matriz = []
let image;

buttonSelect.onclick = () => {
    upload.click()
}

function imageFactor(width) {
    let factor = 1;

    if(width > 400) {
        width = width / 2
        factor = factor * 2
    }

    if(width > 400) {
        factor = factor * imageFactor(width)
    }

    return factor
}

function loadImage() {
    const {width, height} = image

    const factor = imageFactor(width)

    canvas.width = width / factor
    canvas.height = height / factor

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    buttonGenerate.style.display = 'block'
}

window.addEventListener('DOMContentLoaded', () => {
    upload.addEventListener('change', ()=> {
        let file = upload.files.item(0)
        let reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onload = (event) => {
            image = new Image()
            image.src = event.target.result
            image.onload = loadImage
        }
    })    
})

buttonGenerate.onclick = () => {
    for(let y = 0; y < canvas.height; y++) {
        matriz.push([])
        for(let x = 0; x < canvas.width; x++) {
            const [red, green, blue, alpha] = ctx.getImageData(x, y, 1, 1).data
            matriz[y][x] = `rgba(${red},${green},${blue},${alpha})`
        }
    }

    localStorage.setItem('matriz', JSON.stringify(matriz))
    linkViewImage.style.display = 'block'
}



