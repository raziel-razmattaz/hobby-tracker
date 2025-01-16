<script setup>

import { computed } from 'vue'
import { useHobbiesStore } from '../stores/hobbies';
import FrequencyChart from './FrequencyChart.vue';

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
        backgroundColor: 'rgba(245, 40, 145, 0.8)'
      }
    ]
  };
});

const chartOptions = {
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
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
    <div width="400px">
      <FrequencyChart :chartData="chartData" :chartOptions="chartOptions">
        Chart couldn't render
      </FrequencyChart>
    </div>
  </div>
</template>