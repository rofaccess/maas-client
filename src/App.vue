<template>
  <nav-bar></nav-bar>

  <router-view :timeBlocks="timeBlocks"></router-view>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import MaterializeHelper from "@/helpers/materialize-helper";

export default {
  name: 'App',
  components: { NavBar },
  data() {
    return {
      timeBlocks: []
    }
  },
  mounted() {
    this.loadTimeBlocks();
  },
  methods: {
    loadTimeBlocks() {
      this.axios.get('/time_blocks', {responseType: 'json'})
          .then(response => {
            this.timeBlocks = response.data;
            if(!this.hasTimeBlocks()) MaterializeHelper.showAlert('No time blocks found');
          })
          .catch(error => {
            MaterializeHelper.showAlert(`${error.message}: Can't load time blocks`, 'danger');
          });
    },
    hasTimeBlocks() {
      return this.timeBlocks.length > 0;
    }
  }
}
</script>

<style>
.filter-container {
  border: 2px solid #ef9a9a;
  margin-bottom: 0;
  padding-bottom: 0;
  padding-top: 20px;
}

.filter-container > .row {
  margin-bottom: 0;
}
</style>
