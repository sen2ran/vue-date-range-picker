<template>
  <div id="app" style="text-align: left; padding: 10vw">
    <div>
      <div class="box">
        <DatePicker  />
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "@/components/DatePicker/DatePicker.vue";

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
