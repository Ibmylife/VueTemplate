<style scoped>
  .layout-con {
    height: 100%;
    width: 100%;
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0px;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1" theme="dark" width="auto" :class="menuitemClasses" :open-names="['1']" accordion>
          <MenuItem name="1">
            <router-link to="/admin/home.html">
              <!--<Icon type="md-home"/>-->
              <center><h1>{{user.userName}}</h1></center>
            </router-link>
          </MenuItem>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              <span>文章</span>
            </template>
            <MenuItem name="2-1">
              <router-link to="/admin/artcles.html">
                <Icon type="md-home"/>
                <span>文章管理</span>
              </router-link>
            </MenuItem>
            <MenuItem name="2-2">
              <router-link to="/admin/artclesType.html">
                <Icon type="md-home"/>
                <span>类型管理</span>
              </router-link>
            </MenuItem>
            <MenuItem name="2-3">
              <router-link to="/admin/editor.html">
                <Icon type="md-home"/>
                <span>文章编写</span>
              </router-link>
            </MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              <span>权限</span>
            </template>
            <MenuItem name="3-1">
              <router-link to="/admin/user.html">
                <Icon type="md-home"/>
                <span>用户管理</span>
              </router-link>
            </MenuItem>
            <MenuItem name="3-2">
              <router-link to="/admin/usersecurity.html">
                <Icon type="md-home"/>
                <span>权限管理</span>
              </router-link>
            </MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              <span>服务资源监控</span>
            </template>
            <MenuItem name="4-1">
              <router-link to="/admin/jvm.html">
                <Icon type="md-home"/>
                <span>JVM</span>
              </router-link>
            </MenuItem>
            <MenuItem name="4-2">
              <router-link to="/admin/server.html">
                <Icon type="md-home"/>
                <span>服务器</span>
              </router-link>
            </MenuItem>
            <MenuItem name="4-3 ">
              <router-link to="/admin/database.html">
                <Icon type="md-home"/>
                <span>数据库</span>
              </router-link>
            </MenuItem>
            <MenuItem name="4-4 ">
              <router-link to="/admin/ftp.html">
                <Icon type="md-home"/>
                <span>FTP服务器</span>
              </router-link>
            </MenuItem>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              <span>运行错误</span>
            </template>
            <MenuItem name="5-1">
              <router-link to="/admin/events.html">
                <Icon type="md-home"/>
                <span>运行错误</span>
              </router-link>
            </MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout :style="{padding: '0 24px 24px'}">
        <router-view name="breadcrumbnavigation" v-bind:navigationUrl="navigationUrl"
                     v-on:toBreadcrumbnavigation="toBreadcrumbnavigation"></router-view>
        <Content>
          <router-view name="content" v-on:toContent="toContent"></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  import BreadcrumbNavigation from "./component/BreadcrumbNavigation";

  export default {
    components: {BreadcrumbNavigation},
    data() {
      return {
        isCollapsed: false,
        user: '',
        navigationUrl: {
          home: '',
          components: '',
          layout: ''
        },
        map: [
          {
            key: '/admin/home.html',
            value: {
              home: '管理后台',
              components: '主页',
              layout: '详情'
            }
          },
          {
            key: '/admin/artcles.html',
            value: {
              home: '管理后台',
              components: '文章',
              layout: '文章管理'
            }
          },
          {
            key: '/admin/artclesType.html',
            value: {
              home: '管理后台',
              components: '文章',
              layout: '文章类型管理'
            }
          },
          {
            key: '/admin/editor.html',
            value: {
              home: '管理后台',
              components: '文章',
              layout: '文章编写'
            }
          },
          {
            key: '/admin/user.html',
            value: {
              home: '管理后台',
              components: '权限',
              layout: '用户管理'
            }
          },
          {
            key: '/admin/user.html',
            value: {
              home: '管理后台',
              components: '权限',
              layout: '权限管理'
            }
          },
          {
            key: '/admin/jvm.html',
            value: {
              home: '管理后台',
              components: '服务资源监控',
              layout: 'JVM'
            }
          },
          {
            key: '/admin/server.html',
            value: {
              home: '管理后台',
              components: '服务资源监控',
              layout: '服务器'
            }
          },
          {
            key: '/admin/database.html',
            value: {
              home: '管理后台',
              components: '服务资源监控',
              layout: '数据库'
            }
          },
          {
            key: '/admin/ftp.html',
            value: {
              home: '管理后台',
              components: '服务资源监控',
              layout: 'FTP服务器'
            }
          },
          {
            key: '/admin/events(/((?!/).)+\\.html|\\.html)',
            value: {
              home: '管理后台',
              components: '运行错误',
              layout: '运行错误'
            }
          },
        ],
        websock: null,
      }
    },
    mounted: function () {
      //调用初始化websocket方法
      this.user = this.getUser()
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },

    },
    watch: {
      $route() {
        this.toNav();
      }
    },
    methods: {
      toBreadcrumbnavigation: function () {

      },
      toNav: function () {
        console.log(this.$route.fullPath);
        this.map.forEach(t => {
          if (this.$route.fullPath.match(t.key)) {
            this.navigationUrl = t.value;
            return;
          }
        })
      },
      toContent: function (params) {
        if (params['eventFlag']) {
          this.$router.push({
            path: '/admin/events/' + params['eventId'] + '.html',
          })
        }
        if (params['articleIdFlag']) {
          let articleId = params.articleId;
          this.$router.push({
            path: '/admin/editor/' + articleId + '.html',
          })
        }
      },
    },
    destroyed: function () {

    }
    ,
    //销毁页面之前，断开连接
    beforeDestroy: function () {
      //页面离开时断开连接,清除定时器

    }
    ,

  }
</script>
