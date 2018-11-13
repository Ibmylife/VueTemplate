<template>
  <div>
    <button v-for="tab in tabs" v-bind:key="tab" v-on:click="currentTab=tab">{{tab}}</button>
    <component v-bind:is="currentDec" v-bind:V="currentTab"></component>
  </div>
</template>

<script>
  import ComponentsF from "./ComponentsF";
  import ComponentsG from "./ComponentsG";
  import ComponentsH from "./ComponentsH";
  export default {
    name: "ComponentsE",
    components: {ComponentsF, ComponentsG, ComponentsH},
    data: function () {
      return {
        currentTab: 'F',
        tabs: ['F', 'G', 'H']
      }
    },
    computed: {
      currentDec: function () {
        return 'Components'+this.currentTab;
      }
    }
  }

</script>

<style scoped>

</style>
