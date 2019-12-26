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
      // var data = {};
      var url = this.articlesUrl;
      // data['pageSize'] = this.pageSize;
      // data['pageNum'] = this.pageNum;
      // data['order'] = 'desc';
      // data['properties'] = 'createTime'
      // this.$ajax.get(url, {params: this.$qs.parse(data)}).then((response) => {
      this.$ajax.get(url).then((response) => {
        if (!response.data.successFlag) {
          this.$Message.info(response.data.message)
        }
        let contents = response.data.object.content;
        this.articles = {};
        this.articles = contents;
      }).catch((error) => {
        console.log(error)
      })
    },
    data() {
      return {
        pageSize: Global.siderbarTimePageSize,
        pageNum: Global.siderbarTimePageNum,
        articles: {},
        articlesUrl: 'http://www.niejiahao.cn:8080/frontend/artcles/time',
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
