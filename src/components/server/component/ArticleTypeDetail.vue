<template>
  <div>
    <Divider>
      类型树形图
    </Divider>
    <Row>
      <div id="myChart" :style="{width: '1480px', height: '300px'}" ref="mychart"></div>
    </Row>
    <Divider>类型详情表</Divider>
    <Row>
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
          <Button type="primary" @click="typeAddModalFlag=true" style="float: right;">
            添加
          </Button>
        </Col>
      </Row>
      <Table border="true" stripe="true" show-header="true" :data="tableData3" :columns="tableColumns3">
        <template slot-scope="{ row, index }" slot="action">
          <Button type="info" size="small" @click="showDetail(index)">详情</Button>
          <Button type="primary" size="small" @click="editorDetail(index)">编辑</Button>
          <Button type="error" size="small" @click="deleteDetail(index)">删除</Button>
        </template>
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pages.total" :current="pages.pageNum" :page-size="pages.pageSize"
                @on-change="changePage"></Page>
        </div>
      </div>
    </Row>
    <Row>
      <Modal v-model="typeModalFlag" draggable scrollable title="详情" @on-ok="onOk">
        <Form ref="formInline" :model="articleType" :label-width="80">
          <FormItem label="主键" prop="name">
            <Input v-model="articleType.typeId" :disabled="true" placeholder="Enter your name"></Input>
          </FormItem>
          <FormItem label="类型名" prop="name">
            <Input v-model="articleType.typeName" :disabled="editorFlag" placeholder="Enter your name"></Input>
          </FormItem>
          <FormItem label="创建时间" prop="name">
            <DatePicker type="datetime" placeholder="Select date" :disabled="true"
                        v-model="articleType.createTime"></DatePicker>
          </FormItem>
          <FormItem label="修改时间" prop="name">
            <DatePicker type="datetime" placeholder="Select date" :disabled="true"
                        v-model="articleType.updateTime"></DatePicker>
          </FormItem>
          <FormItem label="父类型">
            <Select v-model="articleType.parentId" :disabled="true">
              <Option v-for="type in typeparent" v-if="type.typeId!=articleType.typeId" :value="type.typeId">
                {{type.typeName}}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="用户名" prop="name" >
            <Input v-model="articleType.userId" placeholder="Enter your name" :disabled="true"></Input>
          </FormItem>
          <!--看情况,现在不需要-->
          <!--<FormItem label="是否为根节点" prop="name">-->
          <!--<i-switch v-model="articleType.rootFlag" size="large">-->
          <!--<span slot="open">On</span>-->
          <!--<span slot="close">Off</span>-->
          <!--</i-switch>-->
          <!--</FormItem>-->
        </Form>
      </Modal>
    </Row>
    <Row>
      <Modal v-model="typeAddModalFlag" draggable scrollable title="详情" @on-ok="addType">
        <Form ref="formInline" :model="articleTypeAdd" :label-width="80">
          <FormItem label="类型名" prop="name">
            <Input v-model="articleTypeAdd.typeName" placeholder="Enter your name"></Input>
          </FormItem>
          <FormItem label="父类型">
            <Select v-model="articleTypeAdd.parentId">
              <Option v-for="type in typeparent" v-if="type.typeId!=articleTypeAdd.typeId" :value="type.typeId">
                {{type.typeName}}
              </Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>
    </Row>
  </div>
</template>

