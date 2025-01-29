<script setup>

import { useHobbiesStore } from '../stores/hobbies';
import { ref } from 'vue';
import { Radar } from 'vue-chartjs';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const hobbies = useHobbiesStore();

//TODO:
//Populate Radar Chart with actualy Category Scores

const chartData = ref({
  labels: ['Creative 5', 'Stimulating 14', 'Relaxing 7', 'Social 0', 'Physical 4'],
  datasets: [
    {
      data: [5, 14, 7, 0, 4],
      backgroundColor: 'rgba(245, 40, 145, 0.2)',
      borderColor: 'rgba(245, 40, 145, 0.8)',
      borderWidth: 2,
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: { enabled: false },
    legend: { display: false },
  },
  scales: {
    r: {
      ticks: {
        display: false,
      }
    }
  }
})

</script>

<template>
  <h4>Category Distribution Radar Chart</h4>
  <div style="height: 400px; width: 400px;">
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>