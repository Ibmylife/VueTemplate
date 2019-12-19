<template>
  <div>
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark">
          <MenuItem name="1">
            <Icon type="ios-paper"/>
            <router-link to="/">首页</router-link>
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-people"/>
            文章
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-people"/>
            留言板
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-construct"/>
            专题
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-construct"/>
            关于
          </MenuItem>
          <Submenu name="5" class="right">
            <template slot="title">
              <Icon type="ios-stats"/>
              个人信息
            </template>
            <MenuItem name="5-1">
              <router-link to="/admin/home.html">
                个人信息
              </router-link>
            </MenuItem>
            <MenuItem name="5-2">
              <router-link to="/login.html">
                登录
              </router-link>
            </MenuItem>
            <!--<MenuItem name="5-3">注册</MenuItem>-->
          </Submenu>
        </Menu>
      </Header>
      <Layout>
        <Row class="body">
          <img src="../assets/page-background-picture.jpg" class="page-background-picture">
          <Row class="window">
            <p class="title">NIEJIAHAO</p>
            <p class="desc">THERE IS NOTHING TO LEAVE</p>
          </Row>
        </Row>
        <Row style="top: -200px;">
          <Col span="1">
            <p></p>
          </Col>
          <Col span="6">
            <Row>
              <router-view name="sidebarAdd" v-on:toArticleAdd="toArticleAdd"></router-view>
            </Row>
            <br/>
            <Row>
              <router-view name="sidebarRank" v-on:toArticleRank="toArticleRank"></router-view>
            </Row>
            <br/>
            <Row>
              <router-view name="sidebarTime" v-on:toArticleTime="toArticleTime"></router-view>
            </Row>
            <br/>
            <Row>
              <router-view name="sidebarType" v-on:toArticleType="toArticleType"></router-view>
            </Row>
          </Col>
          <Col span="1">
            <p></p>
          </Col>
          <Col span="15">
            <router-view name="main" v-on:toArticle="toArticle"></router-view>
          </Col>
          <Col span="1">
            <p></p>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <p class="text-center">©CopyRight 赣ICP备18005506号. niejiahao 版权所有</p>
          </Col>
        </Row>
      </Layout>
    </Layout>
  </div>
</template>

<script>

  import HomeArticleList from "./client/HomeArticleList";
  import SidebarAdd from '../components/client/SidebarAdd'
  import SidebarRank from '../components/client/SidebarRank'
  import SidebarTime from '../components/client/SidebarTime'
  import SidebarType from '../components/client/SidebarType'
  import ArticleInfo from '../components/client/ArticleInfo'

  export default {
    name: 'blog',
    components: {SidebarAdd, SidebarRank, SidebarTime, SidebarType, ArticleInfo, HomeArticleList},
    data() {
      return {
        show: true,
      }
    },
    mounted: {},
    methods: {
      toArticle: function (id) {
        console.log(this.$router);
        this.$router.push({
          path: '/blog/' + id + '.html',
        })
      },
      toArticleAdd: function (id) {
        console.log(this.$router);
        this.$router.push({
          path: '/blog/' + id + '.html',
        })
      },
      toArticleRank: function (id) {
        this.$router.push({
          path: '/blog/' + id + '.html',
        })
      },
      //这些跟上面不同,需要单独处理
      toArticleType: function (type) {
        console.log(this.$router);
        this.$router.push({
          path: '/blogtype/' + type + '.html',
        })
      },
      toArticleTime: function (time) {
        console.log(this.$router);
        this.$router.push({
          path: '/blogtime/' + time + '.html',
        })
      }
    }
  }
</script>

<style scoped>
  .right {
    float: right;
  }

  .window {
    background-color: black;
    background: rgba(0, 0, 0, 0.1);
    position: relative;
    width: 100%;
    top: -230px;
    height: 230px;
  }

  .window .title {
    line-height: 150px;
    font-size: 50px;
    color: #FFF;
    text-align: center;
    z-index: 1;
  }

  .window .desc {
    font-size: 20px;
    color: #FFF;
    text-align: center;
    z-index: 1;
    margin-top: -50px;
    font-style: italic;
  }

  .page-background-picture {
    position: relative;
    overflow: hidden;
    height: 230px;
    width: 100%;
  }
</style>
