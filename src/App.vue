<template>
  <nav-bar></nav-bar>

  <div class="row filter-container">
    <weekly-calendar-selector ref="weeklyCalendarSelectorComponent" :weeklyCalendars="weeklyCalendars"></weekly-calendar-selector>
  </div>

  <router-view v-slot="{ Component }" :selectedWeeklyCalendar="selectedWeeklyCalendar" :timeBlocks="timeBlocks">
    <component ref="routerViewComponent" :is="Component" />
  </router-view>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import WeeklyCalendarSelector from "@/components/WeeklyCalendarSelector";
import MaterializeHelper from "@/helpers/materialize-helper";
import {nextTick} from "vue";

export default {
  name: 'App',
  components: {WeeklyCalendarSelector, NavBar },
  data() {
    return {
      selectedWeeklyCalendar: {},
      weeklyCalendars: [],
      timeBlocks: []
    }
  },
  mounted() {
    MaterializeHelper.initFormSelect(); // Init select style for all selects
    this.loadWeeklyCalendars();
    this.loadTimeBlocks();
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
            this.showWeeklyCalendar(this.currentWeeklyCalendar());
            this.initFormSelect('#weekly-calendar-select');

            if(!this.hasWeeklyCalendars()) MaterializeHelper.showAlert('No weekly calendars found');
          })
          .catch(error => {
            MaterializeHelper.showAlert(`${error.message}: Can't load weekly calendars`, 'danger');
          });
    },
    hasWeeklyCalendars() {
      return this.weeklyCalendars.length > 0;
    },
    showWeeklyCalendar(weeklyCalendar) {
      this.selectedWeeklyCalendar = weeklyCalendar
      this.$refs.weeklyCalendarSelectorComponent.selectWeeklyCalendar(this.selectedWeeklyCalendar);
      this.$refs.routerViewComponent.updateWeeklyCalendar(this.selectedWeeklyCalendar);
    },
    currentWeeklyCalendar() {
      return this.weeklyCalendars.find(x => x.current_week === true);
    },
    loadTimeBlocks() {
      this.axios.get('/time_blocks', {responseType: 'json'})
          .then(response => {
            this.timeBlocks = response.data;
            if(!this.hasTimeBlocks()) MaterializeHelper.showAlert('No time blocks found');
          })
          .catch(error => {
            MaterializeHelper.showAlert(`${error.message}: Can't load time blocks`, 'danger');
          });
    },
    hasTimeBlocks() {
      return this.timeBlocks.length > 0;
    }
  }
}
</script>

<style>
.filter-container {
  border: 2px solid #ef9a9a;
  padding-bottom: 0;
  padding-top: 20px;
}
</style>
