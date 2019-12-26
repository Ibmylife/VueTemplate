import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default {
  // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
  install: function (Vue) {
    // Vue.prototype.isEmpty = function (obj) {
    //   // 检验 undefined 和 null
    //   if (!obj && obj !== 0 && obj !== '') {
    //     return true;
    //   }
    //   if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
    //     return true;
    //   }
    //   if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
    //     return true;
    //   }
    //   return false;
    // }
    // //初始化
    // Vue.prototype.initWebSocket = function () {
    //   this.connection();
    //   //模拟客户端向后台推送消息
    //   let self = this;
    //   // 断开重连机制,尝试发送消息,捕获异常发生时重连
    //   this.timer = setInterval(() => {
    //     try {
    //       self.stompClient.send("/app/receive", {}, "test");
    //     } catch (err) {
    //       console.log("断线了: " + err);
    //       self.connection();
    //     }
    //   }, 5000);
    // }
    // //建立连接
    // Vue.prototype.connection = function () {
    //   // 建立连接对象
    //   //连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
    //   let _that = this;
    //   //后台服务ip和port
    //   _that.socket = new SockJS('http://localhost:8791/clientMessage');
    //   // 获取STOMP子协议的客户端对象
    //   _that.stompClient = Stomp.over(_that.socket);
    //   // 定义客户端的认证信息,按需求配置
    //   let headers = {
    //     Authorization: ''
    //   };
    //   // 向服务器发起websocket连接
    //   this.stompClient.connect(headers, () => {
    //       // this.stompClient.subscribe('/topic/greetings', (msg) => { // 订阅服务端提供的某个topic
    //       //   alert('广播成功')
    //       //   console.log(msg);  // msg.body存放的是服务端发送给我们的信息
    //       // }, headers);
    //       // let userId = this.user.userId;
    //       // this.stompClient.subscribe('/user/' + userId + '/queue/getResponse', function (response) {
    //       //   var code = JSON.parse(response.body);
    //       //   alert('fjaljafjieafa')
    //       //   console.log("code" + code)
    //       //   console.log("111111111111111111111111111")
    //       //   console.log(response)
    //       //   console.log("111111111111111111111111111")
    //       // }, headers);
    //       // this.stompClient.subscribe('/queue/getResponse', function (response) {
    //       //   var code = JSON.parse(response.body);
    //       //   alert('12222222222222e12e')
    //       //   console.log("code" + code)
    //       //   console.log("111111111111111111111111111")
    //       //   console.log(response)
    //       //   console.log("111111111111111111111111111")
    //       // }, headers);
    //       // 用户加入接口,
    //       this.stompClient.send("/app/hello",
    //         headers,
    //         JSON.stringify({'name': '0 0 0 * * ?'}),
    //       );  //用户加入接口,
    //     }, (err) => {
    //       // 连接发生错误时的处理函数
    //       console.log('失败');
    //       console.log(err);
    //     }
    //   )
    //   ;
    // }
    // //关闭连接
    // Vue.prototype.disconnect = function () {
    //   if (this.stompClient != null) {
    //     this.stompClient.disconnect();
    //     console.log("Disconnected");
    //   }
    // }
    //获取session数据
    Vue.prototype.getUser = function () {
      return sessionStorage.getItem("userName");
    }
    Vue.prototype.getId = function () {
      return sessionStorage.getItem("id");
    }
    Vue.prototype.getColWithBootstrap = function (size) {
      let eachSize = 12 / size
      return "col-md-" + eachSize;
    }
    Vue.prototype.getColSizeWithBootstrap = function (size) {
      let eachSize = 12 / size
      return eachSize;
    }
    Vue.prototype.getToken = function () {
      let tokenHead = sessionStorage.getItem("tokenHead");
      let token = sessionStorage.getItem("token");
      return (tokenHead + token);
    }
  }
}
