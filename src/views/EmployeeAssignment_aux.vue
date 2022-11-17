<template>
  <div class="filter-container">
    <form @submit.prevent>
      <div class="row">
        <div class="input-field col s3">
          <select id="weekly-calendar-select" v-model="weeklyCalendarId" v-on:change="setWeeklyCalendar">
            <option value="" disabled selected>Choose Weekly Calendar</option>
            <option v-for="weeklyCalendar in weeklyCalendars" v-bind:key="weeklyCalendar" v-bind:value="weeklyCalendar.name">{{weeklyCalendar.name}}</option>
          </select>
          <label>Weekly Calendar</label>
        </div>

        <div class="input-field col s3">
          <select id="employee-select" v-model="employeeId">
            <option value="" disabled selected>Choose Employee</option>
            <option v-for="employee in employees" v-bind:key="employee" v-bind:value="employee.id">{{employee.name}}</option>
          </select>
          <label>Employee</label>
        </div>

        <div class="input-field col s6">
          <button type="submit" class="waves-effect waves-light btn teal lighten-1 right" :disabled="false">Update</button>
          <button type="submit" class="waves-effect waves-light btn teal lighten-1 right" :disabled="isBtnDisabled" @click="loadAssignments">Search</button>
        </div>
      </div>
    </form>
  </div>

  <!-- Set a reference to component in ref -->
  <weekly-calendar ref="weeklyCalendarComponent" :timeBlocks="timeBlocks"></weekly-calendar>
</template>

<script>
import WeeklyCalendar from "@/components/WeeklyCalendar";
import MaterializeHelper from "@/helpers/materialize-helper";
import {nextTick} from "vue";

export default {
  name: 'EmployeeAssignment',
  components: {WeeklyCalendar},
  props: {
    timeBlocks: Array
  },
  data() {
    return {
      weeklyCalendars: [],
      weeklyCalendarId: null,
      employeeId: null,
      employees: [],
      timeBlockEmployeeAssignments: null
    }
  },
  mounted() {
    MaterializeHelper.initFormSelect(); // Init select style for all selects
    this.loadWeeklyCalendars();
    this.loadEmployees();
  },
  methods: {
    initFormSelect(elemSelector) {
      // nexTick used to initFormSelect after load values in selectors in dom
      nextTick(() => {
        MaterializeHelper.initFormSelect(elemSelector);
      });
    },
    loadWeeklyCalendars() {
      this.axios.get('/weekly_calendars', {responseType: 'json'})
          .then(response => {
            this.weeklyCalendars = response.data;
            this.initFormSelect('#weekly-calendar-select');
            if(!this.hasWeeklyCalendars) MaterializeHelper.showAlert('No weekly calendars found');
          })
          .catch(error => {
            MaterializeHelper.showAlert(`${error.message}: Can't load weekly calendars`, 'danger');
          });
    },
    weeklyCalendar() {
      return this.weeklyCalendars[this.weeklyCalendarId];
    },
    setWeeklyCalendar() {
      this.$refs.weeklyCalendarComponent.setWeeklyCalendar(this.weeklyCalendar());
    },
    loadEmployees() {
      this.axios.get('/employees', {responseType: 'json'})
          .then(response => {
            this.employees = response.data;
            this.initFormSelect('#employee-select');
            if(!this.hasEmployees) MaterializeHelper.showAlert('No employees found');
          })
          .catch(error => {
            MaterializeHelper.showAlert(`${error.message}: Can't load employees`, 'danger');
          });
    },
    loadAssignments(){
      this.axios.get('/time_block_employee_assignments', {params: {employee_id: this.employeeId}, responseType: 'json'})
          .then(response => {
            this.timeBlockEmployeeAssignments = response.data;
            this.$refs.weeklyCalendarComponent.setTimeBlockEmployeeAssignments(this.timeBlockEmployeeAssignments);
            if(!this.hasTimeBlockEmployeeAssignments) MaterializeHelper.showAlert('No assignments found');
          })
          .catch(error => {
            MaterializeHelper.showAlert(`${error.message}: Can't load assignments`, 'danger');
          });
    },
  },
  computed: {
    hasEmployees(){
      return this.employees.length > 0;
    },
    hasWeeklyCalendars(){
      return this.weeklyCalendars.length > 0;
    },
    hasTimeBlockEmployeeAssignments(){
      return this.timeBlockEmployeeAssignments.length > 0;
    },
    isBtnDisabled(){
      return (this.employeeId == null || this.weeklyCalendarId == null);
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