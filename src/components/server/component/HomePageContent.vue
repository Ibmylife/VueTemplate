<template>
  <div>
    <!--基本数据图-->
    <Row>
      <Col span="24">
        <ve-line :data="chartData"></ve-line>
      </Col>
    </Row>
    <br/>
    <!--    1.JVM图,接口调用-->
    <!--    2.接口调用出错比-->
    <!--    3.数据库查询和增加删除修改比-->
    <!--    4.访问地址信息图-->
    <Row>
      <Col span="6">
        <Row>
          <Col span="24">
            <ve-liquidfill :data="chartData1"></ve-liquidfill>
            <!--            <ve-gauge :data="chartData1" :settings="chartSettings1"></ve-gauge>-->
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <p style="text-align: center">JVM图</p>
          </Col>
        </Row>
      </Col>
      <Col span="6">
        <Row>
          <Col span="24">
            <ve-pie :data="chartData2"></ve-pie>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <p style="text-align: center">接口调用出错比</p>
          </Col>
        </Row>
      </Col>
      <Col span="6">
        <Row>
          <Col span="24">
            <ve-pie :data="chartData3"></ve-pie>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <p style="text-align: center">数据库查询和增加删除修改比</p>
          </Col>
        </Row>
      </Col>
      <Col span="6">
        <Row>
          <Col span="24">
            <ve-map :data="chartData4"></ve-map>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <p style="text-align: center">访问人地址</p>
          </Col>
        </Row>
      </Col>
    </Row>
    <br/>
    <Row>
      <Col span="24">
        <p></p>
      </Col>
    </Row>
    <br/>
    <Row>
      <!--应急错误事件-->
      <Col span="11">
        <Divider>应急错误事件</Divider>
        <Tabs value="name1">
          <TabPane label="错误" name="name1" icon="ios-bug">
            <Table border stripe height="320" :loading="loading" :columns="columns1" :data="data1">
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="showEvent(index)">详情</Button>
              </template>
            </Table>
          </TabPane>
          <TabPane label="警告" name="name2" icon="ios-warning">
            <Table border stripe height="320" :loading="loading" :columns="columns1" :data="data1">
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
              </template>
            </Table>
          </TabPane>
          <TabPane label="一般" name="name3" icon="ios-alert-outline">
            <Table border stripe height="320" :loading="loading" :columns="columns1" :data="data1">
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
              </template>
            </Table>
          </TabPane>
        </Tabs>
      </Col>
      <!--待处理任务-->
      <Col span="11" push="2">
        <Divider>待处理任务</Divider>
        <Tabs value="name1">
          <TabPane label="最近三天" name="name1" icon="ios-calendar">
            <Table border stripe height="320" :loading="loading" :columns="columns2" :data="data2">
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="showTask(index)">详情</Button>
              </template>
            </Table>
          </TabPane>
          <TabPane label="最近一周" name="name2" icon="ios-calendar">
            <Table border stripe height="320" :loading="loading" :columns="columns2" :data="data2">
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
              </template>
            </Table>
          </TabPane>
          <TabPane label="最近一月" name="name3" icon="ios-calendar">
            <Table border stripe height="320" :loading="loading" :columns="columns2" :data="data2">
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
              </template>
            </Table>
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "HomePageContent",
    created: function () {
    },
    mounted: function () {
      this.showChart();
    },
    data() {
      return {
        columns1: [
          {
            type: 'index',
            title: '序号'
          },
          {
            title: '事件等级',
            key: 'eventLevel',
            render: (h, params) => {
              if (params.row.eventLevel == 1) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'ios-bug'
                    }
                  }),
                  h('strong', '错误')
                ]);
              } else if (params.row.eventLevel == 2) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'ios-alert'
                    }
                  }),
                  h('strong', '警告')
                ]);
              } else if (params.row.eventLevel == 3) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'ios-alert-outline'
                    }
                  }),
                  h('strong', '一般')
                ]);
              } else {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'person'
                    }
                  }),
                  h('strong', '未知错误等级')
                ]);
              }
            }
          },
          {
            title: '简略描述',
            key: 'eventSimpleDesc'
          },
          {
            title: '最近发生时间',
            key: 'eventUpdatetime',
            sortable: true
          },
          {
            title: '发生次数',
            key: 'eventCount',
            sortable: true
          }, {
            title: '操作',
            slot: 'action',
          }
        ],
        data1: [
          {
            eventLevel: '1',
            eventSimpleDesc: '连接FTP异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '15',
          },
          {
            eventLevel: '2',
            eventSimpleDesc: '上传FTP文件异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '14',
          }
        ],
        columns2: [
          {
            type: 'index',
            title: '序号'
          },
          {
            title: '简略描述',
            key: 'taskLevel',
            render: (h, params) => {
              if (params.row.taskLevel == 1) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'ios-bug'
                    }
                  }),
                  h('strong', '紧急')
                ]);
              } else if (params.row.taskLevel == 2) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'ios-alert'
                    }
                  }),
                  h('strong', '近期')
                ]);
              } else if (params.row.taskLevel == 3) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'ios-alert-outline'
                    }
                  }),
                  h('strong', '一般')
                ]);
              } else {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'person'
                    }
                  }),
                  h('strong', '未知错误等级')
                ]);
              }
            }
          },
          {
            title: '简略描述',
            key: 'taskSimpleDesc'
          },
          {
            title: '预期执行时间',
            key: 'taskExecuteTime',
            sortable: true
          },
          {
            title: '创建时间',
            key: 'taskCreateTime',
            sortable: true
          }, {
            title: '操作',
            slot: 'action',
          }
        ],
        data2: [
          {
            taskLevel: '1',
            taskSimpleDesc: '连接FTP异常',
            taskExecuteTime: '2016-10-03 10:12:12',
            taskCreateTime: '2016-10-03 10:12:12',
            taskId: '12',
          },
          {
            taskLevel: '2',
            taskSimpleDesc: '上传FTP文件异常',
            taskExecuteTime: '2016-10-03 10:12:12',
            taskCreateTime: '2016-10-03 10:12:12',
            taskId: '13',
          }
        ],
        loading: false,
        chartData: {
          columns: ['日期', '文章', '评论', '浏览数'],
          rows: [
            {'日期': '礼拜一', '文章': 1, '评论': 1, '浏览数': 1},
            {'日期': '礼拜二', '文章': 2, '评论': 2, '浏览数': 3},
            {'日期': '礼拜三', '文章': 3, '评论': 2, '浏览数': 5},
            {'日期': '礼拜四', '文章': 4, '评论': 4, '浏览数': 4},
            {'日期': '礼拜五', '文章': 5, '评论': 4, '浏览数': 9},
            {'日期': '礼拜六', '文章': 6, '评论': 10, '浏览数': 11},
            {'日期': '礼拜七', '文章': 7, '评论': 10, '浏览数': 13}
          ]
        },
        chartData1: {
          columns: ['city', 'percent'],
          rows: [{
            city: '上海',
            percent: 0.6
          }
          ]
        },
        chartSettings1: {
          dimension: 'type',
          metrics: 'value'
        },
        chartData2: {
          columns: ['日期', '访问用户'],
          rows: [
            {'日期': '1/1', '访问用户': 1393},
            {'日期': '1/2', '访问用户': 3530},
            {'日期': '1/3', '访问用户': 2923},
            {'日期': '1/4', '访问用户': 1723},
            {'日期': '1/5', '访问用户': 3792},
            {'日期': '1/6', '访问用户': 4593}
          ]
        },
        chartData3: {
          columns: ['日期', '访问用户'],
          rows: [
            {'日期': '1/1', '访问用户': 1393},
            {'日期': '1/2', '访问用户': 3530},
            {'日期': '1/3', '访问用户': 2923},
            {'日期': '1/4', '访问用户': 1723},
            {'日期': '1/5', '访问用户': 3792},
            {'日期': '1/6', '访问用户': 4593}
          ]
        },
        chartData4: {
          columns: ['位置', '税收', '人口', '面积'],
          rows: [
            {'位置': '吉林', '税收': 123, '人口': 123, '面积': 92134},
            {'位置': '北京', '税收': 1223, '人口': 2123, '面积': 29234},
            {'位置': '上海', '税收': 2123, '人口': 1243, '面积': 94234},
            {'位置': '浙江', '税收': 4123, '人口': 5123, '面积': 29234}
          ]
        },
      }
    },
    methods: {
      //统计图
      showChart: function () {
        // let myChart = this.$echarts.init(document.getElementById('myChart'))
        // // let myChart = this.$echarts.init(this.$refs.mychart)
        // this.myChart=myChart;
        // let option = {
        //   title: {
        //     text: '统计图'
        //   },
        //   tooltip: {
        //     trigger: 'axis'
        //   },
        //   legend: {
        //     data: this.legendData
        //   },
        //   grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        //   },
        //   toolbox: {
        //     feature: {
        //       saveAsImage: {}
        //     }
        //   },
        //   xAxis: {
        //     type: 'category',
        //     boundaryGap: false,
        //     data: this.xAxisData
        //   },
        //   yAxis: {
        //     type: 'value'
        //   },
        //   series: this.series
        // };
        // this.myChart.setOption(option);
      }
      ,
      //表格
      show(index) {
        //TODO 这里等会改成向上传递数据,跳到异常详情页
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data1[index].name}<br>Age：${this.data1[index].age}<br>Address：${this.data1[index].address}`
        })
      }
      ,
      showEvent(index) {
        //这里等会改成向上传递数据,跳到异常详情页
        let params = {};
        params['eventId'] = this.data1[index].eventId;
        params['eventFlag'] = true;
        params['taskFlag'] = false;
        params['articleIdFlag'] = false;
        this.$emit('toContent', params);
      }
      ,
      showTask(index) {
        let params = {};
        params['eventFlag'] = false;
        params['articleIdFlag'] = false;
        params['taskFlag'] = true;
        params['taskId'] = this.data2[index].taskId;
        this.$emit('toContent', params);
      },
    }
  }

</script>

<style scoped>

</style>
