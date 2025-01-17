<script setup>

import { computed } from 'vue'
import { useHobbiesStore } from '../stores/hobbies';
import TopHobbiesChart from './TopHobbiesChart.vue';
import DistributionChart from './DistributionChart.vue';

const hobbies = useHobbiesStore();

const topChartData = computed(() => {
  const sortedHobbies = [...hobbies.hobbies]
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

const distributionChartData = computed(() => {
  const labels = hobbies.hobbies.map(hobby => hobby.text);
  const data = hobbies.hobbies.map(hobby => hobby.hobbyHistory.length);
  const total = data.reduce((sum, count) => sum + count, 0);
  const percentages = data.map(count => ((count / total) * 100).toFixed(2));

  return {
    labels,
    datasets: [
      {
        data: percentages,
        backgroundColor: 'rgba(245, 40, 145, 0.8)',
      },
    ],
  };
});

const distributionChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true },
  },
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
    <div style="width: 400px">
      <DistributionChart :distributionChartData="distributionChartData" :distributionChartOptions="distributionChartOptions">
        Chart couldn't render.
      </DistributionChart>
    </div>
  </div>
</template>