<template>
  <weekly-calendar ref="weeklyCalendarComponent" :weeklyCalendar="weeklyCalendar" :timeBlocks="timeBlocks"></weekly-calendar>
</template>

<script>
import WeeklyCalendar from "@/components/WeeklyCalendar";
import UtilHelper from "@/helpers/util-helper";

export default {
  name: 'ShiftAssignment',
  components: { WeeklyCalendar },
  props: {
    selectedWeeklyCalendar: Object,
    timeBlocks: Array
  },
  data() {
    return {
      weeklyCalendar: UtilHelper.deepClone(this.selectedWeeklyCalendar)
    }
  },
  methods: {
    updateWeeklyCalendar(weeklyCalendar) {
      this.weeklyCalendar = weeklyCalendar;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>