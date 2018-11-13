<template>
  <div class="hello">
    <!--{{mes}}-->
    <!--<br/>-->
    <!--<input v-model="mes" v-on:keyup.enter="addnewList"/>-->
    <!--<button v-on:click="addnewList">点击</button>-->
    <!--<ul>-->
    <!--<li v-for="tem in msg" v-on:click="changecls(tem)" v-bind:class="{show : tem.a}">-->
    <!--{{tem.b}}-->
    <!--</li>-->
    <!--</ul>-->
    <!--<p>child tell me {{message}}</p>-->
    <!--<components-a v-on:childtellme="childtellme" ></components-a>-->
    <!--<components-b></components-b>-->
    {{a}}
    <component-c
      v-bind:msg="mes"
      v-bind:abc="msg"
      v-on:enlarge-text="onenlargeText"></component-c>
    <br/>
    <hr/>
    <input v-model="searchText"/>
    {{searchText}}
    <components-d v-model="searchText"></components-d>
    <br/>
    <hr/>
    <components-e></components-e>
    <br/>
    <hr/>
    <components-jquery></components-jquery>
  </div>
</template>

<script>
  import ComponentsA from "@/components/ComponentsA";
  import ComponentsB from "./ComponentsB";
  import ComponentC from "@/components/ComponentC";
  import ComponentsD from "@/components/ComponentsD";
  import ComponentsE from "./ComponentsE";
  import ComponentsF from "./ComponentsF";
  import ComponentsG from "./ComponentsG";
  import ComponentsH from "./ComponentsH";
  import ComponentsJquery from "./ComponentsJquery";

  export default {
    name: 'HelloWorld',
    components: {
      ComponentsJquery,
      ComponentsF, ComponentsG, ComponentsH,ComponentsE, ComponentsD, ComponentC, ComponentsB, ComponentsA},
    data() {
      return {
        a: 1,
        mes: 'Welcome to Your Vue.js App',
        msg: [
          {a: true, b: "a"}, {a: true, b: "b"}, {a: true, b: "c"}, {a: true, b: "d"}
        ],
        message: '',
        searchText: '1'
      }
    },
    methods: {
      addnewList: function () {
        if (this.mes != '') {
          this.msg.push({a: false, b: this.mes})
        } else {
          alert("请添加数据")
        }
        this.mes = ''
      },
      changecls: function (tem) {
        tem.a = !tem.a;
      },
      childtellme: function (message) {
        this.message = message
      },
      onenlargeText: function (a) {
        this.a = a;
        console.log(a)
      },
      onself:function (value) {
        this.searchText=value;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .show {
    background-color: lightpink;
  }
</style>
