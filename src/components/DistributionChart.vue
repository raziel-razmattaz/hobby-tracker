<script>

import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: 'DistributionChart',
  components: { Doughnut },
  props: {
    distributionChartData: {
      type: Object,
      required: true,
    },
    distributionChartOptions: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <Doughnut 
    :data="distributionChartData"
    :options="distributionChartOptions" 
  />
</template>