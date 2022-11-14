<template>
  <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo center">
          <!-- Logo image obtained from: https://codepen.io/maheshambure21/pen/MWWgyyG -->
          <img alt="MaaS" src="../assets/maas-logo.png" height="56" width="205">
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li><a href="companies.html">Companies</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .brand-logo {
    margin-top: 5px;
  }
</style>
