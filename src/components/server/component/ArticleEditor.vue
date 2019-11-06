<template>
  <div>
    <Divider></Divider>
    <Row>
      <Input v-model="article.firstTopic" icon="ios-clock-outline" placeholder="一级标题"/>
    </Row>
    <Divider></Divider>
    <Row>
      <Col span="19">
        <!--<mavon-editor v-model="value" @imgAdd='editorUpdataImgs' @change="$change" ref="editor" id="editor" @imgDel="$imgDel"/>-->
        <mavon-editor v-model="value" @change="$change" @imgAdd="$imgAdd" @imgDel="$imgDel" ref="editor" id="editor"/>
      </Col>
      <Col span="5">
        <Row>
          <Card>
            <p slot="title">
              <Icon type="ios-film-outline"></Icon>
              文章发布
            </p>
            <Row>
              <Input v-model="article.secondTopic" icon="ios-clock-outline" type="textarea" placeholder="二级标题"
                     style="height: 100%"/>
            </Row>
            <Divider/>
<!--            <Row>-->
<!--              <RadioGroup v-model="vertical" vertical>-->
<!--                <Radio label="comment" default>-->
<!--                  <Icon type="social-apple"></Icon>-->
<!--                  <span>开启评论</span>-->
<!--                </Radio>-->
<!--                <Radio label="uncomment">-->
<!--                  <Icon type="social-android"></Icon>-->
<!--                  <span>关闭评论</span>-->
<!--                </Radio>-->
<!--                <Divider/>-->
<!--                <Button type="primary" @click="saveToEditor">保存草稿</Button>-->
<!--                <Button type="primary" style="margin-left: 60px;" @click="publishArticle">发布</Button>-->
<!--              </RadioGroup>-->
<!--            </Row>-->
<!--            <Divider/>-->
            <Row>
              <Col span="4">
                发布时间:
              </Col>
              <Col span="20">
                <Input v-model="cronTimeStrTemp" icon="ios-clock-outline" placeholder="请输入CRON表达式" @on-blur="judge"/>
              </Col>
            </Row>
            <Divider/>
            <Row>
              <Col span="4">
                距离时间:
              </Col>
              <Col span="20">
                <Progress :percent="cronTime" status="active"/>
              </Col>
            </Row>
            <Divider/>
            <Row>
              <Col span="4">
                类别:
              </Col>
              <Col span="20">
                <Select v-model="article.typeId" filterable clearable :loading="loading" loading-text="请稍后"
                        placeholder="root"
                        size="small">
                  <Option v-for="type in articleTypes" :value="type.typeId" :key="type.typeName">{{ type.typeName}}
                  </Option>
                </Select>
              </Col>
            </Row>
            <Divider/>
          </Card>
        </Row>
      </Col>
    </Row>
  </div>
</template>

