<script setup>

import { computed } from 'vue'
import { useHobbiesStore } from '../stores/hobbies';
import FrequencyChart from './FrequencyChart.vue';
import TopHobbiesChart from './TopHobbiesChart.vue';

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

//Only here for testing purposes, refactor later into own proper component!

const topHobbiesData = computed(() => {
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

const topHobbiesOptions = {
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
    <h3>Statistics</h3>
    <ul>
      <li v-for="hobby in hobbies.hobbies" :key="hobby.id">
        {{ hobby.text }} - Done {{ hobby.hobbyHistory.length }} times
      </li>
    </ul>
    <div style="width: 400px">
      <FrequencyChart :chartData="chartData" :chartOptions="chartOptions">
        Chart couldn't render
      </FrequencyChart>
    </div>
    <div style="width: 400px">
      <TopHobbiesChart :chartData="topHobbiesData" :chartOptions="topHobbiesOptions">
        Chart couldn't render
      </TopHobbiesChart>
    </div>
  </div>
</template>