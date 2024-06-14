const red = JSON.parse(localStorage.getItem('redSignal'));
const green = JSON.parse(localStorage.getItem('greenSignal'));
const blue = JSON.parse(localStorage.getItem('blueSignal'));
const imageName = localStorage.getItem('image-name');
const total = {};

const isPng = imageName.slice(imageName.length - 4) === '.png';

let offset = isPng ? 1 : 0;

const data = [];
const dataRed = [];
const dataGreen = [];
const dataBlue = [];

for (let i = offset; i < 256; i++) {
  red[i] === undefined ? (red[i] = 0) : null;
  green[i] === undefined ? (green[i] = 0) : null;
  blue[i] === undefined ? (blue[i] = 0) : null;

  total[i] = red[i] + green[i] + blue[i];
}

for (let i = offset; i < 256; i++) {
  data.push({ x: i, y: total[i] });
  dataRed.push({ x: i, y: red[i] });
  dataGreen.push({ x: i, y: green[i] });
  dataBlue.push({ x: i, y: blue[i] });
}

export const options = {
  chart: {
    type: 'bar',
    background: '#101010',
  },
  fill: {
    colors: ['#fff'],
  },
  series: [
    {
      name: 'Frequência',
      data,
    },
  ],
  dataLabels: {
    enabled: false,
  },
  title: {
    text: 'Histograma',
    align: 'center',
    style: {
      color: '#fff',
    },
  },
  yaxis: {
    title: {
      text: 'Frequência',
      style: {
        color: '#fff',
      },
    },
  },
  xaxis: {
    title: {
      text: 'Itensidade',
      style: {
        color: '#fff',
      },
    },
  },
  tooltip: {
    enabled: true,
    formatter: undefined,
    style: {
      fontSize: '12px',
      color: '',
    },
  },
};

export const optionsRed = {
  chart: {
    type: 'bar',
    background: '#101010',
  },
  fill: {
    colors: ['#ff0000'],
  },
  series: [
    {
      name: 'Frequência',
      data: dataRed,
    },
  ],
  dataLabels: {
    enabled: false,
  },
  title: {
    text: 'Histograma Red',
    align: 'center',
    style: {
      color: '#fff',
    },
  },
  yaxis: {
    title: {
      text: 'Frequência',
      style: {
        color: '#fff',
      },
    },
  },
  xaxis: {
    title: {
      text: 'Itensidade',
      style: {
        color: '#fff',
      },
    },
  },
  tooltip: {
    enabled: true,
    formatter: undefined,
    style: {
      fontSize: '12px',
      color: '',
    },
  },
};

export const optionsGreen = {
  chart: {
    type: 'bar',
    background: '#101010',
  },
  fill: {
    colors: ['#00ff00'],
  },
  series: [
    {
      name: 'Frequência',
      data: dataGreen,
    },
  ],
  dataLabels: {
    enabled: false,
  },
  title: {
    text: 'Histograma Green',
    align: 'center',
    style: {
      color: '#fff',
    },
  },
  yaxis: {
    title: {
      text: 'Frequência',
      style: {
        color: '#fff',
      },
    },
  },
  xaxis: {
    title: {
      text: 'Itensidade',
      style: {
        color: '#fff',
      },
    },
  },
  tooltip: {
    enabled: true,
    formatter: undefined,
    style: {
      fontSize: '12px',
      color: '',
    },
  },
};

export const optionsBlue = {
  chart: {
    type: 'bar',
    background: '#101010',
  },
  fill: {
    colors: ['#0000ff'],
  },
  series: [
    {
      name: 'Frequência',
      data: dataBlue,
    },
  ],
  dataLabels: {
    enabled: false,
  },
  title: {
    text: 'Histograma Blue',
    align: 'center',
    style: {
      color: '#fff',
    },
  },
  yaxis: {
    title: {
      text: 'Frequência',
      style: {
        color: '#fff',
      },
    },
  },
  xaxis: {
    title: {
      text: 'Itensidade',
      style: {
        color: '#fff',
      },
    },
  },
  tooltip: {
    enabled: true,
    formatter: undefined,
    style: {
      fontSize: '12px',
      color: '',
    },
  },
};
