<script setup>

defineProps({
  hobbies: Array
});

//TODO:
// Display Data related to how often each Hobby was done
// Switch between Statistics and Hobby List in "Main Frame"

//defineEmits(['do-something']);

</script>

<template>
    <div>
      <h2>Statistics</h2>
      <ul>
        <!-- Test feature! -->
        <li v-for="hobby in hobbies" :key="hobby.id">
          {{ hobby.text }} - Done {{ hobby.done_history.length }} times
          <button @click="$emit('do-something', hobby.id)">Whatever</button>
        </li>
      </ul>
      <!-- TODO: everything -->
    </div>
  </template>