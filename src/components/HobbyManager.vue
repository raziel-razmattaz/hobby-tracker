<script setup>

import { ref } from 'vue'
import { useHobbiesStore } from '../stores/hobbies';
import { CheckboxIndicator, CheckboxRoot } from 'radix-vue';

const hobbies = useHobbiesStore();

const newHobby = ref('');
const newCategory = ref(hobbies.categories[0]);

// Example Hobbies

/** hobbies.addHobby("Coding", "Stimulating");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2025-01-15",
    "2025-01-20",
    "2025-01-25"
];

hobbies.addHobby("Studying", null);
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-28",
    "2025-01-10",
    "2025-01-18",
    "2025-01-26"
];

hobbies.addHobby("Reading", "Stimulating");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2025-01-02",
    "2025-01-08",
    "2025-01-15",
    "2025-01-23",
    "2025-01-27"
];

hobbies.addHobby("Birdwatching", "Physical");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-30",
    "2025-01-05",
    "2025-01-14",
    "2025-01-21"
];

hobbies.addHobby("Cooking", "Creative");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-20",
    "2024-12-25",
    "2024-12-28",
    "2025-01-02",
    "2025-01-10",
    "2025-01-18"
];

hobbies.addHobby("Music 🎶", "Relaxing");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-26",
    "2025-01-06",
    "2025-01-13",
    "2025-01-20",
    "2025-01-26"
];

hobbies.addHobby("Photography", "Stimulating");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2024-12-31",
    "2025-01-11",
    "2025-01-21",
    "2025-01-24"
];

hobbies.addHobby("Digital Art", "Creative");
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [];

hobbies.addHobby("Reading VNs", null); // No category
hobbies.hobbies[hobbies.hobbies.length - 1].hobbyHistory = [
    "2025-01-03",
    "2025-01-09",
    "2025-01-15",
    "2025-01-22",
    "2025-01-28"
];

hobbies.persistToLocalStorage();*/

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
      <select v-model="newCategory" class="boxshadow">
        <option class="test" v-for="category in hobbies.categories" :key="category" :value="category">{{ category }}</option>
      </select>
      <button class="add-button boxshadow">+</button>
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
          <button @click="removeHobby(hobby.id)">X</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

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
  padding: var(--space-xs);
  padding-left: var(--space-sm);
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

/* Add Button Styling */

.add-button {
  width: var(--space-lg);
  height: var(--space-lg);
  border-radius: var(--border-radius);
  background: var(--foreground);
}

</style>
