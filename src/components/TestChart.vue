<script>

import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'TestChart',
  components: { Bar },
  data() {
    return {
      chartData: {
        labels: [ 'One', 'Two', 'Third Option' ],
        datasets: [ { data: [6, 4, 1] } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  }
}

</script>

<template>
    <Bar
      :options="chartOptions"
      :data="chartData"
    />
  </template>