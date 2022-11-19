<template>
  <shift-assignment-filter></shift-assignment-filter>
  <weekly-calendar ref="weeklyCalendarComponent" :timeBlocks="timeBlocks"></weekly-calendar>
</template>

<script>
import ShiftAssignmentFilter from "@/components/ShiftAssignmentFilter";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import MaterializeHelper from "@/helpers/materialize-helper";

export default {
  name: 'ShiftAssignment',
  components: {ShiftAssignmentFilter, WeeklyCalendar },
  props: {
    timeBlocks: Array
  },
  data() {
    return {
      weeklyCalendar: {},
      shiftAssignments: {}
    }
  },
  methods: {
    showWeeklyCalendar(weeklyCalendar) {
      this.weeklyCalendar = weeklyCalendar;
      this.$refs.weeklyCalendarComponent.showWeeklyCalendar(this.weeklyCalendar);
    },
    loadAssignments(weeklyCalendar, monitoredService){
      if(weeklyCalendar.name === this.weeklyCalendar.name){
        var url = `/shift_assignments`;
        this.axios.get(url, {params: {monitored_service_id: monitoredService.id, start_date: this.weeklyCalendar.start_date, end_date: this.weeklyCalendar.end_date}, responseType: 'json'})
            .then(response => {
              this.shiftAssignments = response.data;
              this.$refs.weeklyCalendarComponent.showShiftAssignments(monitoredService, this.shiftAssignments);
              if(this.hasShiftAssignments()) MaterializeHelper.showAlert('Shift assignments found', 'success');
              else MaterializeHelper.showAlert('No shift assignments found', 'warning');
            })
            .catch(error => {
              MaterializeHelper.showAlert(`${error.message}: Can't load shift assignments`, 'danger');
            });
      }
    },
    hasShiftAssignments() {
      return Object.keys(this.shiftAssignments).length > 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>