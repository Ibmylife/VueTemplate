<template>
  <div>
    <input  v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
    <br/>
  </div>
</template>

<script>
  export default {
    name: "ComponentsD",
    data: function () {
      return {
        a: 1,
        value1: '',
        testmodel:''
      }
    },
    props: ['value'],
    methods: {
      self:function () {
        // console.log(this.value)
       this.$emit('input',new Date())
        // $emit('input', $event.target.value)
      }
    }
  }
</script>

<style scoped>

</style>
