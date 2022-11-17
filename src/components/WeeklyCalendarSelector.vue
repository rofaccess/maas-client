<template>
  <div class="input-field col s3">
    <select id="weekly-calendar-select" v-model="weeklyCalendarId" v-on:change="showWeeklyCalendar">
      <option value="" disabled selected>Choose Weekly Calendar</option>
      <option v-for="weeklyCalendar in weeklyCalendars" v-bind:key="weeklyCalendar" v-bind:value="weeklyCalendar.name">{{weeklyCalendar.name}}</option>
    </select>
    <label>Weekly Calendar</label>
  </div>
</template>

<script>
export default {
  name: 'WeeklyCalendarSelector',
  props: {
    weeklyCalendars: Object
  },
  data(){
    return {
      weeklyCalendarId: null
    }
  },
  methods: {
    selectWeeklyCalendar(weeklyCalendar) {
      this.weeklyCalendarId = weeklyCalendar.name;
    },
    showWeeklyCalendar(){
      this.$parent.showWeeklyCalendar(this.weeklyCalendar());
    },
    weeklyCalendar(){
      return this.weeklyCalendars.find(x => x.name === this.weeklyCalendarId);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
