<template>
  <select id="weekly-calendar-select" v-model="weeklyCalendarId" v-on:change="showWeeklyCalendar">
    <option value="" disabled selected>Choose Weekly Calendar</option>
    <option v-for="weeklyCalendar in weeklyCalendars" v-bind:key="weeklyCalendar" v-bind:value="weeklyCalendar.name">
      {{ weeklyCalendar.name }}
    </option>
  </select>
  <label>Weekly Calendar</label>
</template>

<script>
import MaterializeHelper from "@/helpers/materialize-helper";
import {nextTick} from "vue";

export default {
  name: 'WeeklyCalendarSelector',
  data(){
    return {
      weeklyCalendars: {},
      weeklyCalendarId: null,
    }
  },
  mounted() {
    this.loadWeeklyCalendars();
  },
  methods: {
    initFormSelect(elemSelector) {
      // nexTick used to initFormSelect after load values in selectors in dom
      nextTick(() => {
        MaterializeHelper.initFormSelect(elemSelector);
      });
    },
    loadWeeklyCalendars() {
      this.axios.get('/weekly_calendars', {responseType: 'json'})
          .then(response => {
            this.weeklyCalendars = response.data;
            this.weeklyCalendarId = this.currentWeeklyCalendar().name; //Set current week calendar by default
            this.showWeeklyCalendar();
            this.initFormSelect('#weekly-calendar-select');
            if(!this.hasWeeklyCalendars()) MaterializeHelper.showAlert('No weekly calendars found');
          })
          .catch(error => {
            MaterializeHelper.showAlert(`${error.message}: Can't load weekly calendars`, 'danger');
          });
    },
    currentWeeklyCalendar() {
      return this.weeklyCalendars.find(x => x.current_week === true);
    },
    showWeeklyCalendar() {
      this.$parent.showWeeklyCalendar(this.weeklyCalendar());
    },
    hasWeeklyCalendars() {
      return this.weeklyCalendars.length > 0;
    },
    weeklyCalendar(){
      return this.weeklyCalendars.find(x => x.name === this.weeklyCalendarId);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
