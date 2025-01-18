<script>

import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  components: { VueCal },
  data() {
    return {
      events: [{
        start: '2025-01-15',
        end: '2025-01-19',
        title: 'Tests Tests'
      }],
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
      return [];
    },
  },
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
      @cell-click="handleDayClick"
    />
  <div>
    <p>{{ selectedDate || "Click on a day to see details."}}</p>
  </div>
</template>

<style scoped>
</style>