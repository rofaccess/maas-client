<template>
  <shift-assignment-filter></shift-assignment-filter>
  <week-calendar :timeBlocks="timeBlocks"></week-calendar>
</template>

<script>
import ShiftAssignmentFilter from "@/components/ShiftAssignmentFilter";
import WeekCalendar from "@/components/WeekCalendar";

export default {
  name: 'ShiftAssignment',
  components: {WeekCalendar, ShiftAssignmentFilter},
  props: {
    timeBlocks: Array
  }
}
</script>