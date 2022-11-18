<template>
  <div class="filter-container">
    <div class="row">
      <div class="input-field col s3">
        <weekly-calendar-selector></weekly-calendar-selector>
      </div>

      <div class="input-field col s3">

      </div>

      <div class="input-field col s3">

      </div>

      <div class="input-field col s3">
        <a class="waves-effect waves-light btn teal lighten-1 right">Search</a>
      </div>
    </div>
  </div>
</template>

<script>
import WeeklyCalendarSelector from "@/components/WeeklyCalendarSelector";

export default {
  name: 'ServiceAssignmentFilter',
  components: {WeeklyCalendarSelector},
  data() {
    return {

    }
  },
  methods: {
    showWeeklyCalendar(weeklyCalendar) {
      this.$parent.showWeeklyCalendar(weeklyCalendar);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
