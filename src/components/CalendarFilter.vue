<template>
  <div class="filter-container">
    <form>
      <div class="row">
        <div class="input-field col s3">
          <select id="company-select" v-model="companyId" v-on:change="loadMonitoredServices">
            <!-- option with value="" is selected by default because company: '' in data() -->
            <option value="" disabled selected>Choose Company</option>
            <option v-for="company in companies" v-bind:key="company" v-bind:value="company.id">{{company.name}}</option>
          </select>
          <label>Company</label>
        </div>
        <div class="input-field col s3">
          <select id="monitored-service-select" :disabled="!hasMonitoredServices" v-model="monitoredServiceId" v-on:change="loadWeeklyMonitoringCalendars">
            <option value="" disabled selected>Choose Monitored Service</option>
            <option v-for="monitoredService in monitoredServices" v-bind:key="monitoredService" v-bind:value="monitoredService.id">{{monitoredService.name}}</option>
          </select>
          <label>Monitored Service</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import MaterializeHelper from '../helpers/materialize-helper'
import { nextTick } from 'vue'

export default {
  name: 'CalendarFilter',
  data() {
    return {
      companyId: '',
      companies: [],
      monitoredServiceId: '',
      monitoredServices: []
    }
  },
  mounted() {
    MaterializeHelper.initFormSelect(); // Init select style for all selects
    this.loadCompanies();
  },
  methods: {
    initFormSelect(elemSelector) {
      // nexTick used to initFormSelect after load values in selectors in dom
      nextTick(() => {
        MaterializeHelper.initFormSelect(elemSelector);
      });
    },
    loadCompanies() {
      this.axios.get('/companies', {responseType: 'json'})
          .then(response => {
            this.companies = response.data;
            this.initFormSelect('#company-select');
            if(!this.hasCompanies) MaterializeHelper.showAlert('No companies found');

          });
    },
    company() {
      return this.companies.find(x => parseInt(x.id) == parseInt(this.companyId));
    },
    loadMonitoredServices() {
      var url = `/companies/${this.companyId}/monitored_services`;
      this.axios.get(url, {responseType: 'json'})
          .then(response => {
            this.monitoredServices = response.data;
            this.initFormSelect('#monitored-service-select');
            if(!this.hasMonitoredServices)
              MaterializeHelper.showAlert(`No monitored services found for ${this.company().name}`, 'warning');
          });
    },
    loadWeeklyMonitoringCalendars(){

    },
  },
  computed: {
    hasCompanies() {
      return this.companies.length > 0;
    },
    hasMonitoredServices() {
      return this.monitoredServices.length > 0;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter-container {
  border: 2px solid #ef9a9a;
}

.row {
  margin-bottom: 0;
  margin-top: 20px;
}
</style>
