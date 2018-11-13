<template>
  <div>
    <ul>
      <li v-on:click="tellparent">123</li>
    </ul>
    {{abc}}
    <br/>
    <input v-model="abc" v-on:keyup.enter="tellparent"/>
  </div>
</template>

<script>
  export default {
    name: "ComponentsA",
    data() {
      return {
        abc: '12'
      }
    },
    methods: {
      tellparent: function () {
        debugger;
        var tem=abc;
        this.abc=''
        this.$emit('childtellme',tem);

      }
    }
  }
</script>

<style scoped>

</style>
