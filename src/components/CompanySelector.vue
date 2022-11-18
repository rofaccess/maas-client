<template>
  <select id="company-select" v-model="companyId" v-on:change="updateParentCompany">
    <option value="" disabled selected>Choose Company</option>
    <option v-for="company in companies" v-bind:key="company" v-bind:value="company.id">{{company.name}}</option>
  </select>
  <label>Company</label>
</template>

<script>
import MaterializeHelper from "@/helpers/materialize-helper";
import {nextTick} from "vue";

export default {
  name: 'CompanySelector',
  data(){
    return {
      companies: [],
      companyId: null,
    }
  },
  mounted() {
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
          })
          .catch(error => {
            MaterializeHelper.showAlert(`${error.message}: Can't load companies`, 'danger');
          });
    },
    hasCompanies(){
      return this.companies.length > 0;
    },
    company(){
      return this.companies.find(x => x.id === this.companyId);
    },
    updateParentCompany() {
      this.$parent.updateCompany(this.company())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
