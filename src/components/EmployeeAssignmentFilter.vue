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
        <button class="waves-effect waves-light btn teal lighten-1 right" :disabled="isBtnDisabled" @click="saveAssignments">Save</button>
        <button class="waves-effect waves-light btn teal lighten-1 right" :disabled="isBtnDisabled" @click="loadAssignments">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeSelector from "@/components/EmployeeSelector";
import WeeklyCalendarSelector from "@/components/WeeklyCalendarSelector";

export default {
  name: 'EmployeeAssignmentFilter',
  components: { WeeklyCalendarSelector, EmployeeSelector},
  data() {
    return {
      weeklyCalendar: null,
      employee: null
    }
  },
  methods: {
    showWeeklyCalendar(weeklyCalendar) {
      this.weeklyCalendar = weeklyCalendar;
      this.$parent.showWeeklyCalendar(weeklyCalendar);
    },
    loadAssignments(){
      this.$parent.loadAssignments(this.weeklyCalendar, this.employee);
    },
    saveAssignments(){
      this.$parent.saveAssignments();
    }
  },
  computed: {
    isBtnDisabled() {
      return (this.weeklyCalendar === null || this.employee === null);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn {
    margin-left: 5px;
  }
</style>
