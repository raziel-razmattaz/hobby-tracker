<script setup>

import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { ref, computed, watch, onMounted } from 'vue';
import { useHobbiesStore } from '../stores/hobbies';

// BUG REPORT:
// Top row of calendar only (!) returns date shifted one to the left (= previous day) upon click
// All other rows behave normally. Both event and normal and current and previous month days are affected.

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
  //ensures correct date is recorded!
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  selectedDate.value = utcDate.toISOString().split('T')[0];
  selectedHobbies.value = getHobbiesByDate(selectedDate.value);
};

const updateCalendarEvents = () => {
  const hobbyCountsByDate = new Map();
  hobbiesStore.hobbies.forEach(hobby => {
    hobby.hobbyHistory.forEach(date => {
      hobbyCountsByDate.set(date, (hobbyCountsByDate.get(date) || 0) + 1);
    });
  });
  events.value = Array.from(hobbyCountsByDate.entries()).map(([date, count]) => {
    return {
      start: date,
      end: date,
      title: `${count} hobbies`,
      class: `heatmap-${Math.min(Math.ceil(count), 5)}`
    };
  });
};

watch(
  () => hobbiesStore.hobbies,
  updateCalendarEvents,
  { deep: true }
);

onMounted(updateCalendarEvents);

</script>

<template>
  <h3>Calendar</h3>
    <vue-cal 
      style="height: 400px; width: 600px; overflow-x: hidden; position: relative;"
      hide-view-selector
      active-view="month"
      :disable-views="['years', 'year', 'week', 'day']"
      :events="events"
      events-on-month-view="short"
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

<style> /* Just for quick testing, move to style files later! */
.vuecal__event.heatmap-1 {
  background-color: rgba(203, 39, 124, 0.2);
}
.vuecal__event.heatmap-2 {
  background-color: rgba(203, 39, 124, 0.4);
}
.vuecal__event.heatmap-3 {
  background-color: rgba(203, 39, 124, 0.6);
}
.vuecal__event.heatmap-4 {
  background-color: rgba(203, 39, 124, 0.8);
}
.vuecal__event.heatmap-5 {
  background-color: rgba(203, 39, 124, 1.0);
}
.vuecal__cell {
  height: auto;
  min-height: 0;
  z-index: 2;
  position: relative;
}
.vuecal__cell-content {
  height: 100%;
  position: relative;
  pointer-events: auto;
}
.vuecal__event {
  position: absolute;
  top: 0;
  height: 100%;
  margin: 0;
  border-radius: 0;
  pointer-events: none;
}
.vuecal__cell-date {
  position: relative;
  pointer-events: none;
  z-index: 2;
}
.vuecal__event-title {
  color: transparent;
}
.vuecal__cell-content {
  z-index: 2;
}
/*.vuecal__cell--has-events:hover {
  background-color: rgb(203, 39, 124);
}
.vuecal__cell--selected{
  background-color: rgba(0, 123, 255, 0.6);
}
.vuecal__cell--selected.vuecal__cell--has-events {
  background-color: rgba(0, 123, 255, 0.6);
}*/
</style>