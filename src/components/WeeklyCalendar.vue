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
            <template v-for="(dayTimeBlocks, dayName) in timeBlocksAssignments" v-bind:key="(dayTimeBlocks, dayName)">
              <td class="center" :class="[dayTimeBlocks[timeBlock.name].color]" @click="updateTimeBlock($event)" :data-day="dayName" :data-time-block="timeBlock.name">{{dayTimeBlocks[timeBlock.name].employee_name}}</td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import MaterializeHelper from "@/helpers/materialize-helper";

export default {
  name: 'WeeklyCalendar',
  props: {
    timeBlocks: Array
  },
  data() {
    return {
      weeklyCalendar: this.emptyWeeklyCalendar(),
      timeBlocksAssignments: {},
      unselectedColor: 'white',
      uncoveredColor: 'red darken-1',
      selectedEmployee: null,
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
          timeBlocksAssignments[dayName][timeBlockName] = {
            id: null,
            time_block_id: timeBlock.id,
            employee_id: null,
            start_at: null,
            end_at: null,
            employee_name: null,
            employee_color: null,
            color: this.unselectedColor
          };
        }
      }
      return timeBlocksAssignments;
    },
    showWeeklyCalendar(weeklyCalendar) {
      this.weeklyCalendar = weeklyCalendar;
      this.timeBlocksAssignments = this.emptyTimeBlocksAssignments();
    },
    showTimeBlockAssignments(employee, timeBlocksAssignments) {
      this.selectedEmployee = employee;
      this.timeBlocksAssignments = this.emptyTimeBlocksAssignments(); // Clear calendar before show new data

      for (const [dayName, timeBlocks] of Object.entries(timeBlocksAssignments)) {
        for (const [timeBlockName, assignment] of Object.entries(timeBlocks)) {
          assignment.color = assignment.employee_color;
          assignment.date = this.weeklyCalendarDayDate(dayName);
          this.timeBlocksAssignments[dayName][timeBlockName] = assignment;
        }
      }
    },
    updateTimeBlock(event) {
      if(!(this.$route.path === '/employee_assignment')) return;

      var cell = event.target;
      var dayName = cell.getAttribute('data-day');
      var timeBlockName = cell.getAttribute('data-time-block');
      var assignment = this.timeBlocksAssignments[dayName][timeBlockName];

      if (this.selectedEmployee) {
        if (this.selectedEmployee.assigned_color === assignment.color) { // unselect time block
          assignment.color = this.unselectedColor;
          assignment.employee_name = "";
          assignment.employee_id = null;
        } else { // select time block
          assignment.color = this.selectedEmployee.assigned_color;
          assignment.employee_id = this.selectedEmployee.id;
          assignment.employee_name = this.selectedEmployee.name;
          assignment.date = this.weeklyCalendarDayDate(dayName);
        }
      } else {
        MaterializeHelper.showAlert('Please. Select a employee and click in Search first', 'info');
      }
    },
    weeklyCalendarDayDate(dayName) {
      return this.weeklyCalendar.days.find(x => x.name === dayName).date;
    },
    async saveAssignments() {
      if(this.selectedEmployee) {
        //var payload = this.buildTimeBlocksAssignmentsToSave();
        var payload = {
          time_block_employee_assignment: {
            items: this.buildTimeBlocksAssignmentsToSave()
          }
        }

        await this.axios.post('/time_block_employee_assignments', payload)
            .then(response => {
              MaterializeHelper.showAlert(response.data, 'success');
            })
            .catch(error => {
              MaterializeHelper.showAlert(`${error.message}: Can't save employee assignments`, 'danger');
            });
      }else {
        MaterializeHelper.showAlert('Please. Select a employee and click in Search before save', 'info');
      }
    },
    buildTimeBlocksAssignmentsToSave() {
      var timeBlocksAssignmentsToSave = []
      for (const timeBlocks of Object.values(this.timeBlocksAssignments)) {
        for (const assignment of Object.values(timeBlocks)) {
          if((assignment.id && !assignment.employee_id) || (!assignment.id && assignment.employee_id))  {
            timeBlocksAssignmentsToSave.push({
              id: assignment.id,
              time_block_id: assignment.time_block_id,
              employee_id: assignment.employee_id,
              _destroy: assignment.employee_id ? false : true,
              date: assignment.date,
            });
          }
        }
      }
      return timeBlocksAssignmentsToSave;
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
  cursor: pointer;
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
