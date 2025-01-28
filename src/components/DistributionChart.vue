<script setup>

import { computed } from 'vue';
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

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
  plugins: {
    legend: { 
      display: true,
      position: 'bottom',
      labels: {
        usePointStyle: true,
        generateLabels: (chart) => {
          const data = chart.data.datasets[0];
          return chart.data.labels.map((label, i) => ({
            text: `${label} (${data.data[i]})`,
            fillStyle: data.backgroundColor[i],
            fontColor: 'rgb(96, 96, 96)', //LATER: adjust based on theme
            pointStyle: 'circle',
            lineWidth: 0,
          }));
        },
      },
    },
    tooltip: { enabled: false }
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
        borderColor: 'rgb(36, 36, 36)', //LATER: change according to theme
        borderWidth: 2,
      },
    ],
  };
});

const generateColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = 360 - (i * 90) / (count - 1);
    colors.push(`hsla(${hue}, 70%, 50%, 0.8)`);
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