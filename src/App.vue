<template>
  <nav-bar></nav-bar>
  <calendar-filter></calendar-filter>
  <week-calendar></week-calendar>
</template>

<script>
import NavBar from './components/NavBar.vue'
import CalendarFilter from "@/components/CalendarFilter";
import WeekCalendar from "@/components/WeekCalendar";

export default {
  name: 'App',
  components: {
    WeekCalendar,
    CalendarFilter,
    NavBar
  }
}
</script>

<style>
</style>
