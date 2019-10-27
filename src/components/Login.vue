<style scoped>
  .form-group {
    width: 100%;
  }

  .son {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 400px;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
  }

  .borderPart {
    border-radius: 5px;
    border-style: dotted;
  }

</style>
<script>

  export default {
    mounted() {
      if (!window.sessionStorage) {
        this.flag = false;
      } else {
        this.flag = true;
        let item = sessionStorage.getItem('user');
        if (item != null) {
          this.$router.push("/admin/home.html")
        }
      }
      this.getAddress();

      // https://api.map.baidu.com/location/ip
      var map = new BMap.Map(this.$refs.container);
      // 创建地图实例
      var point = new BMap.Point(x, y);
      // 创建点坐标
      map.centerAndZoom(point, 15);

    },
    methods: {
      login: function () {
        if (!this.flag) {
          return;
        }
        if (this.username == "" || this.username == undefined) {
          this.$Message.info('用户名不可为空');
          return
        }
        if (this.password == "" || this.password == undefined) {
          this.$Message.info('密码不可为空');
          return
        }
        let param = new window.FormData();
        param.append("userName", this.username.trim());
        param.append("userPassword", this.password.trim());
        this.$ajax.post(this.loginUrl, param).then((res) => {
          let data = res.data;
          if (!data.successFlag) {
            alert(data.message)
            return;
          }
          let object = data.object;
          sessionStorage.setItem('user', JSON.stringify(object));
          this.$router.push("/admin/home.html");
        }).catch((err) => {
          console.log(err);
        });
      },
      getAddress: function () {
        this.$jsonp('https://api.map.baidu.com/location/ip?ak=2L1XLPhP4s9t78iro4Ik6xA0KtvvTHLc&coor=bd09ll').then(json => {
          // 返回数据 json， 返回的数据就是json格式
          let address = json.content.address;
          let points = json.content.point;
          // https://api.map.baidu.com/location/ip
          let map = new BMap.Map(this.$refs.container);
          // 创建地图实例
          let point = new BMap.Point(points.x, points.y);
          // 创建点坐标
          map.centerAndZoom(point, 15);
          map.enableScrollWheelZoom(true);
          map.setCurrentCity(address);
        }).catch(err => {
          console.log(err)
        })
      },
      // getscreenHeight: function () {
      //   return window.screen.availHeight;
      // }
    },
    data() {
      return {
        username: "",
        password: "",
        containerStyle: {
          'width': '100%',
          'height': '1040px',
          'z-index': '-999',
          'overflow': 'hidden',
          'opacity': '0.4'
        },
        loginUrl: 'http://localhost:8080/user/login'
      }
    },
    computed: {}
  }
</script>
<template>
  <div>
    <Row class="son">
      <Row>
        <Col span="8">
          <p>
          </p>
        </Col>
        <Col span="8">
          <Form :model="formLeft" label-position="left" :label-width="100">
            <FormItem label="用户名:">
              <Input v-model="username"></Input>
            </FormItem>
            <FormItem label="密码:">
              <Input v-model="password" type="password"></Input>
            </FormItem>
          </Form>
        </Col>
        <Col span="8">
          <p></p>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <p></p>
        </Col>
        <Col span="8">
          <Button @click="login()" type="primary">
            <p>登录</p>
          </Button>
          <Button type="primary" style="float: right">
            <p>注册</p>
          </Button>
        </Col>
        <Col span="8">
          <p></p>
        </Col>
      </Row>
    </Row>
    <div style="z-index: -100;position: relative">
      <div id="container" ref="container" v-bind:style="containerStyle">
      </div>
    </div>
  </div>
</template>

