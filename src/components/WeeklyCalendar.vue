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
        <template v-for="timeBlock in timeBlocks" v-bind:key="timeBlock">
          <tr>
            <td class="center yellow lighten-5">{{timeBlock.name}}</td>
            <template v-for="(dayTimeBlocks, day) in timeBlocksAssignments" v-bind:key="(dayTimeBlocks, day)">
              <td class="center" :class="[dayTimeBlocks[timeBlock.name].color]">{{dayTimeBlocks[timeBlock.name].employee_name}}</td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'WeeklyCalendar',
  props: {
    timeBlocks: Array
  },
  data() {
    return {
      weeklyCalendar: this.emptyWeeklyCalendar(),
      timeBlocksAssignments: {}
    }
  },
  methods: {
    emptyWeeklyCalendar() {
      return {
        days: [
          {name: 'monday', date: ''},
          {name: 'tuesday', date: ''},
          {name: 'wednesday', date: ''},
          {name: 'thursday', date: ''},
          {name: 'friday', date: ''},
          {name: 'saturday', date: ''},
          {name: 'sunday', date: ''},
        ]
      }
    },
    emptyTimeBlocksAssignments() {
      var day;
      var timeBlocksAssignments = {};
      for (day of this.emptyWeeklyCalendar().days) {
        var dayName = day.name;
        var timeBlock;
        for (timeBlock of this.timeBlocks) {
          var timeBlockName = timeBlock.name;
          if(timeBlocksAssignments[dayName] === undefined){
            timeBlocksAssignments[dayName] = {};
          }
          timeBlocksAssignments[dayName][timeBlockName] = {color: 'white'}
        }
      }
      return timeBlocksAssignments;
    },
    showWeeklyCalendar(weeklyCalendar) {
      this.weeklyCalendar = weeklyCalendar;
      this.timeBlocksAssignments = this.emptyTimeBlocksAssignments();
    },
    showTimeBlockAssignments(timeBlocksAssignments) {
      this.timeBlocksAssignments = this.emptyTimeBlocksAssignments(); // Clear calendar before show new data

      for (const [dayName, timeBlocks] of Object.entries(timeBlocksAssignments)) {
        for (const [timeBlockName, assignment] of Object.entries(timeBlocks)) {
          this.timeBlocksAssignments[dayName][timeBlockName] = assignment;
        }
      }
    }
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
  color: gray;
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
