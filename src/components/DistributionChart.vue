<script setup>

import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, Interaction } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  chartInput: {
    type: Array,
    required: true,
  },
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'nearest',
    intersect: true,
  },
  plugins: {
    legend: { 
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        font: {
          family: '"Inria Sans", sans-serif',
          size: 12
        },
        generateLabels: (chart) => {
          const data = chart.data.datasets[0];
          return chart.data.labels.map((label, i) => ({
            text: `${label} (${data.data[i]})`,
            fillStyle: data.backgroundColor[i],
            fontColor: 'rgba(255, 255, 255, 0.4)',
            pointStyle: 'circle',
            lineWidth: 0,
          }));
        },
      },
    },
    tooltip: { enabled: false }
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
};

const chartData = computed(() => {
  const sortedData = [...props.chartInput].slice().sort((a, b) => a.hobbyHistory.length - b.hobbyHistory.length);
  const labels = sortedData.map(hobby => hobby.text);
  const data = sortedData.map(hobby => hobby.hobbyHistory.length);

  const backgroundColors = generateColors(sortedData.length);

  return {
    labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        borderColor: 'rgb(36, 36, 36)',
        borderWidth: 2,
      },
    ],
  };
});

const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = 360 - (i * 90) / (count - 1);
    colors.push(`hsla(${hue}, 50%, 45%, 1)`);
  }
  return colors;
};

</script>

<template>
  <Doughnut 
    :data="chartData"
    :options="chartOptions" 
  />
</template>