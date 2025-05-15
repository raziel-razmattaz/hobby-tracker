<script setup>

import { computed, ref } from 'vue';
import { useHobbiesStore } from '../stores/hobbies';

const hobbies = useHobbiesStore();
const allHobbies = computed(() => hobbies.hobbies);

const weightOptions = {
  balance: { frequency: 0.33, recency: 0.33, category: 0.33},
  categoryDiversity: { frequency: 0.3, recency: 0.2, category: 0.5},
  longDiversity: { frequency: 0.5, recency: 0.3, category: 0.2},
  shortDiversity: { frequency: 0.3, recency: 0.5, category: 0.2},
};

const selectedWeight = ref('balance');

// All this math is courtesy of DeepSeek R1 🙏
const hobbySuggestions = computed(() => {
  console.log(allHobbies);
  const hobbyMetrics = allHobbies.value
    .filter(hobby => !isDoneToday(hobby)) //to ensure the suggestion for what to do today is actually useful
    .map(hobby => ({...hobby, hobbyHistory: [...hobby.hobbyHistory]}));
  const weights = weightOptions[selectedWeight.value];
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
    hobby.totalScore = weights.frequency * frequencyScore + weights.recency * recencyScore + weights.category * categoryScore;
  });

  console.log(hobbyMetrics.sort((a, b) => b.totalScore - a.totalScore));
  return hobbyMetrics.sort((a, b) => b.totalScore - a.totalScore).slice(0, 3);
})

function isDoneToday(hobby) {
  const today = new Date().toISOString().split('T')[0];
  return hobby.hobbyHistory.includes(today);
}

function getTimeMessage(hobby) {
  const dayDiff = getTimeFrame(hobby);
  if (dayDiff == 1) return "New";
  if (dayDiff == 0) return "Today";
  if (dayDiff == -1) return "Yesterday";
  return `${Math.abs(dayDiff)} days ago`;
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
  <div>
    <h3>If You're Stuck on What To Do, Give These Hobbies a Try</h3>
    <ul>
      <li class="boxshadow" v-for="hobby in hobbySuggestions" :key="hobby.id">
        <!-- TODO: if hobby list empty (all hobbies done today), congrats on doing all your hobbies today (if total hobby list > 5) else suggest trying to find more hobbies -->
        {{ hobby.text }} ({{ hobby.category }})
        <span class="text-secondary">{{ getTimeMessage(hobby) }}</span>
      </li>
    </ul>
    <label style="color: var(--text-faded);" for="weight-selector">Select Suggestion Strategy: </label>
      <select id="weight-selector" v-model="selectedWeight">
        <option value="balance">Balanced</option>
        <option value="categoryDiversity">Category Diversity</option>
        <option value="shortDiversity">Short Term</option>
        <option value="longDiversity">Long Term</option>
      </select>
  </div>
</template>

<style scoped>

ul {
  padding: var(--space-lg) 0px;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  padding: var(--space-sm) var(--space-md);
  width: var(--container-s);
  border-radius: var(--border-radius);
  background: var(--highlight);
  transition-duration: 0.4s;
}

li:hover {
  color: var(--text-highlight);
  background: var(--foreground-highlight);
}

li:hover .text-secondary {
  color: var(--text-faded-highlight);
  transition-duration: 0.4s;
}


</style>