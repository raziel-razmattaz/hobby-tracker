<script setup>

import { useHobbiesStore } from '../stores/hobbies';
const hobbies = useHobbiesStore();

function removeAllHobbies() {
  if (confirm('Are you sure you want to delete all hobby data? This cannot be undone.')) {
    hobbies.removeAllHobbies();
  }
}
</script>

<template>
  <h3>Visuals</h3>
  <li>
    <ul>Theme Toggle</ul>
    <ul>High Contrast Mode</ul>
  </li>
  <h3>Functionality</h3>
  <li>
    <ul>Pick Suggestion Behaviour</ul>
    <ul>Toggle Notifications</ul>
  </li>
  <h3>Data</h3>
  <li>
    <ul>Export Data</ul>
    <ul>Import Data</ul>
    <ul>
      <button @click="removeAllHobbies">Delete all Data</button>
    </ul>
  </li>
</template>

<style scoped>

</style>