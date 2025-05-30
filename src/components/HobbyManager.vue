<script setup>

import { ref, computed, watchEffect } from 'vue'
import { useHobbiesStore } from '../stores/hobbies';
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue';
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select';

const hobbies = useHobbiesStore();

const newHobby = ref('');
const newCategory = ref(hobbies.categoryOptions[0].value);

function addHobby() {
  if (newHobby.value.trim()) {
    hobbies.addHobby(newHobby.value, newCategory.value);
    newHobby.value = '';
  }
}

function removeHobby(hobbyID) {
  hobbies.removeHobby(hobbyID);
}

function toggleDoneToday(hobbyID) {
  hobbies.toggleDoneToday(hobbyID);
}

function isDoneToday(hobby) {
  const today = new Date().toISOString().split('T')[0];
  return hobby.hobbyHistory.includes(today);
}

function getLatestDate(hobby) {
  if (!hobby.hobbyHistory || hobby.hobbyHistory.length === 0) return null;
  // just in case the hobby histories are ever saved out of order
  return hobby.hobbyHistory.slice().sort().pop();
}


</script>

<template>
  
  <div>
    <form @submit.prevent="addHobby">
      <input v-model="newHobby" type="text" class="boxshadow" maxlength="25" placeholder="Enter hobby here...">
      <v-select
          class="vue-selector boxshadow"
          v-model="newCategory"
          :options="hobbies.categoryOptions"
          :searchable="false"
          :clearable="false"
          label="label"
          :reduce="option => option.value"
        />
      <button class="material-icons add-button boxshadow">add</button>
    </form>
    <ul>
      <li class="boxshadow" v-for="hobby in hobbies.hobbies" :key="hobby.id">
        <div class="li-left">
          <CheckboxRoot :checked="isDoneToday(hobby)" @update:checked="toggleDoneToday(hobby.id)" class="CheckboxRoot">
            <CheckboxIndicator class="CheckboxIndicator">✓</CheckboxIndicator>
          </CheckboxRoot>
          {{ hobby.text }} ({{ hobby.category || "Uncategorised" }})
        </div>
        <div class="li-right">
          <span class="text-secondary">{{ getLatestDate(hobby) || "Never" }}</span>
          <button @click="removeHobby(hobby.id)" class="material-icons delete-button">delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

form {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  width: 100%;
  max-width: var(--container-sm);
  margin-bottom: var(--space-lg);
}

/* List Element Styling */

li {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  padding: var(--space-sm) var(--space-md);
  width: 100%;
  max-width: var(--container-sm);
  border-radius: var(--border-radius);
  background: var(--foreground);
  transition-duration: 0.4s;
}

.li-left, .li-right {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.li-left {
  flex-grow: 1;
}

li:hover {
  color: var(--text-highlight);
  background: var(--foreground-highlight);
}

li:hover .text-secondary {
  color: var(--text-faded-highlight);
}

li button {
  color: inherit;
  background: none;
}

/* Input Field Styling */

input[type=text] {
  flex: 1;
  min-width: 0;
  padding: var(--space-xs) var(--space-md);
  color: var(--text-faded);
  border: none;
  border-radius: var(--border-radius);
  background: var(--foreground);
}

input[type=text]:focus {
  color: var(--text-highlight);
  outline: none;
  background: var(--foreground-highlight);
}

option {
  font-family: var(--body-font);
}

.delete-button:hover {
  color: var(--danger);
  background: none;
  transition: 0.4s;
}

.add-button {
  flex: 0 0 auto;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--border-radius);
  background: var(--foreground);
}

button:hover {
  color: var(--text-highlight);
  background: var(--foreground-highlight);
  transition-duration: 0.4s;
}

/* Media Queries */

@media (max-width: 768px) {
  form {
    flex-direction: row;
    gap: var(--space-md);
    margin-bottom: var(--space-xl);
  }

  input[type="text"] {
    width: 100%;
    padding: var(--space-xs) var(--space-md);
    flex: none;
  }

  li {
    flex-wrap: nowrap;
    align-items: flex-start;
    gap: var(--space-sm);
  }
}

</style>
