<template>
  <div id="app" style="text-align: left; padding: 10vw">
    <div>
      <div class="box">
        <h3>Week</h3>
        <DatePicker
          :minNights="7"
          :allowedRanges="[7,14,21,28,35]"
          @check-in-changed="checkInChanged"
          @check-out-changed="checkOutChanged"
        />
      </div>
      <div class="box">
        <h3>Month</h3>
        <DatePicker :minNights="30" :allowedRanges="[30,60,90,120,150]" />
      </div>
      <div class="box">
        <h3>Reset From out side</h3>
        <button @click="resetFn()">Reset</button>
        <DatePicker :isOldDayDisable="isOldDayDisable" :isReset="isReset" />
      </div>
      <div class="box">
        <h3>Select Date Range with old Date</h3>
        <DatePicker :isOldDayDisable="isOldDayDisable" />
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "@/components/DatePicker.vue";

export default {
  components: {
    DatePicker
  },

  data() {
    return {
      isOldDayDisable: false,
      name: null,
      isReset: null,
      rangeType: "week",
      ptPT: {
        night: "Noite",
        nights: "Noites",
        "day-names": ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        "check-in": "Chegada",
        "check-out": "Partida",
        "month-names": [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro"
        ]
      }
    };
  },
  methods: {
    checkInChanged(val) {
      console.log(val);
    },
    checkOutChanged(val) {
      console.log(val);
    },
    resetFn() {
      this.isReset = Number(new Date());
    }
  }
};
</script>

<style>
body,
html {
  font-family: "Source Sans Pro", sans-serif;
}

.box {
  width: 100%;
}
</style>
