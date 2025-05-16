<script setup>

</script>

<template>
  <div class="app-container">
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
        <li><router-link to="/settings">
          <span class="material-icons">manage_accounts</span>
        </router-link></li>
      </ul>
    </nav>
    <main>
      <router-view/>
      <footer>
        <p>© 2025 chronoDot. A hobby project.</p>
        <p><a href="https://github.com/raziel-razmattaz/hobby-tracker" target="_blank">GitHub</a> | <router-link to="/about">About</router-link></p> 
        <p>Made with ☕ by raziel-razmattaz.</p>
      </footer>
    </main>
  </div>
</template>

<style scoped>

.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

nav {
  position: sticky;
  top: 0;
  width: 100%;
  flex-shrink: 0
}

nav ul {
  background: var(--foreground);
  padding-left: var(--space-xl);
}

nav li {
  display: inline-block;
  color: var(--text);
  -webkit-user-select: none;
  user-select: none;
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

main {
  padding-top: var(--space-xxl);
  overflow-y: scroll;
  flex: 1;
  min-height: 0%;
}

footer {
  color: var(--text-footer);
  font-size: smaller;
  text-align: center;
  padding-top: var(--space-md);
  margin-top: var(--space-xxl);
  background: var(--footer);
  height: var(--space-xxxl);
}

</style>
