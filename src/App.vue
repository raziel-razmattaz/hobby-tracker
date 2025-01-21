<script setup>
import HobbyManager from './components/HobbyManager.vue'
import FrequencyStatistics from './components/FrequencyStatistics.vue';
import QuickStatistics from './components/QuickStatistics.vue';
import Calendar from './components/Calendar.vue';
import Suggestions from './components/Suggestions.vue';

// TODO:
// install vue-router
// define routes in router/index.js
// include router in main app.vue
// add nav bar to app.vue with router
// highlight currently active route in nav
// basic html layout (what goes where in relation to what etc) for all routed components

// Router Screens:
// Hobby Manager + Quick Statistics (limit to last 30 days)
// Calendar + Detailed Day View (show empty before click)
// Lifetime Frequency Chart + Lifetime Donut
// Suggestions (empty for now)
// Settings (simple lists with setting ideas for now)

</script>

<template>
  <HobbyManager/>
  <FrequencyStatistics/>
  <QuickStatistics/>
  <Calendar/>
  <Suggestions/>
</template>
