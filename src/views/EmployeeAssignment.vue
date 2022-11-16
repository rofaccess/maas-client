<template>
  <div class="filter-container">
    <form>
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
          <a class="waves-effect waves-light btn teal lighten-1 right">Update</a>
          <a class="waves-effect waves-light btn teal lighten-1 right">Search</a>
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
      weeklyCalendarId: {},
      employeeId: '',
      employees: [],
    }
  },
  mounted() {
    MaterializeHelper.initFormSelect(); // Init select style for all selects
    this.loadEmployees();
    this.loadWeeklyCalendars();
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
      return this.weeklyCalendars.find(x => x.name == this.weeklyCalendarId);
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

    },
  },
  computed: {
    hasEmployees(){
      return this.employees.length > 0;
    },
    hasWeeklyCalendars(){
      return this.weeklyCalendars.length > 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn {
    margin-left: 5px;
  }
</style>