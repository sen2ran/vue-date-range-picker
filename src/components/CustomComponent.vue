<template>
  <input type="text" :value="code" @input="updateCode($event.target.value)" />
</template>

<script>
export default {
  props: ["code"],
  methods : {
      updateCode(code){
          this.$emit('input',code )
      }
  }
};
</script>