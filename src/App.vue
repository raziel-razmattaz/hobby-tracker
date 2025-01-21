<script setup>

</script>

<template>
  <nav>
    <ul>
      <li><router-link to="/">Hobbies</router-link></li>
      <li><router-link to="/calendar">Calendar</router-link></li>
      <li><router-link to="/stats">Statistics</router-link></li>
      <li><router-link to="/suggestions">Suggestions</router-link></li>
      <li><router-link to="/settings">Settings</router-link></li>
    </ul>
  </nav>
    <router-view />
</template>

<style scoped> /* For testing */
nav li {
  display: inline;
  padding-left: 20px;
}

.router-link-active {
  color: rgba(245, 40, 145, 0.8);
  font-weight: bold;
}
</style>
