<script setup>

</script>

<template>
  <nav>
    <ul>
      <li><router-link to="/">
        <span class="material-icons">checklist</span>
      </router-link></li>
      <li><router-link to="/calendar">
        <span class="material-icons">calendar_today</span>
      </router-link></li>
      <li><router-link to="/stats">
        <span class="material-icons">bar_chart</span>
      </router-link></li>
      <li><router-link to="/suggestions">
        <span class="material-icons">lightbulb</span>
      </router-link></li>
      <li><router-link to="/settings">
        <span class="material-icons">manage_accounts</span>
      </router-link></li>
    </ul>
  </nav>
    <router-view />
</template>

<style scoped>
nav li {
  display: inline;
  padding-left: 20px;
}

.router-link-active {
  color: rgba(245, 40, 145, 0.8);
  font-weight: bold;
}
</style>
