<template>
  <weekly-calendar :timeBlocks="timeBlocks"></weekly-calendar>
</template>

<script>
import WeeklyCalendar from "@/components/WeeklyCalendar";
export default {
  name: 'ServiceAssignment',
  components: {WeeklyCalendar},
  props: {
    timeBlocks: Array
  }
}
</script>

