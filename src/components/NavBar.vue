<template>
  <div class="navbar-fixed">
    <!-- Dropdown Structure -->
    <ul id="assignments-dropdown" class="dropdown-content">
      <li><router-link to="/service_assignment">Services</router-link></li>
      <li><router-link to="/employee_assignment">Employee</router-link></li>
    </ul>
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">
          <!-- Logo image obtained from: https://codepen.io/maheshambure21/pen/MWWgyyG -->
          <img alt="MaaS" src="../assets/maas-logo.png" height="56" width="205">
        </a>
        <ul class="left hide-on-med-and-down">
          <li class="active"><router-link to="/">Shifts</router-link></li>
        </ul>
        <ul class="right hide-on-med-and-down">
          <li><a class="dropdown-trigger assignments-dropdown-trigger" href="#!" data-target="assignments-dropdown">Edit Assignments<i class="material-icons right">arrow_drop_down</i></a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import MaterializeHelper from '../helpers/materialize-helper'

export default {
  name: 'NavBar',
  mounted(){
    MaterializeHelper.initDropdown('.assignments-dropdown-trigger');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .brand-logo {
    margin-top: 5px;
  }
</style>
