<script setup>

import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { ref, computed, watch, onMounted } from 'vue';
import { useHobbiesStore } from '../stores/hobbies';

//TODO:
// Style the secondary day list component
// Style secondary list component when empty
// Full Calendar Layout with spacing and everything

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
    <vue-cal 
      style="height: 25rem; width: 37.5rem; overflow-x: hidden; position: relative;"
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

<style>

.vuecal__event.heatmap-1 { background-color: rgba(203, 39, 124, 0.2); }
.vuecal__event.heatmap-2 { background-color: rgba(203, 39, 124, 0.4); }
.vuecal__event.heatmap-3 { background-color: rgba(203, 39, 124, 0.6); }
.vuecal__event.heatmap-4 { background-color: rgba(203, 39, 124, 0.8); }
.vuecal__event.heatmap-5 { background-color: rgba(203, 39, 124, 1.0); }

.vuecal {
  background-color: var(--foreground);
  box-shadow: 4px 4px var(--drop-shadow);
  border-radius: var(--border-radius);
}

.vuecal__weekdays-headings {
  background: var(--drop-shadow);
  border: none;
}

.vuecal__title-bar {
  background: var(--highlight);
}

.vuecal__cell::before {
  border: none;
}

.vuecal__cell {
  height: auto;
  min-height: 0;
  border: none;
  z-index: 2;
  position: relative;
}

.vuecal__cell:hover {
  background: var(--foreground-highlight);
  color: var(--text-highlight);
  transition: 0.4s;
}

.vuecal__cell:hover .vuecal__event {
  background: var(--foreground-highlight);
}

.vuecal__cell--disabled:hover {
  background: none;
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

.vuecal__cell--today {
  background-color: var(--highlight);
}

.vuecal__cell--selected {
  background-color: var(--highlight) !important;
}

.vuecal__cell--selected .vuecal__event {
  background-color: var(--highlight) !important;
}
</style>