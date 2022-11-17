<template>
  <div class="weekly-calendar-container scrollable-table-wrapper">
    <table class="responsive-table">
      <thead>
        <tr>
          <th></th>
          <th class="center" v-for="day in weeklyCalendar.days" v-bind:key="day">{{day.name}}<br><span class="teal-text text-lighten-1">{{day.date}}</span></th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="timeBlock in timeBlocks" v-bind:key="timeBlock">
        <td class="center yellow lighten-5">{{timeBlock.name}}</td>
        <td class="center" v-for="day in weeklyCalendar.days" v-bind:key="day">{{day.date}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'WeeklyCalendar',
  props: {
    weeklyCalendar: Object,
    timeBlocks: Array
  }
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
