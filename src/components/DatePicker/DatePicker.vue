<template>
  <div class="columns">
    <div class="column is-half">
      <div class="calendar">
        <div class="calendar-nav">
          <Left @click.native="previousMonthFn" />
          <div>{{month}} {{year}}</div>
          <Right @click.native="nextMonthFn" />
        </div>
        <div class="calendar-container">
          <div class="calendar-header">
            <div class="calendar-date" v-for="(day,index) in days" :key="index">{{day}}</div>
          </div>
          <div class="calendar-body">
            <Day
              v-for="(date,index) in dates"
              :key="index"
              :date="date.date"
              :belongsToThisMonth="date.belongsToThisMonth"
              :dayNumber="getDay(date.date)"
              :dayIndex="index"
              :getDate="date.getDate"
              :getMonth="date.getMonth"
              :multiSelectesDates="MultiSelectesDates"
              @mouseover.native="hoveringDate = date.date"
              @day-clicked="DayClick($event)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fecha from "fecha";

import Left from "./utill/Left";
import Right from "./utill/Right";
import Day from "./Day";

export default {
  data() {
    return {
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      year: null,
      month: null,
      dates: [],
      monthIndex: null,
      hoveringDate: null,
      MultiSelectesDates: []
    };
  },
  props: {
    mode: {
      default: "Multi",
      type: String
    }
  },
  components: {
    Left,
    Right,
    Day
  },
  mounted() {
    const d = new Date();
    this.monthIndex = d.getMonth();
    this.month = this.monthNames[d.getMonth()];
    this.year = d.getFullYear();
    this.createMonth(d);
  },
  watch: {
    monthIndex(val) {
      this.month = this.monthNames[val];
      let nextMonth = new Date(this.year, this.monthIndex, 1);
      this.createMonth(nextMonth);
    }
    // hoveringDate(val){
    // }
  },
  methods: {
    previousMonthFn() {
      if (this.monthIndex == 0) {
        this.monthIndex = 11;
        this.year = this.year - 1;
      } else {
        this.monthIndex--;
      }
    },
    nextMonthFn() {
      if (this.monthIndex == 11) {
        this.monthIndex = 0;
        this.year = this.year + 1;
      } else {
        this.monthIndex++;
      }
    },
    DayClick(event) {
      if (this.mode == "Multi") {
        if (!this.MultiSelectesDates.includes(event.date)) {
          this.MultiSelectesDates.push(event.date);
        } else {
          let removeIndex = this.MultiSelectesDates.indexOf(event.date);
          this.MultiSelectesDates.splice(removeIndex, 1);
        }
      }
    },
    createMonth(date) {
      const firstDay = this.getFirstDay(date);
      let days = [];
      for (let i = 0; i < 42; i++) {
        days.push({
          date: this.addDays(firstDay, i),
          belongsToThisMonth:
            this.addDays(firstDay, i).getMonth() === date.getMonth(),
          getDate: Number(this.getDay(this.addDays(firstDay, i))),
          getMonth: Number(this.getMonth(this.addDays(firstDay, i))),
          selected: false
        });
      }
      this.dates = days;
    },
    getFirstDay(date) {
      var firstDay = this.getFirstDayOfMonth(date);
      var offset = 0;
      return new Date(
        firstDay.setDate(firstDay.getDate() - (firstDay.getDay() - offset))
      );
    },
    getFirstDayOfMonth(date) {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    },
    addDays(date, quantity) {
      let result = new Date(date);
      result.setDate(result.getDate() + quantity);

      return result;
    },
    getDay(date) {
      return fecha.format(date, "D");
    },
    getMonth(date) {
      return fecha.format(date, "M");
    }
  }
};
</script>

<style >
.calendar {
  border: none;
  border-radius: 2px;
  display: block;
  min-width: 100%;
  text-align: center;
}
.calendar .calendar-nav {
  -webkit-align-items: center;
  align-items: center;
  background: #fff;
  color: grey;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  display: flex;
  display: -ms-flexbox;
  display: -webkit-flex;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 1.5rem;
  padding: 0.5rem;
}
.calendar .calendar-nav .calendar-nav-left,
.calendar .calendar-nav .calendar-nav-right {
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  -webkit-box-flex: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.calendar .calendar-nav .calendar-nav-left .button,
.calendar .calendar-nav .calendar-nav-right .button {
  text-decoration: none;
  color: white;
}
.calendar .calendar-nav .calendar-nav-left .button:hover,
.calendar .calendar-nav .calendar-nav-right .button:hover {
  background: transparent;
  color: #dbdbdb;
}
.calendar .calendar-nav .calendar-nav-left {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
}
.calendar .calendar-nav .calendar-nav-right {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}
.calendar .calendar-header,
.calendar .calendar-body {
  display: flex;
  display: -ms-flexbox;
  display: -webkit-flex;
  -ms-flex-pack: center;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-justify-content: center;
  justify-content: center;
  padding: 0.2rem 0;
}
.calendar .calendar-header .calendar-date,
.calendar .calendar-body .calendar-date {
  -webkit-flex: 0 0 14.28%;
  -ms-flex: 0 0 14.28%;
  flex: 0 0 14.28%;
  max-width: 14.28%;
}
.calendar .calendar-header {
  background: white;
  color: grey;
  font-size: 1rem;
}
.calendar .calendar-body {
  color: #7a7a7a;
}
.calendar .calendar-date {
  border: 0;
  padding: 0.4rem;
}
.calendar .calendar-date .date-item {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #ebebeb;
  border: 0.1rem solid transparent;
  border-radius: 10%;
  color: #4a4a4a;
  cursor: pointer;
  height: 2rem;
  /* line-height: 2rem; */
  outline: none;
  padding: 0.1rem;
  position: relative;
  font-weight: bold;
  /* font-size: 1rem; */
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;
}
.calendar .calendar-date .date-item.is-today {
  border-color: #012847;
  background-color: #012847;
  color: #fff;
}

.calendar .calendar-date .date-item.is-today {
  border-color: #012847;
  background-color: #012847;
  color: #fff;
}
/* .calendar .calendar-date .date-item:focus {
  background: #dbdbdb;
  border-color: #dbdbdb;
  color: white;
  text-decoration: none;
} */
.calendar .calendar-date .date-item:hover {
  background: #dbdbdb;
  border-color: #dbdbdb;
  color: #7a7a7a;
  text-decoration: none;
}
.calendar .calendar-date .date-item.is-active {
  background: #d0e1f0;
  border-color: #d0e1f0;
  color: #012847;
}

.calendar .calendar-range .date-item {
  background: #d0e1f0;
  border-color: #d0e1f0;
  color: #012847;
}

.calendar .calendar-date.is-disabled .date-item,
.calendar .calendar-date.is-disabled .calendar-event {
  cursor: default;
  opacity: 0.25;
  pointer-events: none;
}
.calendar .calendar-range {
  position: relative;
}
.calendar .calendar-range::before {
  background: #fff;
  content: "";
  height: 2.8rem;
  left: 0;
  position: absolute;
  right: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.calendar .calendar-range.range-start::before {
  left: 50%;
}
.calendar .calendar-range.range-end::before {
  right: 50%;
}
.calendar .calendar-range .date-item {
  color: #012847;
}
</style>