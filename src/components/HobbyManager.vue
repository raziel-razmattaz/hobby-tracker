<script setup>
import { ref, watch, onMounted } from 'vue'

//defineProps({
  //msg: String,
  //test: String
//})

//TODO:
// Display Data related to how often each Hobby was done (Statistics Component)
// Switch between Statistics and Hobby List in "Main Frame"

let id = 0;

const newHobby = ref('')

const hobbies = ref([
  { id: id++, text: 'Coding Project', last_done: "2025-01-10", done_history: ["2025-01-10"]},
  { id: id++, text: 'Reading VNs', last_done: "2025-01-09", done_history: ["2025-01-09"] },
  { id: id++, text: '***', last_done: "2025-01-08", done_history: ["2025-01-08"] }
])

function addHobby() {
  hobbies.value.push({ id: id++, text: newHobby.value, last_done: null, done_history: [] });
  newHobby.value = '';
}

function removeHobby(hobby) {
  hobbies.value = hobbies.value.filter((h) => h !== hobby);
}

function isDoneToday(hobby) {
  const today = new Date().toISOString().split('T')[0];
  return hobby.done_history.includes(today);
}

function toggleDoneToday(hobby) {

  const today = new Date().toISOString().split('T')[0];

  if (isDoneToday(hobby)) {
    const index = hobby.done_history.indexOf(today);
    if (index !== -1) {
      hobby.done_history.splice(index, 1);
    }
    hobby.last_done = hobby.done_history.length > 0 
      ? hobby.done_history[hobby.done_history.length - 1] 
      : null;
  } else {
    hobby.done_history.push(today);
    hobby.last_done = today;
  }
}

watch(hobbies, (newHobbies) => {
  localStorage.setItem('hobbies', JSON.stringify(newHobbies));
}, { deep: true });

onMounted(() => {
  const storedHobbies = localStorage.getItem('hobbies');
  if (storedHobbies) {
    hobbies.value = JSON.parse(storedHobbies);
    id = hobbies.value.length > 0 ? Math.max(...hobbies.value.map(h => h.id)) + 1 : 0;
  }
});

</script>

<template>
  <form @submit.prevent="addHobby">
    <input v-model="newHobby" required placeholder="Enter hobby here...">
    <button>+</button>
  </form>
  <ul>
    <li v-for="hobby in hobbies" v-bind:key="hobby.id">
      <input type="checkbox" :checked="isDoneToday(hobby)" @change="toggleDoneToday(hobby)">
      {{ hobby.text }} <span class="date">{{ hobby.last_done }}</span>
      <button @click="removeHobby(hobby)">x</button>
    </li>
  </ul>
</template>

<style scoped>
.date {
  color: #888;
}
</style>