<script>
  import Global from '../../Global'
  export default {
    name: "ArticleEditor",
    data() {
      return {
        value: '',
        user: '',
        cronTimeStr: '',
        cronTimeStrTemp: '',
        cronTime: 0,
        vertical: '',
        articleTypes: '',
        // type: '',
        loading: false,
        content: '',
        article: {},
        pages: {
          pageNum: Global.commmPageNum,
          pageSize: Global.commmMaxPageSize,
          total: 0
        },
        articleUrl: 'http://localhost:8080/artcles/',
        articleTypesUrl: 'http://localhost:8080/articlesTypes/search/subType/',
        fileArticleUrl: 'http://localhost:8080/files/artices/',
      }
    },
    methods: {
      judge: function () {
        this.cronTimeStr = this.cronTimeStrTemp;
      },
      publishArticle: function () {
        //TODO 上传内容，
        this.saveFile("3")
      },
      saveToEditor: function () {
        //TODO 上传内容，
        this.saveFile("2")
      },
      articleType: function () {
        let data = {};
        data['userId'] = this.user.userId;
        this.$ajax.get(this.articleTypesUrl, {params: this.$qs.parse(data)})
          .then((res) => {
          if (!res.data.successFlag) {
            console.log(res.data.message)
            return;
          }
          this.articleTypes = res.data.object;
        }).catch((err) => {
          console.log(err);
        });
      },
      saveFile: function (articleFlag) {
        if (this.isEmpty(this.user.userId)) {
          this.$Message.error("请先登录");
          this.$router.push("/login.html")
          return;
        }
        if (this.isEmpty(this.article.typeId)) {
          this.$Message.error("请先选择类型");
          return;
        }
        if (this.isEmpty(this.article.firstTopic)) {
          this.$Message.error("请先输入一级标题");
          return;
        }
        if (this.isEmpty(this.article.secondTopic)) {
          this.$Message.error("请先输入二级标题");
          return;
        }
        let param = new window.FormData();
        let file = new File([this.value],'ant.md',{
          type: 'text/plain',
        });
        param.append("file", file);
        this.$ajax({
          url: this.fileArticleUrl,
          method: 'post',
          data: param,
          headers: {'Content-Type': 'multipart/form-data'},
        }).then((res) => {
          let fileResult = res.data;
          if (!fileResult.successFlag) {
            this.$Message.error(fileResult.message);
            alert(fileResult.message);
            return;
          }
          this.article.content = res.data.object;
          if (this.isEmpty(this.article.content)) {
            this.$Message.warning("编辑内容为空,请输入内容");
            return;
          }
          let data = new window.FormData();
          data.append("userId", this.user.userId);
          data.append("typeId", this.article.typeId);
          data.append("firstTopic", this.article.firstTopic);
          data.append("secondTopic", this.article.secondTopic);
          data.append("content",  this.article.content);
          if (articleFlag==2){
            data.append("articleFlag", 'false');
          }
          if (articleFlag==3){
            data.append("articleFlag", 'true');
          }
          this.$ajax({
            method: 'post',
            url: this.articleUrl,
            data: data
          }).then((res) => {
            console.log(res);
            if (!res.data.successFlag) {
              this.$Message.error(res.data.message);
              alert(res.data.message)
              return;
            }
            this.$Message.success(res.data.message);
            this.$router.push("/admin/home.html");
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      },
      $change(value, render) {
        this.content = render;
        // this.article.content = render;
      },
      isEmpty: function (obj) {
        // 检验 undefined 和 null
        if (!obj && obj !== 0 && obj !== '') {
          return true;
        }
        if (obj == "")
          return true;
        if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
          return true;
        }
        if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
          return true;
        }
        return false;
      },
      getOneArticle: function () {
        this.$ajax({
          method: 'get',
          url: this.articleUrl + this.$route.params.articleId
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
          }).then((res) => {
            this.value = res.data;
          }).catch((err) => {
            console.log(err);
          });
        }).catch((err) => {
          console.log(err);
        });
      },
      $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('file', $file);
        this.$ajax({
          url: this.fileArticleUrl,
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'},
        }).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            this.$refs.editor.$img2Url(pos, '')
            return
          }
          this.$refs.editor.$img2Url(pos, res.data.object);
        })
      },
      $imgDel: function (fileName) {
        let fileNameTemp = fileName[1].toString().substr(fileName[1].lastIndexOf("/") + 1);
        let delFlag = this.$refs.editor.$imgDelByFilename(fileName[0].name.toString());
        alert(delFlag)
      }
    },
    watch: {
      $route() {
        if (this.$route.params.articleId != undefined) {
          this.article.articleId = this.$route.params.articleId
        }
      },
      cronTimeStr: function () {

      },
      cronTime: function () {

      }
    },
    mounted: function () {
      this.user = this.getUser()
      this.articleType();
      if (this.$route.params.articleId != undefined) {
        alert("mount")
        this.getOneArticle();
      }
      //然后判断是否是存在文章ID，若存在，发送倒台文章ID获取文章信息，填入相应位置，
    },
    destroyed: function () {
    }
  }
</script>

<style scoped>

</style>
