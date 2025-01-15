<script>

import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// TODO:
// Make Chart Horizontal Bar Chart instead
// Receive Dyamic Data (make sure to take waiting for data into account with v-if!)
// Set Bar Colours to something more visible instead

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
        responsive: false,
        maintainAspectRatio: false
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