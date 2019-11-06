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
        <!--        <Button type="info" size="small" @click="showArticle(index)">详情</Button>-->
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
    <br/>
    <Row>
      <Row>
        <Modal v-model="userFlag" draggable scrollable title="详情" @on-ok="onOk">
          <Form ref="formInline" :model="user" :label-width="80">
            <FormItem label="主键" prop="name">
              <Input v-model="user.userId" :disabled="true" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="名称" prop="name">
              <Input v-model="user.userName" :disabled="true" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="密码" prop="name">
              <Input v-model="user.userPassword" :disabled="true" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="创建时间" prop="name">
              <DatePicker type="datetime" placeholder="Select date" :disabled="true"
                          v-model="user.createTime"></DatePicker>
            </FormItem>
            <FormItem label="修改时间" prop="name">
              <DatePicker type="datetime" placeholder="Select date" :disabled="true"
                          v-model="user.updateTime"></DatePicker>
            </FormItem>
            <FormItem label="邮箱" prop="name">
              <Input type="email" placeholder="Select date"
                     v-model="user.userEmail"></Input>
            </FormItem>
            <FormItem label="是否禁用">
              <i-switch v-model="user.userFlag" size="large" @on-change="change">
                <span slot="open">On</span>
                <span slot="close">Off</span>
              </i-switch>
            </FormItem>
          </Form>
        </Modal>
      </Row>
    </Row>
  </div>
</template>

<script>
  import Global from '../../Global'

  export default {
    name: "UserDetail",
    inject: ['reload'],
    data() {
      return {
        tableData3: [],
        pages: {
          pageNum: Global.commmPageNum,
          pageSize: Global.commmPageSize,
          total: 0
        },
        dateStart: '',
        dateEnd: '',
        userUrl: 'http://localhost:8080/user/',
        userFlag: false,
        user: {}
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
        this.$ajax.get(this.userUrl, {params: this.$qs.parse(data)}).then((res) => {
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
        let user = this.tableData3[index];
        this.user = user;
        this.userFlag = true;
      },
      deleteArticle: function (index) {
          let user = this.tableData3[index];
          this.$ajax({
            method: 'delete',
            url: this.userUrl + user.userId,
          }).then((res) => {
            console.log(res);
            if (!res.data.successFlag) {
              this.$Message.error(res.data.message);
              return;
            }
            this.$Message.success(res.data.message);
            //重新加载信息
            this.reload();
          }).catch((err) => {
            console.log(err);
          });
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
        let data = {};
        data["pageSize"] = this.pages.pageSize;
        data["pageNum"] = this.pages.pageNum;
        this.showTables(data);
      },
      onOk: function () {
        alert("ok")
      },
      change(status) {
        this.$Message.info('开关状态：' + status);
      }
    },
    mounted: function () {
      let data = {};
      data["pageSize"] = this.pages.pageSize;
      data["pageNum"] = this.pages.pageNum;
      this.showTable(data);
    }
  }
</script>

<style scoped>

</style>
