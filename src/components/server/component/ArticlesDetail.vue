<template>
  <div>
    <Row>

    </Row>
    <Row>
      <Table stripe border stripe show-header height="550" :data="tableData3" :columns="tableColumns3">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="info" size="small" @click="showArticle(index)">详情</Button>
          <Button type="primary" size="small" @click="editorArticle(index)">编辑</Button>
          <Button type="error" size="small" @click="deleteArticle(index)">删除</Button>
          <Button type="success" size="small" @click="publishArticle(index)">发布</Button>
          <Button type="success" size="small" @click="publishArticleTime(index)">定时发布</Button>
          <Button type="warning" size="small" @click="cancelArticle(index)">取消发布</Button>
        </template>
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pages.total" :current="pages.pageNum+1" :page-size="pages.pageSize"
                @on-change="changePage"></Page>
        </div>
      </div>
    </Row>
    <Modal v-model="showArticleModal" fullscreen title="文章详情">
      <h1>{{article.firstTopic}}</h1>
      <Divider/>
      <div style="color: #4585da;font-size: 12px;">
        {{article.articleId}}
        <span style="margin-right: 25px;">作者： {{article.userId}}</span>
        <span style="margin-right: 25px;">发布时间：{{article.updateTime}}</span>
        <span style="margin-right: 25px;">分类：{{article.typeId}}</span>
      </div>
      <Row>
        <Col span="23">
          <vue-markdown :source="contentHtml" style="width: 80%"></vue-markdown>
          <!--          <mavon-editor v-model="contentHtml" :editable="false" :toolbarsFlag="false" :subfield="false" :navigation="true" ref="editor" id="editor"/>-->
        </Col>
      </Row>
      <Divider/>
      <div style="color: #4585da;font-size: 12px;">
			<span style="margin-right: 25px;">标签：
			</span>
      </div>
      <div slot="footer">
        <Button type="info" size="large" @click="showArticleModal=false">确定
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Global from '../../Global'
  import VueMarkdown from 'vue-markdown';

  export default {
    name: "ArticlesDetail",
    components: {
      VueMarkdown
    },
    data() {
      return {
        dateStart: '',
        dateEnd: '',
        inputValue: '',
        pageSize: 0,
        currentPage: 1,
        tableData3: [],
        showBorder: false,
        showStripe: false,
        showHeader: true,
        showIndex: true,
        showCheckbox: false,
        fixedHeader: false,
        tableSize: 'default',
        pages: {
          pageNum: Global.commmPageNum,
          pageSize: Global.commmPageSize,
          total: 0
        },
        showArticleModal: false,
        contentHtml: '',
        article: {},
        articlesUrl: 'http://www.niejiahao.cn:8080/artcles'
      }
    },
    computed: {
      tableColumns3() {
        let columns = [];
        columns.push({
          type: 'selection',
          width: 60,
          align: 'center'
        })
        columns.push({
          type: 'index',
          width: 60,
          align: 'center'
        })
        columns.push({
          title: '一级标题',
          key: 'firstTopic',
        });
        columns.push({
          title: '浏览数',
          key: 'browerCount'
        });
        columns.push({
          title: '点赞数',
          key: 'likeCount'
        });
        columns.push({
          title: '类型',
          key: 'typeId'
        });
        columns.push({
          title: '创建时间',
          key: 'createTime',
        });
        columns.push({
          title: '修改时间',
          key: 'updateTime',
        });
        columns.push({
          title: '文章状态',
          key: 'arcticleFlag',
        });
        columns.push({
          title: '文章归属者',
          key: 'userId',
        });
        columns.push({
          title: '操作',
          slot: 'action',
          align: 'center',
          width: '200%'
        });
        return columns;
      }
    },
    methods: {
      formatDate(date) {
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
      changePage(event) {
        //分页
        // this.pages.pageNum = event;
        let data = new window.FormData();
        data.append("pageSize", this.pages.pageSize);
        data.append("pageNum", event - 1);
        let dataJson = {};
        dataJson['pageSize'] = this.pages.pageSize
        dataJson['pageNum'] = event - 1
        console.log(dataJson)
        this.showChart(dataJson);
      },
      searchDateChange: function (a, b) {
        let dates = a.toString().split(',');
        this.dateStart = dates[0];
        this.dateEnd = dates[1];
      },
      searchTextChange: function () {

      },
      showArticle: function (index) {
        console.log(this.tableData3)
        let article = this.tableData3[index];
        this.$ajax({
          method: 'get',
          url: this.articlesUrl + "/" + article.articleId,
          headers: {'Authorization': this.getToken()}
        }).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.object.message);
            return;
          }
          this.article.articleId = res.data.object.articleId
          this.article.browerCount = res.data.object.browerCount
          this.article.content = res.data.object.content
          this.article.createTime = res.data.object.createTime
          this.article.firstTopic = res.data.object.firstTopic
          this.article.likeCount = res.data.object.likeCount
          this.article.secondTopic = res.data.object.secondTopic
          this.article.typeId = res.data.object.typeId
          this.article.updateTime = res.data.object.updateTime
          this.article.userId = res.data.object.userId
          this.$ajax({
            method: 'get',
            url: this.article.content,
            headers: {'Authorization': this.getToken()}
          }).then((res) => {
            this.contentHtml = "";
            this.contentHtml = res.data;
            this.showArticleModal = true;
          }).catch((err) => {
            console.log(err);
          });
        })
      },
      deleteArticle: function (index) {
        let flag = confirm("确定删除吗");
        if (!flag) {
          return
        }
        let article = this.tableData3[index];
        this.$ajax({
          method: 'delete',
          url: this.articlesUrl + "/" + article.articleId,
          headers: {'Authorization': this.getToken()}
        }).then((res) => {
          if (res.data.successFlag) {
            this.$Message.success(res.data.message)
            let data = new window.FormData();
            data.append("pageSize", this.pages.pageSize);
            data.append("pageNum", this.pages.pageNum);
            this.showChart(data);
          } else {
            this.$Message.error(res.data.message)
          }
        }).catch((err) => {
          console.log(err);
        });
      }
      ,
      editorArticle: function (index) {
        let article = this.tableData3[index];
        let articleId = article.articleId;
        let params = {};
        params['articleId'] = articleId;
        params['articleIdFlag'] = true;
        params['eventFlag'] = false;
        params['taskFlag'] = false;
        this.$emit('toContent', params);
      }
      ,
      showChart: function (data) {
        this.$ajax({
          method: 'get',
          url: this.articlesUrl,
          params: this.$qs.parse(data),
          headers: {'Authorization': this.getToken()}
        })
          .then((res) => {
            if (!res.data.successFlag) {
              this.$Message.error(res.data.message);
              return;
            }
            this.tableData3 = res.data.object.content;
            this.pages.pageSize = res.data.object.pageSize;
            this.pages.pageNum = res.data.object.pageNum;
            this.pages.total = res.data.object.total;
          }).catch((err) => {
          console.log(err);
        });
      }
    },
    mounted: function () {
      // let data = new window.FormData();
      // data.append("pageSize", this.pages.pageSize);
      // data.append("pageNum", this.pages.pageNum);
      var data = {};
      data['pageSize'] = this.pages.pageSize;
      data['pageNum'] = this.pages.pageNum;
      data['order'] = 'desc';
      data['properties'] = 'updateTime'
      this.showChart(data);
    },
    watch: {
      'pages.pageSize': function () {
        // alert("pagesize")
      },
      'pages.pageNum': function (oldVal, newVal) {
        // alert("pageNum" + oldVal + " " + newVal)
      },
      'pages.total': function () {
        // alert("total")
      }
    }
  }
</script>

<style scoped>

</style>
