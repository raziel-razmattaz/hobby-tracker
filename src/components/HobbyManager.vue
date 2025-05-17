<script setup>

import { ref, computed } from 'vue'
import { useHobbiesStore } from '../stores/hobbies';
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue';
import VueSelect from "vue3-select-component";

const hobbies = useHobbiesStore();

// TODO:
// 1. Custom Selector
// 2. Fix Hobby Manager Bar at Top
// 3. Custom Toggles

const newHobby = ref('');
const newCategory = ref(hobbies.categories[0]);

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

const checkboxOne = ref(true)

</script>

<template>
  
  <div>
    <form @submit.prevent="addHobby">
      <input v-model="newHobby" type="text" class="boxshadow" maxlength="25" placeholder="Enter hobby here...">
      <VueSelect
        class="vue-selector"
        v-model="newCategory"
        :options="hobbies.categoryOptions"
        placeholder="Category"
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
  gap: var(--space-md);
  width: var(--container-sm);
  margin-bottom: var(--space-md);
}

/* List Element Styling */

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-md);
  margin-bottom: var(--space-md);
  padding: var(--space-sm) var(--space-md);
  width: var(--container-sm);
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
  padding: var(--space-sm) var(--space-md);
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

select {
  padding: var(--space-xs);
  padding-left: var(--space-sm);
  font-family: var(--body-font);
  color: var(--text);
  border: none;
  border-radius: var(--border-radius);
  background: var(--foreground);
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
  padding: var(--space-sm) var(--space-sm);
  border-radius: var(--border-radius);
  background: var(--foreground);
}

button:hover {
  color: var(--text-highlight);
  background: var(--foreground-highlight);
  transition-duration: 0.4s;
}

</style>
