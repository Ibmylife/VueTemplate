<template>
  <div>
    <Card title="时间" icon="md-clock" :padding="0" shadow>
      <CellGroup>
        <div v-for="article in articles">
          <div v-on:click="showArticle(article.updateTime)">
            <Cell v-bind:title="article.updateTime" v-bind:extra="article.firstTopic"/>
          </div>
        </div>
      </CellGroup>
    </Card>
  </div>
</template>

<script>
  import Global from '../Global'
  export default {
    name: "SidebarTime",
    mounted() {
      var data = {};
      var url = this.articlesUrl;
      data['pageSize'] = this.pageSize;
      data['pageNum'] = this.pageNum;
      data['order'] = 'desc';
      data['properties'] = 'updateTime'
      this.$ajax.get(url, {params: this.$qs.parse(data)}).then((response) => {//这里使用了ES6的语法
        if (!response.data.successFlag) {
          this.$Message.info(response.data.message)
        }
        let contents = response.data.object.content;
        this.articles={};
        this.articles = contents;
        //请求成功返回的数据
      }).catch((error) => {
        console.log(error)       //请求失败返回的数据
      })
    },
    data() {
      return {
        pageSize: Global.siderbarTimePageSize,
        pageNum: Global.siderbarTimePageNum,
        articles: {},
        articlesUrl: 'http://localhost:8080/artcles',
      }
    },
    methods: {
      showArticle: function (index) {
        this.$emit('toArticleTime', index);
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
