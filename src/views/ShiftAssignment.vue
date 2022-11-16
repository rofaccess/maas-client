<template>
  <shift-assignment-filter></shift-assignment-filter>
  <week-calendar></week-calendar>
</template>

<script>
import ShiftAssignmentFilter from "@/components/ShiftAssignmentFilter";
import WeekCalendar from "@/components/WeekCalendar";

export default {
  name: 'ShiftAssignment',
  components: {WeekCalendar, ShiftAssignmentFilter}
}
</script>