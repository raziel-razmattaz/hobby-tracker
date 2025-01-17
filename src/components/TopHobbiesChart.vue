<script>

import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'TopHobbiesChart',
  components: { Bar },
  props: {
    topChartData: {
      type: Object,
      required: true
    },
    topChartOptions: {
      type: Object,
      required: true
    }
  }
}

</script>

<template>
  <p v-if="!topChartData || topChartData.datasets[0].data.length === 0">
      To see your stats, get started by recording some hobby performance data!
  </p>
  <Bar
    v-else
    :options="topChartOptions"
    :data="topChartData"
  />
</template>