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
    <Page :total="pages.total" :current="pages.pageNum+1" v-on:on-change="changePageNum($event)"
          :page-size="pages.pageSize" prev-text="上一页" next-text="下一页"/>
    <!--    <Page :total="pages.total" v-on:on-change="changePageNum($event)" :current="pages.pageNum+1"-->
    <!--          :page-size="pages.pageSize" prev-text="上一页" next-text="下一页"/>-->
    <br/>
  </div>
</template>

<script>
  import Global from '../Global'
  export default {
    name: "HomeArticleList",
    mounted() {
      var data = {};
      var url = this.articlesUrl;
      data['pageSize'] = this.pages.pageSize;
      data['pageNum'] = this.pages.pageNum;
      data['order'] = 'desc';
      data['properties'] = 'updateTime'
      this.showContent(url, data);
    },
    data() {
      return {
        articles: {}
        ,
        pages: {
          pageNum: Global.commmPageNum,
          pageSize: Global.commmPageSize,
          total: 0
        },
        articlesUrl: 'http://localhost:8080/artcles'
      }
    }
    ,
    watch: {
      'pages.pageNum': function () {
        let data = {};
        let url = this.articlesUrl;
        data['pageSize'] = this.pages.pageSize;
        data['pageNum'] = this.pages.pageNum;
        data['order'] = 'desc';
        data['properties'] = 'updateTime'
        this.showContent(url, data);
      }
      ,
      'pages.pageSize': function () {
        let data = {};
        let url = this.articlesUrl;
        data['pageSize'] = this.pages.pageSize;
        data['pageNum'] = this.pages.pageNum;
        data['order'] = 'desc';
        data['properties'] = 'updateTime'
        this.showContent(url, data);
      },
      $route() {
        if (this.$route.params.time != undefined) {
          this.time = this.$route.params.time;
        }
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
        this.$ajax.get(url, {params: this.$qs.parse(data)}).then((response) => {//这里使用了ES6的语法
          if (!response.data.successFlag) {
            this.$Message.info(response.data.message)
          }
          this.pages.total = response.data.object.total;
          this.pages.pageNum = response.data.object.pageNum;
          this.pages.pageSize = response.data.object.pageSize;
          let contents = response.data.object.content;
          this.articles = {};
          this.articles = contents;
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })

      }
    }
  }
</script>

<style scoped>
  .cardStype {
    text-align: center;
    line-height: 100%;
    height: 32px;
    font-size: 32px;
  }

  .title {
    font-size: 20px;
    line-height: 30px;
  }
</style>
