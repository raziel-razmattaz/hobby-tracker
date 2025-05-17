<script setup>

import { computed } from 'vue'
import { useHobbiesStore } from '../stores/hobbies';
import TopHobbiesChart from './TopHobbiesChart.vue';
import DistributionChart from './DistributionChart.vue';
import { color } from 'chart.js/helpers';

const hobbies = useHobbiesStore();

const filteredHobbies = computed(() => hobbies.getHobbiesLastMonth());

const topChartData = computed(() => {
  const sortedHobbies = filteredHobbies.value
    .filter(hobby => hobby.hobbyHistory.length > 0)
    .sort((a, b) => b.hobbyHistory.length - a.hobbyHistory.length)
    .slice(0, 3);

  const labels = sortedHobbies.map(hobby => hobby.text);
  const data = sortedHobbies.map(hobby => hobby.hobbyHistory.length);

  return {
    labels,
    datasets: [
      {
        label: 'Top Hobbies',
        data,
        backgroundColor: 'rgb(240, 40, 143)',
        hoverBackgroundColor: 'rgb(255, 0, 132)',
      }
    ]
  };
});

const topChartOptions = {
  responsive: true,
  indexAxis: 'y',
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.12)'
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
  }
};

</script>

<template>
  <div>
    <h3>Your Recent Favourites</h3>
    <div class="chart-wrapper p-md">
      <TopHobbiesChart :topChartData="topChartData" :topChartOptions="topChartOptions">
        Chart couldn't render.
      </TopHobbiesChart>
    </div>
    <h3>How You've Been Spending Your Time</h3>
    <div class=" chart-wrapper p-md">
      <DistributionChart :chartInput="filteredHobbies">
        Chart couldn't render.
      </DistributionChart>
    </div>
  </div>
</template>

<style scoped>

@media (max-width: 768px) {
  
  h3 {
    font-size: 1.1rem;
  }
}

</style>