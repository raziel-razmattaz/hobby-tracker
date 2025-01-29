<script setup>

import { computed } from 'vue';
import { useHobbiesStore } from '../stores/hobbies';

const hobbies = useHobbiesStore();
const filteredHobbiesMonth = computed(() => hobbies.getHobbiesLastMonth());

const frequencyWeight = 0.4;
const recencyWeight = 0.4;
const categoryWeight = 0.2;

//TODO:
//Buttons for toggling different weights/preferences in calculating
//Basic Chart.js Radar Chart
//Populate Radar Chart with Category Scores

// All this math is courtesy of DeepSeek R1 🙏
const hobbySuggestions = computed(() => {
  const hobbyMetrics = filteredHobbiesMonth.value.map(hobby => ({...hobby}));
  const categoryActivity = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0); //to prevent timezone issues

  hobbyMetrics.forEach(hobby => {
    hobby.frequency = hobby.hobbyHistory.length;
    hobby.recency = hobby.hobbyHistory.length 
      ? Math.min(30, (today - new Date(Math.max(...hobby.hobbyHistory.map(d => new Date(d))))) / (1000 * 60 * 60 * 24)) : 30;
  });

  hobbyMetrics.forEach(hobby => categoryActivity[hobby.category] = (categoryActivity[hobby.category] || 0) + hobby.frequency);
  console.log(categoryActivity);
  const maxCategoryActivity = Math.max(...Object.values(categoryActivity), 1);

  const maxFrequency = Math.max(...hobbyMetrics.map(hobby => hobby.frequency), 1);
  const maxRecency = Math.max(...hobbyMetrics.map(hobby => hobby.recency), 30);

  hobbyMetrics.forEach(hobby => {
    const frequencyScore = 1 - (hobby.frequency / maxFrequency);
    const recencyScore = hobby.recency / maxRecency;
    const categoryScore = 1 - (categoryActivity[hobby.category] / maxCategoryActivity);
    hobby.totalScore = frequencyWeight * frequencyScore + recencyWeight * recencyScore + categoryWeight * categoryScore;
  });

  console.log(hobbyMetrics.sort((a, b) => b.totalScore - a.totalScore));
  return hobbyMetrics.sort((a, b) => b.totalScore - a.totalScore).slice(0, 3);
})

function getTimeMessage(hobby) {
  const dayDiff = getTimeFrame(hobby);
  if (dayDiff == 1) return "You haven't tried this one yet.";
  if (dayDiff == 0) return "Last done today.";
  if (dayDiff == -1) return "Last done yesterday.";
  return `Last done ${Math.abs(dayDiff)} days ago.`;
}

function getTimeFrame(hobby) {
  if (!hobby.hobbyHistory || hobby.hobbyHistory.length === 0) return 1;
  const latest = hobby.hobbyHistory.slice().sort().pop();
  const [year, month, day] = latest.split('-').map(Number);
  const latestDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0); //to prevent timezone issues
  const diffDays = Math.round((latestDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays;
}

</script>

<template>
  <h3>Suggestions</h3>
  <ul>
    <li v-for="hobby in hobbySuggestions" :key="hobby.id">
      {{ hobby.text }} ({{ hobby.category }}) - {{ getTimeMessage(hobby) }}
    </li>
  </ul>
</template>