<template>
  <div>
    <Row>
      <Col span="6">
        <DatePicker @on-change="searchDateChange" type="daterange" placeholder="请选择日期"
                    format="yyyy-MM-dd"></DatePicker>
      </Col>
      <Col span="6">
        <Input @on-change="searchTextChange" v-model="inputValue" placeholder="Enter something..." clearable>
          <Icon type="ios-search" slot="suffix"/>
        </Input>
      </Col>
      <Col span="6">
        <p></p>
      </Col>
      <Col span="6">
        <p></p>
      </Col>
    </Row>
    <br/>
    <Table stripe :data="tableData3" :columns="tableColumns3">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="info" size="small" @click="showArticle(index)">详情</Button>
        <Button type="primary" size="small" @click="editorArticle(index)">编辑</Button>
        <Button type="error" size="small" @click="deleteArticle(index)">删除</Button>
      </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pages.total" :current="pages.pageNum" :page-size="pages.pageSize"
              @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserDetail",
    data() {
      return {
        tableData3: [
          {
            firstTopic: 'JAVA5',
            browerCount: '1',
            likeCount: '2',
            typeId: '23FAA',
            createTime: '2019-2-03',
            updateTime: '2019-2-05',
            secondTopic: '阿发尽快发了房间',
            userId: '123',
            articleId: '123',
            content: 'https://blog.csdn.net/xiangjai/article/details/7523100',
          }
        ],
        pages: {
          pageNum: 0,
          pageSize: 5,
          total: 0
        },
        dateStart: '',
        dateEnd: '',
      }
    },
    computed: {
      tableColumns3() {
        let columns = [];
        columns.push({
          type: 'selection',
          width: 60,
          align: 'center'
        })
        columns.push({
          type: 'index',
          width: 60,
          align: 'center'
        })
        columns.push({
          title: '用户ID',
          key: 'userId',
          // sortable: true
        });
        columns.push({
          title: '创建时间',
          key: 'createTime'
        });
        columns.push({
          title: '修改时间',
          key: 'updateTime',
          // sortable: true,
          // filters: [
          //   {
          //     label: 'Greater than 25',
          //     value: 1
          //   },
          //   {
          //     label: 'Less than 25',
          //     value: 2
          //   }
          // ],
          // filterMultiple: false,
          // filterMethod(value, row) {
          //   if (value === 1) {
          //     return row.age > 25;
          //   } else if (value === 2) {
          //     return row.age < 25;
          //   }
          // }
        });
        columns.push({
          title: '邮箱',
          key: 'userEmail',
          // filters: [
          //   {
          //     label: 'New York',
          //     value: 'New York'
          //   },
          //   {
          //     label: 'London',
          //     value: 'London'
          //   },
          //   {
          //     label: 'Sydney',
          //     value: 'Sydney'
          //   }
          // ],
          // filterMethod(value, row) {
          //   return row.address.indexOf(value) > -1;
          // }
        });
        columns.push({
          title: '用户名',
          key: 'userName',
        });
        columns.push({
          title: '用户密码',
          key: 'userPassword',
        });
        columns.push({
          title: '是否禁用',
          key: 'userFlag',
        });
        columns.push({
          title: '操作',
          slot: 'action',
          align: 'center',
          width: '200%'
        });
        return columns;
      }
    },
    methods: {
      showTable: function (data) {
        this.$ajax({
          method: 'post',
          url: '/rest/bolg-server/users/',
          data: data
        }).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.object.message);
            return;
          }
          this.tableData3 = res.data.object.content;
          this.pages.pageSize = res.data.object.pageSize;
          this.pages.pageNum = res.data.object.pageNum + 1;
          this.pages.total = res.data.object.total;
        }).catch((err) => {
          console.log(err);
        });
      },
      showArticle: function (index) {

      },
      editorArticle: function (index) {

      },
      deleteArticle: function (index) {

      },
      searchTextChange: function () {

      }
      ,
      searchDateChange: function (a, b) {
        let dates = a.toString().split(',');
        this.dateStart = dates[0];
        this.dateEnd = dates[1];
      },
      changePage: function (index) {
        this.pages.pageNum = index - 1;
        let data = new window.FormData();
        data.append("pageSize", this.pages.pageSize);
        data.append("pageNum", this.pages.pageNum);
        this.showTables(data);
      }
    },
    mounted: function () {
      let data = new window.FormData();
      data.append("pageSize", this.pages.pageSize);
      data.append("pageNum", this.pages.pageNum);
      this.showTable(data);
    }
  }
</script>

<style scoped>

</style>
