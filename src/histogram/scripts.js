import { hexToRgb } from '../../utils/conversion.js';
import { options, optionsBlue, optionsGreen, optionsRed } from './chart.js';
const imageSrc = localStorage.getItem('image');
const image = document.getElementById('image');
const chartDiv = document.getElementById('chart');
const chartDivRed = document.getElementById('chartRed');
const chartDivGreen = document.getElementById('chartGreen');
const chartDivBlue = document.getElementById('chartBlue');
const input_red = document.getElementById('red');
const input_green = document.getElementById('green');
const input_blue = document.getElementById('blue');
const preview_color = document.getElementById('preview-color');
const container_inputs = document.getElementById('container-inputs');
const verify_Button = document.getElementById('verify-button');

const chart = new ApexCharts(chartDiv, options);
const chartRed = new ApexCharts(chartDivRed, optionsRed);
const chartGreen = new ApexCharts(chartDivGreen, optionsGreen);
const chartBlue = new ApexCharts(chartDivBlue, optionsBlue);

async function verifyColor() {
  const eyeDropper = new EyeDropper();

  const { sRGBHex } = await eyeDropper.open();

  const color = hexToRgb(sRGBHex);

  const [red, green, blue] = color;

  container_inputs.style.display = 'flex';

  input_red.value = red;
  input_green.value = green;
  input_blue.value = blue;
  preview_color.style.backgroundColor = `rgb(${red},${green},${blue})`;
}

verify_Button.onclick = verifyColor;

chart.render();
chartRed.render();
chartGreen.render();
chartBlue.render();

image.src = imageSrc;
