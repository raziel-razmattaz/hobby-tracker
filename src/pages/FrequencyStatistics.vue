<script setup>

import { useHobbiesStore } from '../stores/hobbies';
import FrequencyChart from '../components/FrequencyChart.vue';
import DistributionChart from '../components/DistributionChart.vue';
import { ref, computed } from 'vue';

const hobbies = useHobbiesStore();
const filteredHobbiesWeek = computed(() => hobbies.getHobbiesLastWeek());
const filteredHobbiesMonth = computed(() => hobbies.getHobbiesLastMonth());
const activeView = ref('lifetime');
const activeCategory = ref('all')

const chartData = computed(() => {
  let data;
  switch (activeView.value) {
    case 'week':
      data = filteredHobbiesWeek.value;
      break;
    case 'month':
      data = filteredHobbiesMonth.value;
      break;
    default:
      data = hobbies.hobbies;
      break;
  }
  if (activeCategory.value !== 'all') {
    data = data.filter(hobby => hobby.category === activeCategory.value);
  }
  return data;
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
    <select v-model="activeCategory">
      <option value="all">All Categories</option>
      <option v-for="category in hobbies.categories" :key="category" :value="category">{{ category }}</option>
    </select>
    <div style="height: var(--container-s); width: var(--container-lg)">
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

.view-controls {
  width: var(--container-xs);
  display: flex;
  justify-content: space-between;
}

.view-controls button {
  color: var(--text);
  border-radius: var(--border-radius);
  padding: var(--space-xs) var(--space-md);
  background: var(--foreground);
  transition-duration: 0.4s;
  box-shadow: 0px 4px var(--drop-shadow);
}

.view-controls button:hover {
  color: var(--text-highlight);
  background: var(--foreground-highlight);
  transition-duration: 0.4s;
}

.view-controls button.active {
  background: var(--highlight);
}
</style>