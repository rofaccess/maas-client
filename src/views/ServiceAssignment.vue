<template>
  <week-calendar :timeBlocks="timeBlocks"></week-calendar>
</template>

<script>
import WeekCalendar from "@/components/WeekCalendar";
export default {
  name: 'ServiceAssignment',
  components: {WeekCalendar},
  props: {
    timeBlocks: Array
  }
}
</script>

