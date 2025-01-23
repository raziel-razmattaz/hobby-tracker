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

const distributionChartData = computed(() => {
  const sortedHobbies = filteredHobbies.value.slice().sort((a, b) => a.hobbyHistory.length - b.hobbyHistory.length);
  const labels = sortedHobbies.map(hobby => hobby.text);
  const data = sortedHobbies.map(hobby => hobby.hobbyHistory.length);

  const backgroundColors = generateColors(data.length);

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

const distributionChartOptions = {
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
  <div>
    <h3>Quick Overview</h3>
    <div style="width: 400px">
      <TopHobbiesChart :topChartData="topChartData" :topChartOptions="topChartOptions">
        Chart couldn't render.
      </TopHobbiesChart>
    </div>
    <div style="width: 400px;">
      <DistributionChart :distributionChartData="distributionChartData" :distributionChartOptions="distributionChartOptions">
        Chart couldn't render.
      </DistributionChart>
    </div>
  </div>
</template>