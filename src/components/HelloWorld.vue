<script setup>
import { ref } from 'vue'

//defineProps({
  //msg: String,
  //test: String
//})

//TODO:
// Complete Vue Tutorial!! (currently @ 8/15)
// New GitHub Project + init project!
// Re-Reach current check-list status (possibly different impl? think "data")
// Think about Presentation! + which screens do you want to have? Probably "frame" + diff components inside
// Begin Implementing done today checks using dates of last check

let id = 0;

const newHobby = ref('')

const hobbies = ref([
  { id: id++, text: 'Coding Project', done_today: true }, //change later to last date etc etc
  { id: id++, text: 'Reading VNs', done_today: false },
  { id: id++, text: '***', done_today: false }
])

function addHobby() {
  hobbies.value.push({ id: id++, text: newHobby.value, done_today: false })
  newHobby.value = ''
}

function removeHobby(hobby) {
  hobbies.value = hobbies.value.filter((h) => h !== hobby)
}

</script>

<template>
  <form @submit.prevent="addHobby">
    <input v-model="newHobby" required placeholder="Enter hobby here...">
    <button>+</button>
  </form>
  <ul>
    <li v-for="hobby in hobbies" v-bind:key="hobby.id">
      {{ hobby.text }}
      <button @click="removeHobby(hobby)">x</button>
    </li>
  </ul>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
