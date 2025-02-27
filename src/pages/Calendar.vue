<script setup>

import VueCal from 'vue-cal';
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
      class="drop-shadow"
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

<style scoped>


</style>