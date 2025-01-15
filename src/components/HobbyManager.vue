<script setup>

import { ref } from 'vue'

import { useHobbiesStore } from '../stores/hobbies';

const hobbies = useHobbiesStore();

const newHobby = ref('');

//Example Hobby Data

/**hobbies.addHobby("Reading VNs");
hobbies.addHobby("Origami");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-01",
    "2024-12-05",
    "2024-12-10"
];
hobbies.addHobby("Digital Art");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-11-15"
];
hobbies.addHobby("Birdwatching");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-03",
    "2024-12-08",
    "2024-12-15",
    "2024-12-20"
];
hobbies.addHobby("Game Coding");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-11-01",
    "2024-11-15",
    "2024-11-20",
    "2024-11-30",
    "2024-12-05"
];
hobbies.persistToLocalStorage(); */

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
