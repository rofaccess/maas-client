<template>
  <shift-assignment-filter></shift-assignment-filter>
  <weekly-calendar ref="weeklyCalendarComponent" :timeBlocks="timeBlocks"></weekly-calendar>
</template>

<script>
import ShiftAssignmentFilter from "@/components/ShiftAssignmentFilter";
import WeeklyCalendar from "@/components/WeeklyCalendar";

export default {
  name: 'ShiftAssignment',
  components: {ShiftAssignmentFilter, WeeklyCalendar },
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