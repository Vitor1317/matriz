const imageSrc = localStorage.getItem('image');
const photoPreview = document.getElementById('photo-preview');
const selection = document.getElementById('selection-tool');
const cropButton = document.getElementById('crop-image');
const download = document.getElementById('download');
const image = new Image();
let photoName = localStorage.getItem('image-name');

image.src = imageSrc;

let startX,
  startY,
  relativeX,
  relativeY,
  endX,
  endY,
  relativeEndX,
  relativeEndY;

let startSelection = false;

const events = {
  mouseover() {
    this.style.cursor = 'crosshair';
  },
  mousedown(event) {
    const { clientX, clientY, offsetX, offsetY } = event;

    startX = clientX;
    startY = clientY;
    relativeX = offsetX;
    relativeY = offsetY;

    startSelection = true;
  },
  mousemove(event) {
    endX = event.clientX;
    endY = event.clientY;

    if (startSelection) {
      selection.style.display = 'block';
      selection.style.top = startY + 'px';
      selection.style.left = startX + 'px';

      selection.style.width = endX - startX + 'px';
      selection.style.height = endY - startY + 'px';
    }
  },
  mouseup(event) {
    startSelection = false;

    relativeEndX = event.layerX;
    relativeEndY = event.layerY;

    cropButton.style.display = 'block';
  },
};

Object.keys(events).forEach((eventName) => {
  photoPreview.addEventListener(eventName, events[eventName]);
});

let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');

function loadImage() {
  const { width, height } = image;
  canvas.width = width;
  canvas.height = height;

  ctx.clearRect(0, 0, width, height);

  ctx.drawImage(image, 0, 0);

  photoPreview.src = canvas.toDataURL();
}

image.onload = loadImage;

function cropImage() {
  const { width: imgW, height: imgH } = image;
  const { width: previewW, height: previewH } = photoPreview;

  const [widthFactor, heightFactor] = [+(imgW / previewW), +(imgH / previewH)];
  const [selectionWidth, selectionHeight] = [
    selection.style.width.replace('px', ''),
    selection.style.height.replace('px', ''),
  ];

  const [croppedWidth, croppedHeight] = [
    +(selectionWidth * widthFactor),
    +(selectionHeight * heightFactor),
  ];

  const [actualX, actualY] = [
    +(relativeX * widthFactor),
    +(relativeY * heightFactor),
  ];

  const croppedImage = ctx.getImageData(
    actualX,
    actualY,
    croppedWidth,
    croppedHeight,
  );

  ctx.clearRect(0, 0, ctx.width, ctx.height);

  image.width = canvas.width = croppedWidth;
  image.height = canvas.height = croppedHeight;

  ctx.putImageData(croppedImage, 0, 0);

  cropButton.style.display = 'none';

  photoPreview.src = canvas.toDataURL();

  selection.style.display = 'none';
  download.style.display = 'block';
}

cropButton.onclick = cropImage;

function downloadImage() {
  const a = document.createElement('a');
  a.download = photoName + '-cropped.png';
  a.href = canvas.toDataURL();
  a.click();
}

download.onclick = downloadImage;
