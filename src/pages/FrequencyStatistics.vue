<script setup>

import { useHobbiesStore } from '../stores/hobbies';
import FrequencyChart from '../components/FrequencyChart.vue';
import DistributionChart from '../components/DistributionChart.vue';
import { ref, computed } from 'vue';
import VueSelect from "vue3-select-component";

const hobbies = useHobbiesStore();
const filteredHobbiesWeek = computed(() => hobbies.getHobbiesLastWeek());
const filteredHobbiesMonth = computed(() => hobbies.getHobbiesLastMonth());
const activeView = ref('lifetime');
const activeCategory = ref('all')

const extraCategoryOptions = computed(() => [
  { label: 'All Categories', value: 'all' },
  ...hobbies.categoryOptions
]);

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
  <div class="page">
    <div class="content">
      <div class="left-column">
        <div class="controls-row">
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
        </div>
        <div style="height: var(--container-s); width: var(--container-md)">
          <FrequencyChart :chartInput="chartData">
            Chart couldn't render
          </FrequencyChart>
        </div>
      </div>
      <div class="right-column">
        <VueSelect
          class="vue-selector"
          v-model="activeCategory"
          :options="extraCategoryOptions"
          :isClearable="false"
        />
        <div class="distribution-section">
          <div style="width: 400px;">
            <DistributionChart :chartInput="chartData">
              Chart couldn't render.
            </DistributionChart>
          </div>
          <button @click="removeHobbyHistory" class="delete-button">
            <span class="material-icons">delete_forever</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.page {
  display: flex;
  justify-content: center;
}

.content {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--space-lg);
  align-items: start;
}

.left-column {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.right-column {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-xxl);
}

.category-select-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-md);
}

.distribution-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
}

.delete-button {
  color: var(--danger);
  margin-left: auto;
  margin-top: var(--space-md);
}

.view-controls {
  width: var(--container-xs);
  display: flex;
  justify-content: space-between;
}

button {
  color: var(--text);
  border-radius: var(--border-radius);
  padding: var(--space-xs) var(--space-md);
  background: var(--foreground);
  transition-duration: 0.4s;
  box-shadow: 0px 4px var(--drop-shadow);
}

button:hover {
  color: var(--text-highlight);
  background: var(--foreground-highlight);
  transition-duration: 0.4s;
}

.view-controls button.active {
  background: var(--highlight);
}

.vue-selector {
  --vs-width: auto;
}

@media (max-width: 768px) {
  .page {
    padding: 0 4vw;
  }
  .content {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }
}
</style>