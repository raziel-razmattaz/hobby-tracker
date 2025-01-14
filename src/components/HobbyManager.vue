<script setup>
import { ref, watch, onMounted } from 'vue'

import { useHobbiesStore } from '../stores/hobbies';

const hobbies = useHobbiesStore()

const newHobby = ref('');

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
