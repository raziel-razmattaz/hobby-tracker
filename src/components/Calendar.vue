<script>

import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
  components: { VueCal },
  data() {
    return {
      events: [{
        start: '2025-01-15',
        end: '2025-01-18',
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
  computed: {
  maxDate () {
    return new Date().format()
  }
}
};

// TODO:
// Get Hobby data per day
// Disable date selection after today!
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
  </div>
</template>

<style>
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