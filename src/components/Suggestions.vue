<script setup>

import { computed } from 'vue';
import { useHobbiesStore } from '../stores/hobbies';

const hobbies = useHobbiesStore();

//Revamp later
function getTimeMessage(hobby) {
  const dayDiff = getTimeFrame(hobby);
  if (dayDiff == 1) return "You haven't tried this one yet.";
  if (dayDiff == 0) return "Last done today.";
  if (dayDiff == -1) return "Last done yesterday.";
  return `Last done ${Math.abs(dayDiff)} days ago.`;
}

function getTimeFrame(hobby) {
  if (!hobby.hobbyHistory || hobby.hobbyHistory.length === 0) return 1;
  const latestDate = hobby.hobbyHistory.slice().sort().pop();
  const today = new Date();
  const [year, month, day] = latestDate.split('-').map(Number);
  const firstDate = new Date(year, month - 1, day);
  firstDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((firstDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays;
}

//TODO:
//Hobby Roulette: Give three random hobbies, prioritizing neglected hobbies first
//If no recorded data just give three random hobbies.
//If no hobbies suggest adding some to receive suggestions
//Add button to re-randomize
//Balance Meter: which hobby categories havent been done recently?
//Highlight Categories: Haven't done in the last 2 weeks | Rediscovered Favourites (recent bout of activity after neglect)

</script>

<template>
  <h3>Suggestions</h3>
  <ul>
    <li v-for="hobby in hobbies.hobbies" :key="hobby.id">
      {{ hobby.text }} - {{ getTimeMessage(hobby) }} ({{ hobby.hobbyHistory.length }} total times)
    </li>
  </ul>
</template>