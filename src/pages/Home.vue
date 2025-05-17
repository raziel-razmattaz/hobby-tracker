<script setup>
import HobbyManager from '../components/HobbyManager.vue';
import QuickStatistics from '../components/QuickStatistics.vue';
</script>

<template>
  <div class="page">
    <div class="content">
      <HobbyManager/>
      <QuickStatistics/>
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