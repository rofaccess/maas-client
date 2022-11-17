<template>
  <div class="navbar-fixed">
    <!-- Dropdown Structure -->
    <ul id="assignments-dropdown" class="dropdown-content">
      <li :class="{'active': ['/service_assignment'].includes($route.path)}"><router-link to="/service_assignment">Services</router-link></li>
      <li :class="{'active': ['/employee_assignment'].includes($route.path)}"><router-link to="/employee_assignment">Employee</router-link></li>
    </ul>
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">
          <!-- Logo image obtained from: https://codepen.io/maheshambure21/pen/MWWgyyG -->
          <img alt="MaaS" src="../assets/maas-logo.png" height="56" width="205">
        </a>
        <ul class="left hide-on-med-and-down">
          <li :class="{'active': ['/'].includes($route.path)}"><router-link to="/">Shifts</router-link></li>
          <li class="view-title">{{ $route.meta.viewTitle }}</li>
        </ul>
        <ul class="right hide-on-med-and-down">
          <li :class="{'active': ['/service_assignment', '/employee_assignment'].includes($route.path)}"><a class="dropdown-trigger assignments-dropdown-trigger" href="#!" data-target="assignments-dropdown">Edit Assignments<i class="material-icons right">arrow_drop_down</i></a></li>
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

  .view-title {
    color: antiquewhite;
    font-size: 18px;
    font-style: italic;
    font-weight: bold;
    margin-left: 20px;
  }
</style>
