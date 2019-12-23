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
      this.$ajax.get(url, {params: this.$qs.parse(data)}).then((response) => {
        if (!response.data.successFlag) {
          this.$Message.info(response.data.message)
        }
        let contents = response.data.object.content;
        this.articles={};
        this.articles = contents;
      }).catch((error) => {
        console.log(error)
      })
    },
    data() {
      return {
        articles: {},
        pageSize: Global.siderbarRankPageSize,
        pageNum: Global.siderbarRankPageNum,
        articlesUrl: 'http://www.niejiahao.cn:8080/frontend/artcles'
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
