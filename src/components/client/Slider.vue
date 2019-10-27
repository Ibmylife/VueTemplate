<template>
  <div>
    <Card title="近期新增" icon="md-flag" :padding="0" shadow>
      <CellGroup>
        <div v-for="article in articles">
          <Cell v-bind:title="article.firsttopic" v-bind:extra="article.brower_count"
                v-bind:onclick="showArticle(article.article_id)"/>
        </div>
      </CellGroup>
    </Card>
    <br/>
    <Card title="阅读量排行" icon="md-flag" :padding="0" shadow>
      <CellGroup>
        <div v-for="article in articles">
          <Cell v-bind:title="article.firsttopic" v-bind:extra="article.brower_count"
                v-bind:onclick="showArticle(article.article_id)"/>
        </div>
      </CellGroup>
    </Card>
    <br/>
    <Card title="时间" icon="md-clock" :padding="0" shadow>
      <CellGroup>
        <div v-for="time in times">
          <Cell v-bind:title="time.date" v-bind:extra="time.count"
                v-bind:onclick="showDate(time.date)"/>
        </div>
      </CellGroup>
    </Card>
    <br/>
    <Card title="分类" icon="md-funnel" :padding="0" shadow>
      <CellGroup>
        <div v-for="type in types">
          <Cell v-bind:title="type.name" v-bind:extra="type.count"
                v-bind:onclick="showType(type.typeid)"/>
        </div>
      </CellGroup>
    </Card>
  </div>
</template>

<script>
  export default {
    name: "Slider",
    data() {
      return {
        articles: [
          {
            firsttopic: 'ceshi',
            brower_count: '2',
            article_id: '12',
          },
          {
            firsttopic: 'ceshi',
            brower_count: '2',
            article_id: '12',
          },
          {
            firsttopic: 'ceshi',
            brower_count: '2',
            article_id: '12',
          },
          {
            firsttopic: 'ceshi',
            brower_count: '2',
            article_id: '12',
          }
        ]
        ,
        types:[
          {
            name:'java',
            count:'12',
            typeid:'2'
          },
          {
            name:'javascript',
            count:'13',
            typeid:'2'
          },
          {
            name:'sql',
            count:'14',
            typeid:'2'
          },
          {
            name:'spring',
            count:'15',
            typeid:'2'
          }
        ]
        ,
        times:[
          {
            date:'2019-02-03',
            count:'12',
          },
          {
            date:'2019-02-04',
            count:'13',
          },
          {
            date:'2019-02-05',
            count:'14',
          },
          {
            date:'2019-02-06',
            count:'15',
          }
        ]
      }
    },
    methods: {
      showArticle: function (index) {
        this.$emit('toArticle', index);
      },
      showType: function (index) {
      },
      showDate: function (index) {
      }
    }
  }
</script>

<style scoped>

</style>
