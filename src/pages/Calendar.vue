<script setup>

import VueCal from 'vue-cal';
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
  <div class="page">
    <div class="content">
      <vue-cal 
        style="height: 25rem; width: 37.5rem; overflow-x: hidden;"
        class="drop-shadow"
        hide-view-selector
        active-view="month"
        :disable-views="['years', 'year', 'week', 'day']"
        :events="events"
        events-on-month-view="short"
        :maxDate="maxDate"
        @cell-click="handleDayClick"
      />
      <div class="day-detail boxshadow">
        <div v-if="selectedDate" class="day-title-bar">
          {{ selectedDate }}
        </div>
        <div v-else class="day-placeholder p-lg">
          <p>Click on a day to see details.</p>
        </div>
        <ul v-if="selectedHobbies.length > 0">
          <li v-for="hobby in selectedHobbies" :key="hobby.id">
            {{ hobby.text }}
          </li>
        </ul>
        <p v-else-if="selectedDate != null" class="day-empty">No hobbies recorded.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.day-detail {
  width: var(--container-xs);
  background: var(--foreground);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.day-title-bar {
  display: flex;
  font-size: 1.3rem;
  font-weight: 600;
  padding-left: var(--space-lg);
  min-height: var(--space-xxl);
  align-items: center;
  background: var(--highlight);
  box-shadow: 0px 4px var(--drop-shadow);
}

.day-placeholder {
  color: var(--text-faded);
}

.day-empty {
  color: var(--text-faded);
  margin: var(--space-md) var(--space-lg);
}

li {
  margin: var(--space-sm) var(--space-lg);
}

li:first-child {
  margin-top: var(--space-md);
}

.page {
  display: flex;
  justify-content: center;
}

.content {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: var(--space-xxl);
}

</style>