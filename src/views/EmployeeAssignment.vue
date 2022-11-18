<template>
  <employee-assignment-filter></employee-assignment-filter>
  <weekly-calendar ref="weeklyCalendarComponent" :timeBlocks="timeBlocks"></weekly-calendar>
</template>

<script>
import WeeklyCalendar from "@/components/WeeklyCalendar";
import EmployeeAssignmentFilter from "@/components/EmployeeAssignmentFilter";
import MaterializeHelper from "@/helpers/materialize-helper";

export default {
  name: 'EmployeeAssignment',
  components: {EmployeeAssignmentFilter, WeeklyCalendar },
  props: {
    timeBlocks: Array
  },
  data() {
    return {
      weeklyCalendar: {},
      timeBlocksAssignments: {}
    }
  },
  methods: {
    showWeeklyCalendar(weeklyCalendar) {
      this.weeklyCalendar = weeklyCalendar;
      this.$refs.weeklyCalendarComponent.showWeeklyCalendar(this.weeklyCalendar);
    },
    loadAssignments(weeklyCalendar, employee){
      if(weeklyCalendar.name === this.weeklyCalendar.name){
        var url = `/employees/${employee.id}/assignments`;
        this.axios.get(url, {params: {start_date: this.weeklyCalendar.start_date, end_date: this.weeklyCalendar.end_date}, responseType: 'json'})
            .then(response => {
              this.timeBlocksAssignments = response.data;
              this.$refs.weeklyCalendarComponent.showTimeBlockAssignments(employee, this.timeBlocksAssignments);
              if(this.hasTimeBlocksAssignments()) MaterializeHelper.showAlert('Assignments found', 'success');
              else MaterializeHelper.showAlert('No assignments found', 'warning');
            })
            .catch(error => {
              MaterializeHelper.showAlert(`${error.message}: Can't load assignments`, 'danger');
            });
      }
    },
    hasTimeBlocksAssignments() {
      return Object.keys(this.timeBlocksAssignments).length > 0;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>