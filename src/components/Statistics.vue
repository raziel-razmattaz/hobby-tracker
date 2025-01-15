<script setup>

import { useHobbiesStore } from '../stores/hobbies';

const hobbies = useHobbiesStore();

</script>

<template>
    <div>
      <h3>Statistics</h3>
      <ul>
        <li v-for="hobby in hobbies.hobbies" :key="hobby.id">
          {{ hobby.text }} - Done {{ hobby.hobbyHistory.length }} times
        </li>
      </ul>
    </div>
  </template>