<script setup>
import { ref, watch, onMounted } from 'vue'

import { useHobbiesStore } from '../stores/hobbies';

const hobbies = useHobbiesStore()

const newHobby = ref('');

hobbies.addHobby("Test Hobby")
hobbies.addHobby("Test Hobby 2")

function addHobby() {
  if (newHobby.value.trim()) {
    hobbies.addHobby(newHobby.value)
    newHobby.value = ''
  }
}

function removeHobby(hobbyID) {
  hobbies.removeHobby(hobbyID)
}

</script>

<template>
  <form @submit.prevent="addHobby">
    <input v-model="newHobby" required placeholder="Enter hobby here...">
    <button>+</button>
  </form>
  <ul>
    <li v-for="hobby in hobbies.hobbies" :key="hobby.id">
      <!--input type="checkbox" :checked="isDoneToday(hobby)" @change="toggleDoneToday(hobby)"-->
      {{ hobby.text }} 
      <!--<span class="date">{{ hobby.last_done }}</span>-->
      <button @click="removeHobby(hobby.id)">x</button>
    </li>
  </ul>
</template>

<style scoped>
.date {
  color: #888;
}
</style>
