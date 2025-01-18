<script>

import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

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
    handleDayClick(day) {
      this.selectedDate = day.date;
      this.selectedHobbies = this.getHobbiesByDate(day.date);
    },
    getHobbiesByDate(date) {
      return [];
    },
  },
};

// TODO:
// Calendar click -> info for day
// Get Hobby data per day
// Colour calendar day based on how many Hobbies you checkmarked that day (Blank to Very Saturated)

</script>

<template>
  <h3>Calendar</h3>
    <vue-cal 
      style="height: 400px; width: 600px;"
      hide-view-selector
      :time="false"
      active-view="month"
      :disable-views="['years', 'year', 'week', 'day']"
    />
  <div v-if="selectedDate">
    <h4>{{ selectedDate }}</h4>
  </div>
</template>