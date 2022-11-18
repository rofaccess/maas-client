<template>
  <select id="employee-select" v-model="employeeId" v-on:change="updateParentEmployee">
    <option value="" disabled selected>Choose Employee</option>
    <option v-for="employee in employees" v-bind:key="employee" v-bind:value="employee.id">{{employee.name}}</option>
  </select>
  <label>Employee</label>
</template>

<script>
import MaterializeHelper from "@/helpers/materialize-helper";
import {nextTick} from "vue";

export default {
  name: 'EmployeeSelector',
  data(){
    return {
      employees: [],
      employeeId: null,
    }
  },
  mounted() {
    this.loadEmployees();
  },
  methods: {
    initFormSelect(elemSelector) {
      // nexTick used to initFormSelect after load values in selectors in dom
      nextTick(() => {
        MaterializeHelper.initFormSelect(elemSelector);
      });
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
    hasEmployees(){
      return this.employees.length > 0;
    },
    employee(){
      return this.employees.find(x => x.id === this.employeeId);
    },
    updateParentEmployee() {
      this.$parent.employee = this.employee();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
