<script setup>

</script>

<template>
  <nav>
    <ul class="boxshadow">
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
nav ul {
  background: var(--foreground);
  margin-bottom: var(--space-xxl);
}

nav li {
  display: inline-block;
  color: var(--text);
}

nav li a {
  display: block;
  padding: var(--space-md);
  text-decoration: none;
  color: inherit;
}

nav li a.router-link-active {
  background: var(--highlight);
}

</style>
