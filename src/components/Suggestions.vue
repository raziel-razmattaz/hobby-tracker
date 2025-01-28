<script setup>

import { computed } from 'vue';
import { useHobbiesStore } from '../stores/hobbies';

const hobbies = useHobbiesStore();

//TODO:
//Hobby Suggestion Roulette:
  //Suggestions Algorithm based on 3 criteria:
    //If no hobbies: Suggest adding some on the hobby screen
    //If <= 3 hobbies: Suggest all of them (+ suggest adding more)
    //For each hobby: (weight * recency score) + (weight * recent frequency score) + (weight * category balance score)
    //Then: Sort with top scoring (ie most neglected) hobbies in first
    //Considerations: normalisations? possibly optimisations...? (unneccessary?)
//Balance Meter: Chart with hobby category distribution instead of hobbies (spider web chart type?)

//Game Plan:
//Develop pure recency score algorithm
//Develop pure frequency score algorithm (focused on last 30 days)
//Develop pure category balance score algorithm
//Combine with weighted scoring (incl normalisations?)
//Sort and pick top three scorers (or random with bias towards top of the list?)
//Save top three suggestions for today (with date) and access when reloading to avoid recalculation (?)
//Display top three suggestions with last done X days ago + category
//Buttons for toggling different weights/preferences in calculating
//Basic Chart.js Radar Chart
//Populate Radar Chart with Category Scores

function getSuggestions() {
  //for each hobby: hobby metrics []
}

function calculateRecencyScore() {
  //
}

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
    <li v-for="hobby in hobbies.hobbies" :key="hobby.id">
      {{ hobby.text }} - {{ getTimeMessage(hobby) }} ({{ hobby.hobbyHistory.length }} total times)
    </li>
  </ul>
</template>