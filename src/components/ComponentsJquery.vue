<template>
  <button class="btn btn-primary">{{a}}</button>
</template>

<script>
  $(function () {
    alert(123);
  });
  export default {
    name: "ComponentsJquery",
    data:function () {
      return{
        'a':1
      }
    }
  }
</script>

<style scoped>

</style>
