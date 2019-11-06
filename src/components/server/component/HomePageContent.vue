<template>
  <div>
    <!--基本数据图-->
    <Row>
      <Col span="24">
        <div ref="myChart" id="myChart" :style="{width: '1480px', height: '300px'}"></div>
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
      // this.showChart();
      // window.onresize = function () {
      //   this.myChart.resize();
      // }
    },
    mounted: function () {
      this.showChart();
    },
    data() {
      return {
        legendData: ['文章', '评论', '浏览数'],
        xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        series: [
          {
            name: '文章',
            type: 'line',
            stack: '总量',
            data: [1, 2, 3, 4, 5, 6, 7]
          },
          {
            name: '评论',
            type: 'line',
            stack: '总量',
            data: [1, 2, 2, 4, 4, 10, 10]
          },
          {
            name: '浏览数',
            type: 'line',
            stack: '总量',
            data: [1, 3, 5, 7, 9, 11, 13]
          },
        ],

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
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '13',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '12',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '11',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '10',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '9',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '8',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '7',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '6',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '5',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '4',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '3',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '2',
          },
          {
            eventLevel: '4',
            eventSimpleDesc: '定时任务异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '1',
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
          },
          {
            taskLevel: '3',
            taskSimpleDesc: '获取文章异常',
            taskExecuteTime: '2016-10-03 10:12:12',
            taskCreateTime: '2016-10-03 10:12:12',
            taskId: '14',
          },
          {
            taskLevel: '3',
            taskSimpleDesc: '获取文章异常',
            taskExecuteTime: '2016-10-03 10:12:12',
            taskCreateTime: '2016-10-03 10:12:12',
            taskId: '15',
          },
          {
            taskLevel: '3',
            taskSimpleDesc: '获取文章异常',
            taskExecuteTime: '2016-10-03 10:12:12',
            taskCreateTime: '2016-10-03 10:12:12',
            taskId: '16',
          },
          {
            taskLevel: '4',
            taskSimpleDesc: '定时任务异常',
            taskExecuteTime: '2016-10-03 10:12:12',
            taskCreateTime: '2016-10-03 10:12:12',
            taskId: '17',
          }
        ],
        loading: false,
        myChart: ''
      }
    },
    methods: {
      //统计图
      showChart: function () {
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // let myChart = this.$echarts.init(this.$refs.mychart)
        this.myChart=myChart;
        let option = {
          title: {
            text: '统计图'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: this.legendData
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: this.series
        };
        this.myChart.setOption(option);
      },
      //表格
      show(index) {
        //TODO 这里等会改成向上传递数据,跳到异常详情页
        this.$Modal.info({
          title: 'User Info',
          content: `Name：${this.data1[index].name}<br>Age：${this.data1[index].age}<br>Address：${this.data1[index].address}`
        })
      },
      showEvent(index) {
        //这里等会改成向上传递数据,跳到异常详情页
        let params = {};
        params['eventId'] = this.data1[index].eventId;
        params['eventFlag'] = true;
        params['taskFlag'] = false;
        params['articleIdFlag'] = false;
        this.$emit('toContent', params);
      },
      showTask(index) {
        let params = {};
        params['eventFlag'] = false;
        params['articleIdFlag'] = false;
        params['taskFlag'] = true;
        params['taskId'] = this.data2[index].taskId;
        this.$emit('toContent', params);
      }
    }
  }

</script>

<style scoped>

</style>
