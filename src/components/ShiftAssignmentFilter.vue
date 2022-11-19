<template>
  <div className="filter-container">
    <div className="row">
      <div className="input-field col s3">
        <weekly-calendar-selector></weekly-calendar-selector>
      </div>

      <div className="input-field col s3">
        <company-selector></company-selector>
      </div>

      <div className="input-field col s3">
        <monitored-service-selector ref="monitoredServiceSelectorComponent"></monitored-service-selector>
      </div>

      <div className="input-field col s3">
        <button class="waves-effect waves-light btn teal lighten-1 right" :disabled="isBtnDisabled" @click="loadAssignments">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import WeeklyCalendarSelector from "@/components/WeeklyCalendarSelector";
import CompanySelector from "@/components/CompanySelector";
import MonitoredServiceSelector from "@/components/MonitoredServiceSelector";

export default {
  name: 'ShiftAssignmentFilter',
  components: {MonitoredServiceSelector, CompanySelector, WeeklyCalendarSelector},
  data() {
    return {
      weeklyCalendar: null,
      company: null,
      monitoredService: null,
    }
  },
  methods: {
    showWeeklyCalendar(weeklyCalendar) {
      this.weeklyCalendar = weeklyCalendar;
      this.$parent.showWeeklyCalendar(weeklyCalendar);
    },
    updateCompany(company){
      this.company = company;
      this.monitoredService = null; // Clear selected service
      this.$refs.monitoredServiceSelectorComponent.loadMonitoredServices(this.company.id);
    },
    loadAssignments(){
      this.$parent.loadAssignments(this.weeklyCalendar, this.monitoredService);
    },
  },
  computed: {
    isBtnDisabled() {
      return (this.weeklyCalendar === null || this.company === null || this.monitoredService === null);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
