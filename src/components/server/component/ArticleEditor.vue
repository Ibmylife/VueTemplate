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
            <Row>
              <RadioGroup v-model="vertical" vertical>
                <Radio label="comment" default>
                  <Icon type="social-apple"></Icon>
                  <span>开启评论</span>
                </Radio>
                <Radio label="uncomment">
                  <Icon type="social-android"></Icon>
                  <span>关闭评论</span>
                </Radio>
                <Divider/>
                <Button type="primary" @click="saveToEditor">保存草稿</Button>
                <Button type="primary" style="margin-left: 60px;" @click="publishArticle">发布</Button>
              </RadioGroup>
            </Row>
            <Divider/>
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
  import SockJS from 'sockjs-client';
  import Stomp from 'stompjs';

  export default {
    name: "ArticleEditor",
    data() {
      return {
        value: '',
        user: '',
        defaultData: "preview",
        // firstTopic: '',
        // secondTopic: '',
        cronTimeStr: '',
        cronTimeStrTemp: '',
        cronTime: 0,
        vertical: '',
        articleTypes: '',
        // type: '',
        loading: false,
        socketjsTimer: '',
        executeTimer: '',
        fixdelayTime: 2000,
        publishTime: '',
        content: '',
        article: {},
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
      cronTimeChange: function () {
        let json = {};
        json['cron'] = this.cronTimeStr;
        json['userName'] = this.user.userId
        json['flag'] = 'false';
        let headers = {
          Authorization: ''
        };
        this.stompClient.send("/app/cron",
          {},
          JSON.stringify(json)
        );
      },
      connection: function () {
        // 建立连接对象
        //连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
        let _that = this;
        //后台服务ip和port
        _that.socket = new SockJS('http://localhost:8791/clientMessage');
        // 获取STOMP子协议的客户端对象
        _that.stompClient = Stomp.over(_that.socket);
        // 定义客户端的认证信息,按需求配置
        let headers = {
          Authorization: ''
        };
        // 向服务器发起websocket连接
        this.stompClient.connect(headers, () => {
            let userId = this.user.userId;
            this.stompClient.subscribe('/user/' + userId + '/queue/getResponse', function (response) {
              let baseRestult = JSON.parse(response.body);
              if (!baseRestult.successFlag) {
                alert(baseRestult.message)
                return;
              }
              console.log(response)
              //预定时间
              let dateStr = baseRestult.object[0];
              let nextDate = new Date(dateStr);
              let nowDate = new Date();
              let nextDateTimestamp = Date.parse(nextDate);
              let nowDateTimestamp = Date.parse(nowDate);
              let leftTimeStamp = nextDateTimestamp - nowDateTimestamp;
              let passTimeStamp = 0
              _that.publishTime = nowDateTimestamp
              _that.cronTime = 0
              clearTimeout(_that.executeTimer);
              _that.executeTimer = setInterval(() => {
                try {
                  passTimeStamp += _that.fixdelayTime
                  _that.cronTime = (passTimeStamp / leftTimeStamp).toFixed(2) * 100
                } catch (err) {
                  console.log(err);
                  alert("cron表达式出现错误,请重新输入")
                }
              }, _that.fixdelayTime)
            }, headers);
          }, (err) => {
            // 连接发生错误时的处理函数
            console.log('失败');
            console.log(err);
          }
        )
      },
      initWebSocket: function () {
        this.connection();
        //模拟客户端向后台推送消息
        let self = this;
        // 断开重连机制,尝试发送消息,捕获异常发生时重连
        this.socketjsTimer = setInterval(() => {
          try {
            self.stompClient.send("/app/receive", {}, "test");
          } catch (err) {
            console.log("断线了: " + err);
            self.connection();
          }
        }, 5000);
      },
      disconnect: function () {
        if (this.stompClient != null) {
          this.stompClient.disconnect();
          console.log("Disconnected");
        }
      },
      articleType: function () {
        let data = {};
        data['userId'] = this.user.userId;
        this.$ajax({
          method: 'post',
          url: '/rest/bolg-server/articlestypes',
          data: this.$qs.stringify(data)
        }).then((res) => {
          console.log(res);
          if (!res.data.successFlag) {
            console.log(res.data.message)
            return;
          }
          this.articleTypes = res.data.object.content;
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
        param.append("files", this.content);
        this.$ajax({
          method: 'post',
          url: '/rest/file/uploadMdFile',
          data: param
        }).then((res) => {
          let fileResult = res.data;
          if (!fileResult.successFlag) {
            this.$Message.error(fileResult.message);
            return;
          }
          this.article.content=fileResult.object;
          if (this.isEmpty(this.article.content)) {
            this.$Message.success("编辑内容为空,请输入内容");
            return;
          }
          let data = new window.FormData();
          data.append("userId", this.user.userId);
          data.append("typeId", this.article.typeId);
          data.append("firstTopic", this.article.firstTopic);
          data.append("secondTopic", this.article.secondTopic);
          data.append("content", fileResult.object);
          data.append("articleFlag", articleFlag);
          this.$ajax({
            method: 'post',
            url: '/rest/bolg-server/artclesave',
            data: data
          }).then((res) => {
            console.log(res);
            if (!res.data.successFlag) {
              this.$Message.error(res.data.message);
              return;
            }
            this.$Message.success(res.data.message);
            this.$router.push("/admin/artcles.html");
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
          url: '/rest/bolg-server/artcle/' + this.$route.params.articleId
        }).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.object.message);
            return;
          }
          this.article.articleId = res.data.object.articleId
          this.article.browerCount = res.data.object.browerCount
          this.article.content = res.data.object.content
          this.article.createTime = res.data.object.createTime
          this.article.createTimeStr = res.data.object.createTimeStr
          this.article.firstTopic = res.data.object.firstTopic
          this.article.likeCount = res.data.object.likeCount
          this.article.secondTopic = res.data.object.secondTopic
          this.article.typeId = res.data.object.typeId
          this.article.updateTime = res.data.object.updateTime
          this.article.updateTimeStr = res.data.object.updateTimeStr
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
        console.log(pos)
        console.log($file)
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('files', $file);
        this.$ajax({
          url: '/rest/file/upload',
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'},
        }).then((url) => {
          if (!url.data.successFlag) {
            this.$Message.error(url.data.message);
            this.$refs.editor.$img2Url(pos, '')
            return
          }
          this.$refs.editor.$img2Url(pos, url.data.object);
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
          alert(this.$route.params.articleId)
          this.article.articleId = this.$route.params.articleId
        }
      },
      cronTimeStr: function () {
        //TODO 当表达式改变时，通过websocket发送请求，获取离设置的发布时间还有多久，然后用进度条，每秒刷新显示进度
        this.cronTimeChange();
      },
      cronTime: function () {
        if (this.cronTime >= 100) {
          alert("中止定时任务")
          clearTimeout(this.executeTimer);
        }
      },

    },
    mounted: function () {
      //TODO 挂载时，创建于后台的websocket连接 ，
      //调用初始化websocket方法
      this.user = this.getUser()
      this.articleType();
      // this.initWebSocket();
      if (this.$route.params.articleId != undefined) {
        this.getOneArticle();
      }
      //然后判断是否是存在文章ID，若存在，发送倒台文章ID获取文章信息，填入相应位置，
    },
    destroyed: function () {
      clearTimeout(this.executeTimer);
      clearTimeout(this.socketjsTimer);
    }
  }
</script>

<style scoped>

</style>
