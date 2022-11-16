<template>
  <shift-assignment-filter></shift-assignment-filter>
  <weekly-calendar :timeBlocks="timeBlocks"></weekly-calendar>
</template>

<script>
import ShiftAssignmentFilter from "@/components/ShiftAssignmentFilter";
import WeeklyCalendar from "@/components/WeeklyCalendar";

export default {
  name: 'ShiftAssignment',
  components: {WeeklyCalendar, ShiftAssignmentFilter},
  props: {
    timeBlocks: Array
  }
}
</script>
