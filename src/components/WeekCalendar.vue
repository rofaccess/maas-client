<template>
  <div class="week-calendar-container scrollable-table-wrapper">
    <table class="responsive-table">
      <thead>
        <tr>
          <th></th>
          <th class="center" v-for="detail in weeklyCalendar.details" v-bind:key="detail">{{detail.day}}<br><span class="teal-text text-lighten-1">{{detail.date}}</span></th>
        </tr>
      </thead>
      <tbody>
        <tr class="row" v-for="timeBlock in timeBlocks" v-bind:key="timeBlock">
          <td class="center yellow lighten-5">{{timeBlock.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'WeekCalendar',
  props: {
    timeBlocks: Array
  },
  data() {
    return {
      weeklyCalendar: {
        details: [
          {day: 'monday', date: ''},
          {day: 'tuesday', date: ''},
          {day: 'wednesday', date: ''},
          {day: 'thursday', date: ''},
          {day: 'friday', date: ''},
          {day: 'saturday', date: ''},
          {day: 'sunday', date: ''},
        ]
      }
    }
  },
  methods: {
    setWeeklyCalendarDates(weeklyCalendar) {
      this.weeklyCalendar = weeklyCalendar;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.week-calendar-container {
  border: 2px solid #ef9a9a;
}
th {
  text-transform: capitalize;
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
