<template>
  <div class="filter-container">
    <form>
      <div class="row">
        <div class="input-field col s3">
          <select id="company-select" v-model="companyId" v-on:change="loadMonitoredServices">
            <!-- option with value="" is selected by default because company: '' in data() -->
            <option value="" disabled selected>Choose Company</option>
            <!--
              Is unnecessary use v-for because MaterializeHelper.appendInFormSelect add companies to select and because
              MaterializeHelper.initFormSelect don't work like expected to update materialize select when companies is
              loaded.
            -->
            <!-- <option v-for="company in companies" v-bind:key="company" v-bind:value="company.id">{{company.name}}</option>-->
          </select>
          <label>Company</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import MaterializeHelper from '../helpers/materialize-helper'

export default {
  name: 'CalendarFilter',
  data() {
    return {
      companyId: '',
      companies: [],
    }
  },
  mounted() {
    this.loadCompanies();
  },
  methods: {
    loadCompanies() {
      this.axios.get('/companies', {responseType: 'json'})
          .then(response => {
            this.companies = response.data;
            this.companies.forEach(company => MaterializeHelper.appendInFormSelect(company, 'company-select'));
          });
    },
    loadMonitoredServices() {
      console.log(this.companyId)
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
