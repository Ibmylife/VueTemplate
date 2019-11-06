import HomeArticleList from '../components/client/HomeArticleList'
import SidebarAdd from '../components/client/SidebarAdd'
import SidebarRank from '../components/client/SidebarRank'
import SidebarTime from '../components/client/SidebarTime'
import SidebarType from '../components/client/SidebarType'
import ArticleInfo from '../components/client/ArticleInfo'
import ArticleTimeList from '../components/client/ArticleTimeList'
import ArticleTypeList from '../components/client/ArticleTypeList'
import Admin from '../components/server/Admin'
import Login from '../components/Login'
import Global from '../components/Global'
import Blog from '../components/Blog'
import BreadcrumbNavigation from '../components/server/component/BreadcrumbNavigation'
import HomePageContent from '../components/server/component/HomePageContent'
import EventDetails from '../components/server/component/EventDetails'
import ArticleEditor from '../components/server/component/ArticleEditor'
import ArticlesDetail from '../components/server/component/ArticlesDetail'
import ArticleTypeDetail from '../components/server/component/ArticleTypeDetail'
import DataBaseDetail from '../components/server/component/DataBaseDetail'
import FtpDetail from '../components/server/component/FtpDetail'
import JvmDetail from '../components/server/component/JvmDetail'
import ServerDetail from '../components/server/component/ServerDetail'
import UserDetail from '../components/server/component/UserDetail'
import UserSecurityDetail from '../components/server/component/UserSecurityDetail'

import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import qs from 'qs'
import echarts from 'echarts'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import vueMarkdown from 'vue-markdown';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import base from '../components/GlobalFunction';//引用
import VueJsonp from 'vue-jsonp'
// import jquery from 'jquery';
// import bootstrap from 'bootstrap'

Vue.use(VueJsonp)//解决跨域问题,
Vue.use(base);//将全局函数当做插件来进行注册
Vue.use(mavonEditor)
Vue.use(vueMarkdown)
Vue.use(axios);
Vue.use(iView);
Vue.use(Router)
Vue.use(qs)
Vue.use(SockJS)
Vue.use(Stomp)
// Vue.use(jquery)
// Vue.use(bootstrap)
Vue.prototype.$ajax = axios
Vue.prototype.$qs = qs
Vue.prototype.$echarts = echarts
Vue.prototype.$vueMarkdown = vueMarkdown
Vue.prototype.$base = base
//服务器端
const routers = [
  {
    path: '/login.html',
    component: Login
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: 'home.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: HomePageContent,
        }
      },
      {
        path: 'events/:eventId' + '.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: EventDetails,
        }
      },
      {
        path: 'events.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: EventDetails,
        }
      },
      {
        path: 'editor.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: ArticleEditor,
        }
      },
      {
        path: 'editor/:articleId'+'.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: ArticleEditor,
        }
      },
      {
        path: 'artcles.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: ArticlesDetail,
        }
      },
      {
        path: 'artclesType.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: ArticleTypeDetail,
        }
      },
      {
        path: 'database.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: DataBaseDetail,
        }
      },
      {
        path: 'ftp.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: FtpDetail,
        }
      },
      {
        path: 'jvm.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: JvmDetail,
        }
      },
      {
        path: 'server.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: ServerDetail,
        }
      },
      {
        path: 'user.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: UserDetail,
        }
      },
      {
        path: 'usersecurity.html',
        components: {
          breadcrumbnavigation: BreadcrumbNavigation,
          content: UserSecurityDetail,
        }
      }
    ]
  },
  {
    path: '/',
    component: Blog,
    children: [
      {
        path: '',
        name: 'articleList',
        components: {
          main: HomeArticleList,
          sidebarAdd: SidebarAdd,
          sidebarRank: SidebarRank,
          sidebarType: SidebarType,
          sidebarTime: SidebarTime,
        }
      }
      ,
      {
        path: 'blog/:id' + '.html',
        components: {
          main: ArticleInfo,
          sidebarAdd: SidebarAdd,
          sidebarRank: SidebarRank,
          sidebarType: SidebarType,
          sidebarTime: SidebarTime,
        }
      },
      {
        path: 'blogtype/:type' + '.html',
        components: {
          main: ArticleTypeList,
          sidebarAdd: SidebarAdd,
          sidebarRank: SidebarRank,
          sidebarType: SidebarType,
          sidebarTime: SidebarTime,
        }
      }
      ,
      {
        path: 'blogtime/:time' + '.html',
        components: {
          main: ArticleTimeList,
          sidebarAdd: SidebarAdd,
          sidebarRank: SidebarRank,
          sidebarType: SidebarType,
          sidebarTime: SidebarTime,
        }
      }
    ]
  }
];
export default new Router({
  routes: routers
})
