<template>
  <div>
    <Card title="分类" icon="md-funnel" :padding="0" shadow>
      <CellGroup>
        <div v-for="type in types">
          <div v-on:click="showArticle(type.typeId)">
            <Cell v-bind:title="type.typeName" v-bind:extra="type.typeName"/>
          </div>
        </div>
      </CellGroup>
    </Card>
  </div>
</template>

<script>
  import Global from '../Global'
  export default {
    name: "SidebarType",
    mounted() {
      var data = {};
      var url = this.articlesTypeUrl;
      data['pageSize'] = this.pageSize;
      data['pageNum'] = this.pageNum;
      data['order'] = 'desc';
      data['properties'] = 'updateTime'
      this.$ajax.get(url, {params: this.$qs.parse(data)}).then((response) => {//这里使用了ES6的语法
        if (!response.data.successFlag) {
          this.$Message.info(response.data.message)
        }
        let contents = response.data.object.content;
        for (var i = 0; i < contents.length; i++) {
          this.types[i] = contents[i];
        }
        this.types = contents;
        //请求成功返回的数据
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },
    data() {
      return {
        types: {},
        pageSize: Global.siderbarTypePageSize,
        pageNum: Global.siderbarTypePageNum,
        articlesTypeUrl: 'http://localhost:8080/articlesTypes'
      }
    },
    methods: {
      showArticle: function (index) {
        this.$emit('toArticleType', index);
        console.log(index)
      },
      showType: function (index) {
        console.log(index)
      },
      showDate: function (index) {
        console.log(index)
      }
    }
  }
</script>
<style scoped>

</style>
