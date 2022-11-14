<template>
  <div class="week-calendar-container scrollable-table-wrapper">
    <table class="responsive-table">
      <thead>
        <tr>
          <th></th>
          <th v-for="day in days" v-bind:key="day">{{day}}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row" v-for="timeBlock in timeBlocks" v-bind:key="timeBlock">
          <td class="center yellow lighten-5">{{timeBlock.description}}</td>
          <td v-for="day in days" v-bind:key="day"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'WeekCalendar',
  data() {
    return {
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      timeBlocks: {}
    }
  },
  mounted() {
    this.buildTimeBlocks();
  },
  methods: {
    buildTimeBlocks() {
      for (var i = 0; i < 24; i++) {
        var startAt = this.buildHour(i);
        var endAt = this.buildHour(i + 1);
        if(i + 1 == 24) endAt = '23:59';
        var key = `${startAt} - ${endAt}`
        this.timeBlocks[key] = {description: key, color: 'white'};
      }
    },
    buildHour(hour){
      hour = hour.toString();
      if(hour.length == 1) hour = `0${hour}`;
      hour = `${hour}:00`;
      return hour;
    }
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
