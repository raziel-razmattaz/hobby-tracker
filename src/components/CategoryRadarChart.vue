<script setup>

import { useHobbiesStore } from '../stores/hobbies';
import { ref, computed } from 'vue';
import { Radar } from 'vue-chartjs';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const hobbies = useHobbiesStore();
const filteredHobbiesMonth = computed(() => hobbies.getHobbiesLastMonth());

const categoryActivity = computed(() => {
  const activity = hobbies.categories.reduce((acc, category) => {
    acc[category] = 0;
    return acc;
  }, {});
  filteredHobbiesMonth.value.forEach(hobby => activity[hobby.category] = (activity[hobby.category] || 0) + hobby.hobbyHistory.length);
  return activity;
});

const chartData = computed(() => ({
  labels: Object.keys(categoryActivity.value).map(category => `${category} (${categoryActivity.value[category]})`),
  datasets: [
    {
      data: Object.values(categoryActivity.value),
      backgroundColor: 'rgba(245, 40, 145, 0.2)',
      borderColor: 'rgba(245, 40, 145, 0.8)',
      borderWidth: 2,
      spanGaps: true,
      pointStyle: 'circle',
      borderJoinStyle: 'round',
      pointBackgroundColor: 'rgb(245, 40, 145)',
      pointBorderWidth: 0,
    }
  ]
}));

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: { enabled: false },
    legend: { display: false },
  },
  scales: {
    r: {
      angleLines: {
        display: false,
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.12)',
      },
      ticks: {
        display: false,
      },
      pointLabels: {
        font: {
          family: '"Inria Sans", sans-serif',
          size: 12
        },
      },
      beginAtZero: true,
    },
  }
})

</script>

<template>
  <div>
    <h3>Your Preferences Across Categories</h3>
    <div style="height: 350px; width: 400px;">
      <Radar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>