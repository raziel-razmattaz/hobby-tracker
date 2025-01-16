<script setup>

import { computed } from 'vue'
import { useHobbiesStore } from '../stores/hobbies';
import TestChart from './TestChart.vue';

const hobbies = useHobbiesStore();

const chartData = computed(() => {
  const labels = hobbies.hobbies.map(hobby => hobby.text);
  const data = hobbies.hobbies.map(hobby => hobby.hobbyHistory.length);
  return {
    labels,
    datasets: [
      {
        label: 'Hobby Activity',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };
});

const chartOptions = {
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true }
  }
};

</script>

<template>
  <div>
    <h3>Statistics</h3>
    <ul>
      <li v-for="hobby in hobbies.hobbies" :key="hobby.id">
        {{ hobby.text }} - Done {{ hobby.hobbyHistory.length }} times
      </li>
    </ul>
    <div width="400px" heigth=400px>
      <TestChart :chartData="chartData" :chartOptions="chartOptions">Chart couldn't render</TestChart>
    </div>
  </div>
</template>