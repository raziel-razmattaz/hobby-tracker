<script setup>

import { useHobbiesStore } from '../stores/hobbies';
import FrequencyChart from './FrequencyChart.vue';
import DistributionChart from './DistributionChart.vue';
import { ref, computed } from 'vue';

const hobbies = useHobbiesStore();
const filteredHobbiesWeek = computed(() => hobbies.getHobbiesLastWeek());
const filteredHobbiesMonth = computed(() => hobbies.getHobbiesLastMonth());
const activeView = ref('lifetime');

const chartData = computed(() => {
  switch (activeView.value) {
    case 'week':
      return filteredHobbiesWeek.value;
    case 'month':
      return filteredHobbiesMonth.value;
    default:
      return hobbies.hobbies;
  }
});

function removeHobbyHistory() {
  if (confirm('Are you sure you want to reset your hobby history data? This cannot be undone.')) {
    hobbies.removeHobbyHistory();
  }
}

</script>

<template>
  <div>
    <h3>Statistics</h3>
    <button @click="removeHobbyHistory">Delete all Frequency Data.</button>
    <div class="view-controls">
      <button @click="activeView = 'lifetime'" :class="{ active: activeView === 'lifetime' }">
        Lifetime
      </button>
      <button @click="activeView = 'month'" :class="{ active: activeView === 'month' }">
        Last Month
      </button>
      <button @click="activeView = 'week'" :class="{ active: activeView === 'week' }">
        Last Week
      </button>
    </div>
    <div style="height: 24rem;width: 37.5rem">
      <FrequencyChart :chartInput="chartData">
        Chart couldn't render
      </FrequencyChart>
    </div>
    <div style="width: 400px;">
      <DistributionChart :chartInput="chartData">
        Chart couldn't render.
      </DistributionChart>
    </div>
  </div>
</template>

<style scoped>
.view-controls button.active {
  background: rgba(245, 40, 145, 0.8);
  color: white;
  border-color: rgba(245, 40, 145, 0.8);
}
</style>