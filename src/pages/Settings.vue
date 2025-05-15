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
  <div class="page">
    <h3>Visuals</h3>
    <div class="callout boxshadow">
      <li>
        <ul>
          <div class="settings-content">
            <div class="settings-heading">Theme</div>
            <div class="settings-description">Toggle light and dark mode.</div>
          </div>
          <button>Toggle</button>
        </ul>
        <ul>
          <div class="settings-content">
            <div class="settings-heading">High Contrast Mode</div>
            <div class="settings-description">Toggle high contrast mode.</div>
          </div>
          <button>Toggle</button>
        </ul>
      </li>
    </div>
    
    <h3>Data Settings</h3>
    <div class="callout boxshadow">
      <li>
        <ul>
          <div class="settings-content">
            <div class="settings-heading">Export Save Data</div>
            <div class="settings-description">Download a copy of your save data as a JSON file.</div>
          </div>
          <button class="material-icons">download</button>
        </ul>
        <ul>
          <div class="settings-content">
            <div class="settings-heading">Import Save Data</div>
            <div class="settings-description">Upload a JSON file with existing hobby data. Overwrites any save data currently in your browser. Cannot be undone.</div>
          </div>
          <button class="material-icons">publish</button>
        </ul>
        <ul>
          <div class="settings-content">
            <div class="settings-heading">Delete All Save Data</div>
            <div class="settings-description">Erases all local save data. Cannot be undone.</div>
          </div>
          <button class="delete-button material-icons" @click="removeAllHobbies">delete_forever</button>
        </ul>
      </li>
    </div>
  </div>
</template>

<style scoped>

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.callout ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md) 0;
}

.callout ul:last-child {
  border-bottom: none;
}

.settings-content {
  flex: 1;
  max-width: var(--container-sm);
}

.callout {
  justify-content: space-between;
  align-items: center;
  padding: var(--space-lg);
  width: 100%;
  background: var(--foreground);
  border-radius: var(--border-radius);
}

.settings-heading {
  color: var(--text);
}

.settings-description {
  color: var(--text-faded);
}

.delete-button {
  color: var(--danger);
  margin-top: var(--space-md);
}

button {
  color: var(--text);
  border-radius: var(--border-radius);
  padding: var(--space-xs) var(--space-md);
  background: var(--foreground-light);
  transition-duration: 0.4s;
  box-shadow: 0px 4px var(--drop-shadow);
}

button:hover {
  color: var(--text-highlight);
  background: var(--foreground-highlight);
  transition-duration: 0.4s;
}

</style>