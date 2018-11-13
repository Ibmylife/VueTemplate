<template>
  <div class="container">
    <div class="navbar navbar-default">
      <a class="navbar-brand">聂</a>
      <div class="navbar-header">
        <button class="navbar-toggle" data-toggle="collapse" data-target="#menu">
          <span class="sr-only">导航</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <ul class="nav collapse navbar-collapse nav-justified" id="menu">
        <li><a class="btn">one</a></li>
        <li><a class="btn">two</a></li>
        <li><a class="btn">three</a></li>
        <li><a class="btn">four</a></li>
      </ul>
    </div>
    <div class="row">
      <div class="col-sm-9">
        <ul class="list-group" id="parent">
          <li class="list-group-item">
            <label data-toggle="collapse" data-target="#panel1" data-parent="#parent">
              关于java8的新特性
            </label>
            <div class="panel collapse panel-collapse" id="panel1">
              <div class="panel-body">
                <a href="#">
                  <h4>
                    关于java8的新特性关于java8的新特性关于java8的新特性关于java8的新特性关于java8的新特性关于java8的新特性关于java8的新特性
                  </h4>
                </a>
              </div>
              <div class="panel-footer">
                <div class="row">
                  <ul class="nav  nav-pills nav-justified">
                    <li>
                      <a class="btn" href="#">
                        <span class="glyphicon glyphicon-thumbs-down"></span>
                      </a>
                    </li>
                    <li class="text-center">
                      阅读量(10)
                    </li>
                    <li>
                      <a class="btn" href="#">
                        <span class="glyphicon glyphicon-thumbs-up"></span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li class="list-group-item">
            <label data-toggle="collapse" data-target="#panel2" data-parent="#parent">
              关于java8的新特性
            </label>
            <div class="panel collapse panel-collapse" id="panel2">
              <div class="panel-body">
                <a href="#">
                  <h4>
                    关于java8的新特性关于java8的新特性关于java8的新特性关于java8的新特性关于java8的新特性关于java8的新特性关于java8的新特性
                  </h4>
                </a>
              </div>
              <div class="panel-footer">
                <div class="row">
                  <ul class="nav  nav-pills nav-justified">
                    <li>
                      <a class="btn" href="#">
                                    <span class="glyphicon glyphicon-thumbs-down">

                                    </span>
                      </a>
                    </li>
                    <li class="text-center">
                      阅读量(10)
                    </li>
                    <li>
                      <a class="btn" href="#">
                                    <span class="glyphicon glyphicon-thumbs-up">

                                    </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="row">
          <ul class="pager">
            <li class="previous disabled"><a href="#">上一页</a></li>
            <li class="next"><a href="#">下一页</a></li>
            <button @click="show = !show" id="hw-btn" v-bind:class="{ show: isActive }">
              Toggle render
            </button>
            <transition name="custom-classes-transition" enter-active-class="animated rotateIn" leave-active-class="animated rotateOut">
              <p v-if="show">hello</p>
            </transition>
          </ul>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="row">
          <div class="clock"></div>
        </div>
        <div class="row">
          <div class="text-center">
            阅读量排行
          </div>
          <ul class="list-group">
            <li class="list-group-item">
              关于java8的新特性
              <div class="pull-right">
                <span class="glyphicon glyphicon-menu-up"></span>
              </div>
              <span class="badge">1</span>
            </li>
            <li class="list-group-item">
              关于java8的新特性
              <div class="pull-right">
                <span class="glyphicon glyphicon-menu-down"></span>
              </div>
              <span class="badge">2</span>
            </li>
            <li class="list-group-item">
              关于java8的新特性
              <div class="pull-right">
                <span class="glyphicon glyphicon-menu-down"></span>
              </div>
              <span class="badge">2</span>
            </li>
            <li class="list-group-item">
              关于java8的新特性
              <div class="pull-right">
                <span class="glyphicon glyphicon-menu-down"></span>
              </div>
              <span class="badge">2</span>
            </li>
            <li class="list-group-item">
              关于java8的新特性
              <div class="pull-right">
                <span class="glyphicon glyphicon-menu-down"></span>
              </div>
              <span class="badge">2</span>
            </li>
          </ul>
        </div>
        <div class="row">
          <div class="text-center">分类</div>
          <ul class="list-group">
            <li class="list-group-item">java</li>
            <li class="list-group-item">jsp</li>
            <li class="list-group-item">spring</li>
            <li class="list-group-item">mysql</li>
            <li class="list-group-item">html</li>
            <li class="list-group-item">css</li>
            <li class="list-group-item">javascript</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '../../static/timer/css/flipclock.css'
  import '../../static/timer/js/flipclock.min'
  import '../../static/timer/js/prefixfree.min'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        mes: 'Welcome to Your Vue.js App',
        a: 1,
        show:true,
      }
    },
    mounted:{
      time:function () {
        var clock = $('.clock').FlipClock();
      }
    },
    methods: {
      addanCls: function () {
        console.log(this.a)
        console.log(this.el)
        console.log($(this.el))
        this.a++;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .clock {
    margin: 0 auto;
    /*margin-top: 150px;*/
    clear: both;
    /*width: 460px;*/
  }
</style>