<script>
  import global from '../../Global'

  export default {
    name: "ArticleTypeDetail",
    inject: ['reload'],
    data() {
      return {
        user: {},
        tableData3: [],
        loading: false,
        dateStart: '',
        dateEnd: '',
        inputValue: '',
        json: global.json,
        pages: {
          pageNum: 0,
          pageSize: 5,
          total: 0
        },
        articleType: {},
        typeModalFlag: false,
        typeparent: {},
        editorFlag: true,
        articleTypeAdd: {
          userId: this.getUser().userId,
          typeName: '',
          parentId: '',
          createTime: '',
          updateTime: '',
          rootFlag: false
        },
        typeAddModalFlag: false,
        myChart: '',
        articleTypeUrl: "http://www.niejiahao.cn:8080/articlesTypes/",
        articleTypeChartUrl: "http://www.niejiahao.cn:8080/articlesTypes/articlestypechart/",
        articleParentTypeUrl: "http://www.niejiahao.cn:8080/articlesTypes/search/parents/",
      }
    }
    ,
    computed: {
      tableColumns3() {
        let columns = [];
        if (this.showCheckbox) {
          columns.push({
            type: 'selection',
            width: 60,
            align: 'center'
          })
        }
        if (this.showIndex) {
          columns.push({
            type: 'index',
            width: 60,
            align: 'center'
          })
        }
        columns.push({
          title: '类型ID',
          key: 'typeId',
        });
        columns.push({
          title: '类型名称',
          key: 'typeName',
        });
        columns.push({
          title: '创建时间',
          key: 'createTime'
        });
        columns.push({
          title: '修改时间',
          key: 'updateTime',
        });
        columns.push({
          title: '上一级类型',
          key: 'parentId',
        });
        columns.push({
          title: '创建人',
          key: 'userId',
        });
        columns.push({
          title: '操作',
          align: 'center',
          slot: 'action',
        });
        return columns;
      }
    }
    ,
    mounted: function () {
      this.user = this.getUser();
      //图表
      this.showChart();
      //显示表格
      this.showTables();
      //增加和修改的上一级选项
      this.parentType();
    }
    ,
    methods: {
      addType: function () {
        this.$ajax({
          method: 'post',
          url: this.articleTypeUrl,
          data: this.$qs.stringify(this.articleTypeAdd),
        }).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message)
            return;
          }
          this.articleTypeAdd.typeName = ""
          this.articleTypeAdd.parentId = ""
          this.$Message.success(res.data.message)
          this.reload();
        }).catch((err) => {
          console.log(err);
        });
      },
      onOk: function () {
        //编辑状态
        if (!this.editorFlag) {
          this.$ajax({
            method: 'put',
            url: this.articleTypeUrl,
            data: this.$qs.stringify(this.articleType),
          }).then((res) => {
            if (!res.data.successFlag) {
              this.$Message.error(res.data.message)
              return;
            }
            this.$Message.success(res.data.message)
            this.reload();
          }).catch((err) => {
            console.log(err);
          });
        }
      },
      changePage: function (index) {
        this.pages.pageNum = index - 1;
        this.showTables();
      },
      showChart: function () {
        this.myChart = this.$echarts.init(document.getElementById('myChart'))
        let option;
        this.$ajax({
          method: 'post',
          url: this.articleTypeChartUrl,
        }).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            option = {
              tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
              },
              series: [
                {
                  type: 'tree',

                  data: [this.json],

                  left: '2%',
                  right: '2%',
                  top: '8%',
                  bottom: '20%',

                  symbol: 'emptyCircle',

                  orient: 'vertical',

                  expandAndCollapse: true,

                  label: {
                    normal: {
                      position: 'top',
                      rotate: -90,
                      verticalAlign: 'middle',
                      align: 'right',
                      fontSize: 9
                    }
                  },

                  leaves: {
                    label: {
                      normal: {
                        position: 'bottom',
                        rotate: -90,
                        verticalAlign: 'middle',
                        align: 'left'
                      }
                    }
                  },

                  animationDurationUpdate: 750
                }
              ]
            };
            this.myChart.hideLoading();
            this.myChart.setOption(option, true);
            return;
          }
          this.json = res.data.object;
          option = {
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
            },
            series: [
              {
                type: 'tree',

                data: [this.json],

                left: '2%',
                right: '2%',
                top: '8%',
                bottom: '20%',

                symbol: 'emptyCircle',

                orient: 'vertical',

                expandAndCollapse: true,

                label: {
                  normal: {
                    position: 'top',
                    rotate: -90,
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 9
                  }
                },

                leaves: {
                  label: {
                    normal: {
                      position: 'bottom',
                      rotate: -90,
                      verticalAlign: 'middle',
                      align: 'left'
                    }
                  }
                },

                animationDurationUpdate: 750
              }
            ]
          };
          this.myChart.hideLoading();
          this.myChart.setOption(option, true);
        }).catch((err) => {
          console.log(err);
          option = {
            tooltip: {
              trigger: 'item',
              triggerOn: 'mousemove'
            },
            series: [
              {
                type: 'tree',

                data: [this.json],

                left: '2%',
                right: '2%',
                top: '8%',
                bottom: '20%',

                symbol: 'emptyCircle',

                orient: 'vertical',

                expandAndCollapse: true,

                label: {
                  normal: {
                    position: 'top',
                    rotate: -90,
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 9
                  }
                },

                leaves: {
                  label: {
                    normal: {
                      position: 'bottom',
                      rotate: -90,
                      verticalAlign: 'middle',
                      align: 'left'
                    }
                  }
                },

                animationDurationUpdate: 750
              }
            ]
          };
          myChart.hideLoading();
          myChart.setOption(option);
        });
      },
      showTables: function () {
        let data = {};
        data['userId'] = this.user.userId;
        data['pageSize'] = this.pages.pageSize
        data['pageNum'] = this.pages.pageNum
        this.$ajax.get(this.articleTypeUrl, {params: this.$qs.parse(data)})
          .then((res) => {
            if (!res.data.successFlag) {
              console.log(res.data.message)
              this.$Notice.error(res.data.message)
              return;
            }
            this.tableData3 = res.data.object.content;
            this.pages.pageNum = res.data.object.pageNum + 1
            this.pages.pageSize = res.data.object.pageSize
            this.pages.total = res.data.object.total
          }).catch((err) => {
          console.log(err);
        });
      }
      ,
      parentType: function () {
        let data = {};
        data["userId"]=this.user.userId;

        this.$ajax.get(this.articleParentTypeUrl, {params: this.$qs.parse(data)})
          .then((res) => {
            console.log(res);
            if (!res.data.successFlag) {
              console.log(res.data.message)
              return;
            }
            this.typeparent = res.data.object;
          }).catch((err) => {
          console.log(err);
        });
      }
      ,
      searchDateChange: function (a, b) {
        let dates = a.toString().split(',');
        this.dateStart = dates[0];
        this.dateEnd = dates[1];
      }
      ,
      searchTextChange: function () {

      }
      ,
      showDetail: function (index) {
        let type = this.tableData3[index];
        this.$ajax({
          method: 'get',
          url: this.articleTypeUrl + type.typeId,
        }).then((res) => {
          console.log(res);
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            return;
          }
          this.articleType = res.data.object
          this.typeModalFlag = true;
          this.editorFlag = true;
        }).catch((err) => {
          console.log(err);
        });
      }
      ,
      editorDetail: function (index) {
        let type = this.tableData3[index];
        this.$ajax({
          method: 'get',
          url: this.articleTypeUrl + type.typeId,
        }).then((res) => {
          console.log(res);
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            return;
          }
          this.articleType = (res.data.object);
          this.typeModalFlag = true;
          this.editorFlag = false;
        }).catch((err) => {
          console.log(err);
        });
      }
      ,
      deleteDetail: function (index) {
        let type = this.tableData3[index];
        this.$ajax({
          method: 'delete',
          url: this.articleTypeUrl + type.typeId,
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
      }
    }
  }
</script>

<style scoped>

</style>
