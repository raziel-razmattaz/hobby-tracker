<script setup>

import { computed } from 'vue'
import { useHobbiesStore } from '../stores/hobbies';
import FrequencyChart from './FrequencyChart.vue';
import DistributionChart from './DistributionChart.vue';

const hobbies = useHobbiesStore();

const frequencyChartData = computed(() => {
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

const frequencyChartOptions = {
  responsive: true,
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
    <div style="height: 24rem;width: 37.5rem">
      <FrequencyChart :chartData="frequencyChartData" :chartOptions="frequencyChartOptions">
        Chart couldn't render
      </FrequencyChart>
    </div>
    <div style="width: 400px;">
      <DistributionChart :chartInput="hobbies.hobbies">
        Chart couldn't render.
      </DistributionChart>
    </div>
  </div>
</template>