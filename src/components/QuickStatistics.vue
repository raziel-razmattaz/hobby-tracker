<script setup>

import { computed } from 'vue'
import { useHobbiesStore } from '../stores/hobbies';
import TopHobbiesChart from './TopHobbiesChart.vue';
import DistributionChart from './DistributionChart.vue';

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
        backgroundColor: 'rgba(245, 40, 145, 0.8)'
      }
    ]
  };
});

const topChartOptions = {
  responsive: false,
  indexAxis: 'y',
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  },
  scales: {
    x: {
      beginAtZero: true
    }
  }
};

</script>

<template>
  <div>
    <h3>Quick Overview</h3>
    <div style="width: 400px">
      <TopHobbiesChart :topChartData="topChartData" :topChartOptions="topChartOptions">
        Chart couldn't render.
      </TopHobbiesChart>
    </div>
    <div style="width: 400px;">
      <DistributionChart :chartInput="filteredHobbies">
        Chart couldn't render.
      </DistributionChart>
    </div>
  </div>
</template>