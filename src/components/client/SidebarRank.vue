<template>
  <div>
    <Card title="阅读量排行" icon="md-flag" :padding="0" shadow>
      <CellGroup>
        <div v-for="article in articles">
          <div v-on:click="showArticle(article.articleId)">
            <Cell v-bind:title="article.firstTopic" v-bind:extra="article.firstTopic"/>
          </div>

        </div>
      </CellGroup>
    </Card>
  </div>
</template>

<script>
  import Global from '../Global'

  export default {
    name: "SidebarRank",
    mounted() {
      var data = {};
      var url = this.articlesUrl;
      data['pageSize'] = this.pageSize;
      data['pageNum'] = this.pageNum;
      data['order'] = 'desc';
      data['properties'] = 'browerCount'
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
        articles: {},
        pageSize: Global.siderbarRankPageSize,
        pageNum: Global.siderbarRankPageNum,
        articlesUrl: 'http://www.niejiahao.cn:8080/artcles'
      }
    },
    methods: {
      showArticle: function (index) {
        this.$emit('toArticleRank', index);
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
