<script setup>

import { ref } from 'vue'

import { useHobbiesStore } from '../stores/hobbies';

const hobbies = useHobbiesStore();

const newHobby = ref('');
const newCategory = ref(hobbies.categories[0]);

// Example Hobbies

/** hobbies.addHobby("Coding", "Stimulating");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2025-01-15",
    "2025-01-20",
    "2025-01-25"
];

hobbies.addHobby("Studying", null);
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-28",
    "2025-01-10",
    "2025-01-18",
    "2025-01-26"
];

hobbies.addHobby("Reading", "Stimulating");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2025-01-02",
    "2025-01-08",
    "2025-01-15",
    "2025-01-23",
    "2025-01-27"
];

hobbies.addHobby("Birdwatching", "Physical");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-30",
    "2025-01-05",
    "2025-01-14",
    "2025-01-21"
];

hobbies.addHobby("Cooking", "Creative");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-20",
    "2024-12-25",
    "2024-12-28",
    "2025-01-02",
    "2025-01-10",
    "2025-01-18"
];

hobbies.addHobby("Music 🎶", "Relaxing");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-26",
    "2025-01-06",
    "2025-01-13",
    "2025-01-20",
    "2025-01-26"
];

hobbies.addHobby("Photography", "Stimulating");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-31",
    "2025-01-11",
    "2025-01-21",
    "2025-01-24"
];

hobbies.addHobby("Digital Art", "Creative");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [];

hobbies.addHobby("Reading VNs", null); // No category
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2025-01-03",
    "2025-01-09",
    "2025-01-15",
    "2025-01-22",
    "2025-01-28"
];

hobbies.persistToLocalStorage();*/

function addHobby() {
  if (newHobby.value.trim()) {
    hobbies.addHobby(newHobby.value, newCategory.value);
    newHobby.value = '';
  }
}

function removeHobby(hobbyID) {
  hobbies.removeHobby(hobbyID);
}

function toggleDoneToday(hobbyID) {
  hobbies.toggleDoneToday(hobbyID);
}

function isDoneToday(hobby) {
  const today = new Date().toISOString().split('T')[0];
  return hobby.hobbyHistory.includes(today);
}

function getLatestDate(hobby) {
  if (!hobby.hobbyHistory || hobby.hobbyHistory.length === 0) return null;
  // just in case the hobbies are ever saved out of order
  return hobby.hobbyHistory.slice().sort().pop();
}

</script>

<template>
  <form @submit.prevent="addHobby">
    <input v-model="newHobby" required placeholder="Enter hobby here...">
    <select v-model="newCategory">
      <option v-for="category in hobbies.categories" :key="category" :value="category">{{ category }}</option>
    </select>
    <button>+</button>
  </form>
  <ul>
    <li v-for="hobby in hobbies.hobbies" :key="hobby.id">
      <input type="checkbox" :checked="isDoneToday(hobby)" @change="toggleDoneToday(hobby.id)">
      {{ hobby.text }} ({{ hobby.category || "Uncategorised" }})
      <span class="date">{{ getLatestDate(hobby) || "Never" }}</span>
      <button @click="removeHobby(hobby.id)">x</button>
    </li>
  </ul>
</template>

<style scoped>
.date {
  color: #888;
}
</style>
