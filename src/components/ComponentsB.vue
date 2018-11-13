<template>
  <div>
    <div>
      <p>{{message}}</p>
      <button v-on:click="reverseMessage()">反转</button>
    </div>
    <div>
      <p>{{message1}}</p>
      <input v-model="message1"/>
    </div>
    <div>
      <p>using mustaches : {{rawHtml}}</p>
      <p>using v-html directive : <span v-html="rawHtml"></span></p>
    </div>
    <div v-bind:id="dynamicd">
      <button v-bind:disabled="isButtonDisabled">Button</button>
    </div>
    <div>
      {{number}}
      {{number + 1}}
      {{message.split('').reverse().join('')}}
    </div>
    <div v-bind:id="'list-' + id">

    </div>
    <div v-if="seen">you can see me</div>
    <div>
      <a v-bind:href="url">baidu.com</a>
      <a v-on:click="doSomething" target="_blank">baidi.com</a>
    </div>
    <form action="www.baidu.com" v-on:submit.prevent="beforeSubmit" v-on:submit="sumbmit">
      <input name="a"/>
      <input name="a"/>
      <input name="a"/>
      <input type="submit" name="submit"/>
    </form>
    <div>
      <div v-bind:class="{active:isactive}">
        绑定class 一个属性
      </div>
      <div v-bind:class="{unactive:isactive,Float:isfloat}">
        绑定class 多个属性
      </div>
      <div v-bind:class="classObject">
        绑定一个数据对象
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ComponentsB",
    data() {
      return {
        message: '测试这个有没有用test',
        message1: 'ceshi',
        rawHtml: '<font style="color: red">12</font>',
        dynamicd: 'cccc',
        isButtonDisabled: false,
        number: 12,
        id: 1,
        seen: true,
        url: 'http://www.baidu.com',
        isactive:true,
        isfloat:true,
        classObject:{
          isactive:true,
          isfloat:false
        }
      }
    },
    created: function () {
      console.log('message is ' + this.message)
    },
    methods: {
      reverseMessage: function () {
        this.message = this.message.split('').reverse().join('')
      },
      doSomething: function () {
        alert('dosomething');
      },
      beforeSubmit: function () {
        alert('beforeSubmit')
      },
      sumbmit: function () {
        alert('sumbmit')
      }
    }
  }
</script>

<style scoped>
  .active{
    background-color: blue;
  }
  .unactive{
    background-color: red;
  }
  .Float{
    float: right;
  }
</style>
