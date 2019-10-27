<template>
  <Breadcrumb :style="{margin: '16px 0'}">
    <BreadcrumbItem>{{navigationUrl.home}}</BreadcrumbItem>
    <BreadcrumbItem>{{navigationUrl.components}}</BreadcrumbItem>
    <BreadcrumbItem>{{navigationUrl.layout}}</BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
  export default {
    name: "BreadcrumbNavigation",
    props: ['navigationUrl'],
    data() {
      return {
        // navigationUrl: {
        //   home: '管理后台',
        //   components: '主页',
        //   layout: '详情'
        // },
      }
    },
    methods: {
      click: function () {
        this.$emit('toOtherPages', index);
      }
    }
  }
</script>

<style scoped>

</style>
