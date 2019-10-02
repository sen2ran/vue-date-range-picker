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
        if (this.multiSelectesDates.length > 0) {
          let multiSelectesDates = this.multiSelectesDates;
          if (multiSelectesDates.includes(this.date)) {
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
          // for (let k = 0; k < multiSelectesDates.length; k++) {
          //   if (this.compareDay(this.date, multiSelectesDates[k]) == 0) {
          //     if (this.isToday) {
          //       return "is-today";
          //     } else {
          //       return "is-today";
          //     }
          //   } else {
          //     if (this.isToday) {
          //       return "is-today";
          //     }
          //   }
          // }
        }
      } else {
        return null;
      }
    },
    dayDivClass() {
      if (this.belongsToThisMonth) {
        //Fn
      } else {
        return "is-disabled";
      }
    }
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
    }
  }
};
</script>