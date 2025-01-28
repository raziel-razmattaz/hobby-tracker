<script setup>

import { ref } from 'vue'

import { useHobbiesStore } from '../stores/hobbies';

const hobbies = useHobbiesStore();

const newHobby = ref('');

//Example Hobby Data

/**hobbies.addHobby("Reading VNs");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2025-01-01",
    "2025-01-03",
    "2025-01-05",
    "2025-01-08",
    "2025-01-15",
    "2025-01-22",
    "2025-01-30"
];

hobbies.addHobby("Origami");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-01",
    "2024-12-05",
    "2024-12-12",
    "2025-01-10",
    "2025-01-25"
];

hobbies.addHobby("Digital Art");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-02",
    "2024-12-08",
    "2025-01-02",
    "2025-01-09",
    "2025-01-18"
];

hobbies.addHobby("Birdwatching");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-03",
    "2024-12-10",
    "2024-12-15",
    "2025-01-05",
    "2025-01-12",
    "2025-01-20",
    "2025-01-27"
];

hobbies.addHobby("Game Coding");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-01",
    "2024-12-12",
    "2024-12-25",
    "2025-01-08",
    "2025-01-22"
];

hobbies.addHobby("Cooking");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-06",
    "2024-12-15",
    "2025-01-05",
    "2025-01-06",
    "2025-01-07",
    "2025-01-12",
    "2025-01-18"
];

hobbies.addHobby("Photography");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-01",
    "2024-12-14",
    "2024-12-31",
    "2025-01-10",
    "2025-01-20"
];

hobbies.addHobby("Writing");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2025-01-01",
    "2025-01-03",
    "2025-01-10",
    "2025-01-17",
    "2025-01-24"
];

hobbies.addHobby("Get Bubble Tea");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-05",
    "2024-12-18",
    "2025-01-01",
    "2025-01-02",
    "2025-01-09",
    "2025-01-15"
];

hobbies.addHobby("Running");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [];

hobbies.persistToLocalStorage();*/

function addHobby() {
  if (newHobby.value.trim()) {
    hobbies.addHobby(newHobby.value)
    newHobby.value = ''
  }
}

function removeHobby(hobbyID) {
  hobbies.removeHobby(hobbyID)
}

function toggleDoneToday(hobbyID) {
  hobbies.toggleDoneToday(hobbyID)
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
    <button>+</button>
  </form>
  <ul>
    <li v-for="hobby in hobbies.hobbies" :key="hobby.id">
      <input type="checkbox" :checked="isDoneToday(hobby)" @change="toggleDoneToday(hobby.id)">
      {{ hobby.text }} 
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
