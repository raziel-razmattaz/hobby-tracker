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
        backgroundColor: 'rgba(245, 40, 145, 0.8)',
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