<template>
  <div class="filter-container">
    <div class="row">
      <div class="input-field col s3">
        <weekly-calendar-selector ref="weeklyCalendarSelectorComponent"></weekly-calendar-selector>
      </div>

      <div class="input-field col s3">
        <employee-selector ref="employeeSelectorComponent"></employee-selector>
      </div>

      <div class="input-field col s3">

      </div>

      <div class="input-field col s3">
        <button class="waves-effect waves-light btn teal lighten-1 right" :disabled="isBtnDisabled" @click="loadAssignments">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import WeeklyCalendarSelector from "@/components/WeeklyCalendarSelector";
import EmployeeSelector from "@/components/EmployeeSelector";

export default {
  name: 'EmployeeAssignmentFilter',
  components: {EmployeeSelector, WeeklyCalendarSelector},
  data() {
    return {
      weeklyCalendarId: null,
      employeeId: null
    }
  },
  methods: {
    showWeeklyCalendar(weeklyCalendar) {
      this.$parent.showWeeklyCalendar(weeklyCalendar);
    },
    loadAssignments(){
      this.$parent.loadAssignments(this.weeklyCalendarId, this.employeeId);
    }
  },
  computed: {
    isBtnDisabled() {
      return (this.weeklyCalendarId == null || this.employeeId == null);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
