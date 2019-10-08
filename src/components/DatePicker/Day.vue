<template>
  <div class="calendar-date" :class="dayDivClass">
    <button class="date-item" :class="dayBtnclass" @click.prevent.stop="dayClicked()">{{dayNumber}}</button>
  </div>
</template>

<script>
import fecha from "fecha";

export default {
  props: {
    date: {
      type: Date
    },
    options: {
      type: Object
    },
    belongsToThisMonth: {
      type: Boolean
    },
    dayNumber: {
      type: String
    },
    getDate: {
      type: Number
    },
    getMonth: {
      type: Number
    },
    dayIndex: {
      type: Number
    },
    multiSelectesDates: {
      type: Array
    },
    singleDate: {
      type: Date
    },
    rangeDates: {
      type: Object
    },
    hoveringDate: {
      type: Date
    },
    monthIndex: {
      type: Number
    }
  },
  data() {
    return {
      isDisable: false,
      sortedDisabledDates: []
    };
  },
  watch: {
    monthIndex: {
      handler(val) {
        this.checkifDateDisable();
      },
      immediate: true
    }
  },
  computed: {
    isToday() {
      var date = this.date;
      var today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },
    dayBtnclass() {
      if (this.belongsToThisMonth) {
        if (this.options.mode == "Multi") {
          //Multi
          if (this.multiSelectesDates.length > 0) {
            let multiSelectesDates = this.multiSelectesDates;
            for (let k = 0; k < multiSelectesDates.length; k++) {
              if (this.compareDay(this.date, multiSelectesDates[k]) == 0) {
                if (this.isToday) {
                  return "is-today";
                } else {
                  return "is-today";
                }
              } else {
                if (this.isToday) {
                  return "is-today";
                }
              }
            }
          } else {
            if (this.isToday) {
              return "is-today";
            }
          }
        }
        if (this.options.mode == "Single") {
          //Single
          if (this.singleDate) {
            if (this.compareDay(this.date, this.singleDate) == 0) {
              return "is-today";
            }
            if (this.isToday) {
              return "is-today";
            }
          } else {
            if (this.isToday) {
              return "is-today";
            }
          }
        }
        if (this.options.mode == "Range") {
          if (this.rangeDates.startDate && this.rangeDates.endDate) {
            if (this.compareDay(this.date, this.rangeDates.startDate) == 0) {
              return "is-active";
            }
            if (this.compareDay(this.date, this.rangeDates.endDate) == 0) {
              return "is-active";
            }
          } else if (this.rangeDates.startDate && !this.rangeDates.endDate) {
          } else {
            if (this.isToday) {
              return "is-today";
            }
          }
        }
      } else {
        return null;
      }
    },
    dayDivClass() {
      if (this.belongsToThisMonth) {
        //Fn
        if (this.options.mode == "Range" && !this.isDisable) {
          if (this.rangeDates.startDate && this.rangeDates.endDate) {
            if (
              this.compareDay(this.date, this.rangeDates.endDate) == -1 &&
              this.compareDay(this.date, this.rangeDates.startDate) == 1
            ) {
              return "calendar-range";
            }
          } else if (this.rangeDates.startDate && !this.rangeDates.endDate) {
            //selected Range
            if (
              this.compareDay(this.date, this.rangeDates.startDate) == 1 &&
              this.compareDay(this.date, this.hoveringDate) == -1 
            ) {
                return "calendar-range";
            }

            //disable Date after cliking the startDate
            if (this.compareDay(this.date, this.rangeDates.startDate) == -1) {
              return "is-disabled";
            }
          } else {
            if (this.isToday) {
              return "is-today";
            }
          }
        } else {
          if (this.isDisable) {
            return "is-disabled";
          }
        }
      } else {
        return "is-disabled";
      }
    }
  },
  mounted() {
    this.checkifDateDisable();
    this.parseDisabledDates();
  },
  methods: {
    dayClicked() {
      let payload = {
        date: this.date
      };
      this.$emit("day-clicked", payload);
    },
    compareDay(day1, day2) {
      const date1 = fecha.format(new Date(day1), "YYYYMMDD");
      const date2 = fecha.format(new Date(day2), "YYYYMMDD");
      if (date1 > date2) {
        return 1;
      } else if (date1 == date2) {
        return 0;
      } else if (date1 < date2) {
        return -1;
      }
    },
    checkifDateDisable() {
      if (
        this.ifStartDateFn() ||
        this.ifEndDateFn() ||
        this.ifDisabledDatesFn()
      ) {
        this.isDisable = true;
      } else {
        this.isDisable = false;
      }
    },
    ifEndDateFn() {
      if (this.options.endDate) {
        if (this.compareDay(this.date, this.options.endDate) == 1) {
          return true;
        }
      } else {
        return false;
      }
    },
    ifStartDateFn() {
      if (this.compareDay(this.date, this.options.startDate) == -1) {
        return true;
      } else {
        return false;
      }
    },
    ifDisabledDatesFn() {
      let disabledDates = this.options.disabledDates;
      for (let l = 0; l < disabledDates.length; l++) {
        if (this.isDay(disabledDates[l], this.date)) {
          return true;
        }
      }
    },
    isDay(day1, day2) {
      const date1 = fecha.format(new Date(day1), "YYYYMMDD");
      const date2 = fecha.format(new Date(day2), "YYYYMMDD");
      if (date1 == date2) {
        return true;
      } else {
        return false;
      }
    },
    parseDisabledDates() {
      const sortedDates = [];
      let disabledDates = this.options.disabledDates;
      for (let l = 0; l < disabledDates.length; l++) {
        sortedDates[l] = new Date(disabledDates[l]);
      }
      sortedDates.sort((a, b) => a - b);
      this.sortedDisabledDates = sortedDates;
    }
  }
};
</script>