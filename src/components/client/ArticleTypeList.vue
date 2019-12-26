<template>
  <div>
    <div v-for="article in articles">
      <div v-on:click="showDetail(article.articleId)">
        <Card :bordered="false">
          <p slot="title" class="cardStype">{{article.firstTopic}}</p>
          <Row class="title">
            {{article.secondTopic}}
          </Row>
          <Row>
            <Col span="3">
              <Icon type="ios-person"/>
              {{article.userId}}
            </Col>
            <Col span="2"></Col>
            <Col span="4">
              <Icon type="ios-time-outline"/>
              {{article.updateTime}}
            </Col>
            <Col span="2"></Col>
            <Col span="3">
              <Icon type="ios-folder-outline"/>
              {{article.typeId}}
            </Col>
            <Col span="2"></Col>
            <Col span="3">
              <Icon type="ios-happy"/>
              {{article.likeCount}}
            </Col>
            <Col span="2"></Col>
            <Col span="3">
              <Icon type="ios-glasses-outline"/>
              {{article.secondTopic}}
            </Col>
          </Row>
        </Card>
      </div>
      <br/>
    </div>
    <Page :total="pages.total" v-on:on-change="changePageNum($event)" :current="pages.pageNum+1"
          :page-size="pages.pageSize" prev-text="上一页" next-text="下一页"/>
    <br/>
  </div>
</template>

<script>
  export default {
    name: "ArticleTypeList",
    mounted() {
      var data = {};
      var url = 'http://www.niejiahao.cn:8080/frontend/artcles/type';
      data['pageSize'] = this.pages.pageSize;
      data['pageNum'] = this.pages.pageNum;
      data['type'] = this.type;
      data['order'] = 'desc';
      data['properties'] = 'updateTime';
      this.showContent(url, data);
    },
    data() {
      return {
        info: null
        ,
        articles: {}
        ,
        pages: {
          pageNum: 0,
          pageSize: 5,
          total: 0
        },
        type: this.$route.params.type,
      }
    }
    ,
    watch: {
      'pages.pageNum': function () {
        let data = {};
        let url = 'http://www.niejiahao.cn:8080/frontend/artcles/type';
        data['pageSize'] = this.pages.pageSize;
        data['pageNum'] = this.pages.pageNum;
        data['type'] = this.type;
        data['order'] = 'desc';
        data['properties'] = 'updateTime'
        this.showContent(url, data);
      }
      ,
      type: function () {
        let data = {};
        let url = 'http://www.niejiahao.cn:8080/frontend/artcles/type';
        data['pageSize'] = this.pages.pageSize;
        data['pageNum'] = this.pages.pageNum;
        data['type'] = this.type;
        data['order'] = 'desc';
        data['properties'] = 'updateTime'
        this.showContent(url, data);
      },
      $route() {
        if (this.$route.params.type != undefined) {
          this.type = this.$route.params.type;
        }
      },
    }
    ,
    methods: {
      changePageNum: function (event) {
        this.pages.pageNum = event - 1;
      },
      showDetail: function (index) {
        this.$emit('toArticle', index);
      },
      isEmpty: function (obj) {
        // 检验 undefined 和 null
        if (!obj && obj !== 0 && obj !== '') {
          return true;
        }
        if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
          return true;
        }
        if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
          return true;
        }
        return false;
      },
      showContent: function (url, data) {
        this.$ajax({
          method: 'get',
          url: url,
          params: data
        }).then((response) => {
          if (!response.data.successFlag) {
            this.$Message.error(response.data.message);
            alert(response.data.message)
            return;
          }
          this.pages.total = response.data.object.total;
          this.pages.pageNum = response.data.object.pageNum;
          this.pages.pageSize = response.data.object.pageSize;
          let contents = response.data.object.content;
          this.articles = {};
          this.articles = contents;
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
