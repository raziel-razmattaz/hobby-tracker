<script setup>

import HobbyRecommender from '../components/HobbyRecommender.vue';
import CategoryDistribution from '../components/CategoryRadarChart.vue';

</script>

<template>
  <div class="page">
    <div class="content">
      <HobbyRecommender/>
      <CategoryDistribution/>
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
  grid-template-columns: 1.1fr 1fr;
  gap: var(--space-xxl);
}

</style>