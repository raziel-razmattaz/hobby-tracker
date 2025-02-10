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
  <h4>Visuals</h4>
  <li>
    <ul>Theme Toggle</ul>
    <ul>High Contrast Mode</ul>
  </li>
  <h4>Functionality</h4>
  <li>
    <ul>Pick Suggestion Behaviour</ul>
    <ul>Toggle Notifications</ul>
  </li>
  <h4>Data</h4>
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