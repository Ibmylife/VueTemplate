<template>
  <div>
    <h1>
      <center>{{firstTopic}}</center>
    </h1>
    <Divider/>
    <div style="color: #4585da;font-size: 12px;">
      <span style="margin-right: 25px;">发布时间：{{updateTime}}</span>
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
        articlesUrl: 'http://www.niejiahao.cn:8080/frontend/artcles/'
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
          this.content = res.data.object.content
          this.createTime = res.data.object.createTime
          this.firstTopic = res.data.object.firstTopic
          this.secondTopic = res.data.object.secondTopic
          this.updateTime = res.data.object.updateTime
          this.userId = res.data.object.userId
          this.$ajax({
            method: 'get',
            url: this.content,
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
