<script setup>

import { useHobbiesStore } from '../stores/hobbies';
import FrequencyChart from './FrequencyChart.vue';
import DistributionChart from './DistributionChart.vue';

const hobbies = useHobbiesStore();

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
    <div style="height: 24rem;width: 37.5rem">
      <FrequencyChart :chartInput="hobbies.hobbies">
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