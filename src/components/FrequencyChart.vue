<script setup>

import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  chartInput: {
    type: Object,
    required: true,
  },
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.4)',
        font: {
          family: '"Inria Sans", sans-serif',
          size: 12
        },
      },
      border: {
        color: 'rgba(255, 255, 255, 0.2)'
      }
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.06)'
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.4)', 
        font: {
          family: '"Inria Sans", sans-serif',
          size: 12
        },
      },
      border: {
        color: 'rgba(255, 255, 255, 0.2)'
      }
    },
  }
};

const chartData = computed(() => {
  const labels = [...props.chartInput].map(hobby => hobby.text);
  const data = [...props.chartInput].map(hobby => hobby.hobbyHistory.length);
  return {
    labels,
    datasets: [
      {
        label: 'Hobby Activity',
        data,
        backgroundColor: 'rgb(240, 40, 143)',
        hoverBackgroundColor: 'rgb(255, 0, 132)',
        maxBarThickness: 60,
      },
    ]
  };
});

</script>

<template>
  <Bar
    :options="chartOptions"
    :data="chartData"
  />
</template>