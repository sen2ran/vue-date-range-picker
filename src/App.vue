<template>
  <div id="app" style="text-align: left; padding: 10vw">
    <div class="box">
      <div class="columns">
        <div class="column">
          <code>
            <h3>Mode : "Single" , Multi , Range</h3>
          </code>
        </div>
        <div class="column">
          <div class="field">
            <div class="control">
              <div class="select is-primary">
                <select v-model="selcetedType">
                  <option v-for="type in types" :key="type">{{type}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <DatePicker :mode="selcetedType" />
        </div>
      </div>
    </div>
    <div class="box">
      <div class="columns">
        <div class="column">
          <code>
            <h3>Assign startDate and endDate</h3>
          </code>
        </div>
        <div class="column">
          <div class="field">
            <div class="control">
              <div class="select is-primary">
                <select v-model="selcetedType">
                  <option v-for="type in types" :key="type">{{type}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <DatePicker :mode="selcetedType" :startDate="startDate" :endDate="endDate" />
        </div>
      </div>
    </div>
    <div class="box">
      <div class="columns">
        <div class="column">
          <code>
            <h3>Assign Disable Dates</h3>
          </code>
        </div>
        <div class="column">
          <div class="field">
            <div class="control">
              <div class="select is-primary">
                <select v-model="selcetedType">
                  <option v-for="type in types" :key="type">{{type}}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <DatePicker :mode="selcetedType" :disabledDates="disabledDates" />
        </div>
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
      //example
      types: ["Single", "Multi", "Range"],
      selcetedType: "Range",

      endDate: new Date(2019, 11, 15),
      startDate: new Date(2019, 9, 3),
      disabledDates: [
        new Date(2019, 9, 25),
        new Date(2019, 9, 22),
        new Date(2019, 9, 14),
        new Date(2019, 9, 24),
        new Date(2019, 10, 19)
      ]
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
