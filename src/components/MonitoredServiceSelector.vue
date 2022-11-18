<template>
  <select id="monitored-service-select" :disabled="!hasMonitoredServices" v-model="monitoredServiceId" v-on:change="updateParentMonitoredService">
    <option value="" disabled selected>Choose Monitored Service</option>
    <option v-for="monitoredService in monitoredServices" v-bind:key="monitoredService" v-bind:value="monitoredService.id">{{monitoredService.name}}</option>
  </select>
  <label>Monitored Service</label>
</template>

<script>
import MaterializeHelper from "@/helpers/materialize-helper";
import {nextTick} from "vue";

export default {
  name: 'MonitoredServiceSelector',
  data(){
    return {
      monitoredServices: [],
      monitoredServiceId: null,
    }
  },
  mounted(){
    MaterializeHelper.initFormSelect(); // Init materialize style in all selects
  },
  methods: {
    initFormSelect(elemSelector) {
      // nexTick used to initFormSelect after load values in selectors in dom
      nextTick(() => {
        MaterializeHelper.initFormSelect(elemSelector);
      });
    },
    loadMonitoredServices(companyId) {
      var url = `/companies/${companyId}/monitored_services`;
      this.axios.get(url, {responseType: 'json'})
          .then(response => {
            this.monitoredServices = response.data;
            this.initFormSelect('#monitored-service-select');
            if(!this.hasMonitoredServices) MaterializeHelper.showAlert('No monitored services found', 'warning');
          })
          .catch(error => {
            MaterializeHelper.showAlert(`${error.message}: Can't load monitored services`, 'danger');
          });
    },
    monitoredService(){
      return this.monitoredServices.find(x => x.id === this.monitoredServiceId);
    },
    updateParentMonitoredService() {
      this.$parent.monitoredService = this.monitoredService();
    }
  },
  computed: {
    hasMonitoredServices(){
      return this.monitoredServices.length > 0;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
