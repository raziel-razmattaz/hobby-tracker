<script>

import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

//TODO:
//Segments coloured according to simple "gradient" (ie 20% opacity, 30% etc.)
//Remove Labels and Tooltips
//Remove Borders around Segments
//Implement on Hover: Small <p> at the Bottom that says: "You did [hobby] X times (YY%)!"
//If no Hover have it say: "Hover over a segment to see details."
//Ensure it also works with Tap/Click (for mobile)

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: 'DistributionChart',
  components: { Pie },
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
  <Pie 
    :data="distributionChartData"
    :options="distributionChartOptions" 
  />
</template>