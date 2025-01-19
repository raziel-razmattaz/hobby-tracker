<script setup>

import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { useHobbiesStore } from '../stores/hobbies';

export default {
  components: { VueCal },
  data() {
    return {
      events: [],
      selectedDate: null,
      selectedHobbies: [],
    };
  },
  methods: {
    handleDayClick(date) {
      this.selectedDate = date.toISOString().split('T')[0];
      console.log(this.selectedDate);
      this.selectedHobbies = this.getHobbiesByDate(this.selectedDate);
      console.log(this.selectedHobbies);
    },
    getHobbiesByDate(date) {
      const hobbies = useHobbiesStore();
      return hobbies.hobbies.filter(hobby =>
        hobby.hobbyHistory.includes(date)
      );
    },
    updateCalendarEvents() {
      const hobbiesStore = useHobbiesStore();
      this.events = hobbiesStore.hobbies.flatMap(hobby =>
        hobby.hobbyHistory.map(date => ({
          start: date,
          end: date,
          title: hobby.text,
        }))
      );
    }
  },
  computed: {
  maxDate () {
    return new Date().format();
  },
  watch: {
    'useHobbiesStore().hobbies': {
      handler() {
        this.updateCalendarEvents();
      },
      deep: true,
    },
  },
  mounted() {
    this.updateCalendarEvents();
  },
}
};

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