<script setup>

import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { ref, computed, watch, onMounted } from 'vue';
import { useHobbiesStore } from '../stores/hobbies';

const hobbiesStore = useHobbiesStore();

const events = ref([]);
const selectedDate = ref(null);
const selectedHobbies = ref([]);

const maxDate = computed(() => new Date().toISOString().split('T')[0]);

const getHobbiesByDate = (date) => {
  return hobbiesStore.hobbies.filter(hobby =>
    hobby.hobbyHistory.includes(date)
  );
};

const handleDayClick = (date) => {
  selectedDate.value = date.toISOString().split('T')[0]; // Format date
  selectedHobbies.value = getHobbiesByDate(selectedDate.value);
  console.log(selectedDate.value);
  console.log(selectedHobbies.values);
};

const updateCalendarEvents = () => {
  events.value = hobbiesStore.hobbies.flatMap(hobby =>
    hobby.hobbyHistory.map(date => ({
      start: date,
      end: date,
      title: hobby.text,
    }))
  );
};

watch(
  () => hobbiesStore.hobbies,
  updateCalendarEvents,
  { deep: true }
);

onMounted(updateCalendarEvents);

// TODO:
// Get Hobby data per day
// Colour calendar day based on how many Hobbies you checkmarked that day (Blank to Very Saturated)

</script>

<template>
  <h3>Calendar</h3>
    <vue-cal 
      style="height: 400px; width: 600px; overflow-x: hidden; position: relative;"
      hide-view-selector
      active-view="month"
      :disable-views="['years', 'year', 'week', 'day']"
      :events="events"
      :maxDate="maxDate"
      @cell-click="handleDayClick"
    />
  <div>
    <p>{{ selectedDate || "Click on a day to see details."}}</p>
    <ul>
      <li v-for="hobby in selectedHobbies" :key="hobby.id">
        {{ hobby.text }}
      </li>
    </ul>
  </div>
</template>

<style> /* Just for testing, move to style files later! */
.vuecal__cell--has-events {
  background-color: rgba(0, 123, 255, 0.3);
}
.vuecal__cell--has-events:hover {
  background-color: rgba(0, 123, 255, 0.6);
}
.vuecal__cell--selected{
  background-color: rgba(0, 123, 255, 0.6);
}
.vuecal__cell--selected.vuecal__cell--has-events {
  background-color: rgba(0, 123, 255, 0.6);
}
.vuecal__cell-events-count {
  display: none;
}
</style>