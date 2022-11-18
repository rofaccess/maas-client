<template>
  <service-assignment-filter></service-assignment-filter>
  <weekly-calendar ref="weeklyCalendarComponent" :timeBlocks="timeBlocks"></weekly-calendar>
</template>

<script>
import ServiceAssignmentFilter from "@/components/ServiceAssignmentFilter";
import WeeklyCalendar from "@/components/WeeklyCalendar";

export default {
  name: 'ServiceAssignment',
  components: {ServiceAssignmentFilter, WeeklyCalendar },
  props: {
    timeBlocks: Array
  },
  data() {
    return {
      weeklyCalendar: {}
    }
  },
  methods: {
    showWeeklyCalendar(weeklyCalendar) {
      this.weeklyCalendar = weeklyCalendar;
      this.$refs.weeklyCalendarComponent.showWeeklyCalendar(this.weeklyCalendar);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
