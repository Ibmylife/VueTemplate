<template>
  <div>
    {{abc}}
    {{msg}}
      <button v-on:click="abcclick">click {{a}}</button>
  </div>
</template>

<script>
  export default {
    name: "ComponentC",
    data: function () {
      return {
        a:'0'
      }
    },
    props:['abc','msg'],
    methods:{
      abcclick:function () {
        this.a++;
        this.$emit('enlarge-text', this.a)
      }
    }
  }
</script>

<style scoped>

</style>
