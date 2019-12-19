<template>
  <div>
    <h1>
      <center>{{firstTopic}}</center>
    </h1>
    <Divider/>
    <div style="color: #4585da;font-size: 12px;">
      <!--<span style="margin-right: 25px;">作者： {{userId}}</span>-->
      <span style="margin-right: 25px;">发布时间：{{updateTime}}</span>
      <!--<span style="margin-right: 25px;">分类：{{typeId}}</span>-->
    </div>
    <Row>
      <Col span="23">
        <vue-markdown :source="contentHtml" style="width: 80%"></vue-markdown>
      </Col>
    </Row>
    <Divider/>
    <div style="color: #4585da;font-size: 12px;">
			<span style="margin-right: 25px;">标签：
			</span>
    </div>
  </div>
</template>
<script>
  import VueMarkdown from 'vue-markdown';

  export default {
    components: {
      VueMarkdown
    },
    data() {
      return {
        articleId: "",
        browerCount: 0,
        content: "",
        contentHtml: "",
        createTime: "",
        firstTopic: "",
        likeCount: 0,
        secondTopic: "",
        typeId: "",
        updateTime: "",
        userId: "",
        articlesUrl: 'http://www.niejiahao.cn:8080/artcles/'
      }
    },
    mounted() {
      this.contentHtml = ''
      this.articleInfo();
    },
    watch: {
      $route() {
        if (this.$route.params.id != undefined) {
          this.articleId = this.$route.params.id
        }
      },
      articleId: function () {
        this.articleInfo();
      }
    },
    methods: {
      articleInfo: function () {
        this.contentHtml = '';
        //加载主页面
        this.$ajax({
          method: 'get',
          url: this.articlesUrl + this.$route.params.id
        }).then((res) => {
          // this.articleId = res.data.object.articleId
          // this.browerCount = res.data.object.browerCount
          this.content = res.data.object.content
          this.createTime = res.data.object.createTime
          this.firstTopic = res.data.object.firstTopic
          // this.likeCount = res.data.object.likeCount
          this.secondTopic = res.data.object.secondTopic
          // this.typeId = res.data.object.typeId
          // this.updateTime = res.data.object.updateTime
          this.updateTime = res.data.object.updateTime
          this.userId = res.data.object.userId
          this.$ajax({
            method: 'get',
            url: this.content,
            // url: '/rest/file/file/' + this.content,
            // url: 'http://localhost:8769/rest/file/file/4972fe16-64cf-4243-8913-93d5d0115897HELP.md',
          }).then((res) => {
            this.contentHtml = res.data;
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }
</script>
<style>

</style>
