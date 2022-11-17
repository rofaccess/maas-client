<template>
  <div class="weekly-calendar-container scrollable-table-wrapper">
    <table class="responsive-table">
      <thead>
      </thead>
      <tbody>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'WeeklyCalendar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weekly-calendar-container {
  border: 2px solid #ef9a9a;
}
th {
  text-transform: capitalize;
}

td {
  border-right: 1px solid lightgray;
}

/* From: https://stackoverflow.com/questions/23989463/how-to-set-tbody-height-with-overflow-scroll */
div.scrollable-table-wrapper{
  /* To scroll */
  height: 100vh; /* With 100vh show two scroll, try fix this more forward */
  overflow: scroll;
}

div.scrollable-table-wrapper thead tr th{
  /* To fixed header in scroll */
  background-color: white;
  position: sticky;
  top: 0;
}
</style>
