<template>
  <nav-bar></nav-bar>
  <calendar-filter></calendar-filter>
</template>

<script>
import NavBar from './components/NavBar.vue'
import CalendarFilter from "@/components/CalendarFilter";

export default {
  name: 'App',
  components: {
    CalendarFilter,
    NavBar
  }
}
</script>

<style>
</style>
