<template>
  <div>
    <!--TODO 查询模块以后做-->
    <!--<Card>-->
      <!--<Form ref="formInline" :model="searchEvent" inline>-->
        <!--<FormItem label="事件登记">-->
          <!--<Select v-model="searchEvent.eventLevel">-->
            <!--<Option value="1">错误</Option>-->
            <!--<Option value="2">警告</Option>-->
            <!--<Option value="3">一般</Option>-->
          <!--</Select>-->
        <!--</FormItem>-->
        <!--<FormItem label="事件发生时间">-->
          <!--<Row>-->
            <!--<Col span="11">-->
              <!--<DatePicker type="date" placeholder="Select date" v-model="searchEvent.eventUpdatetimeStart"></DatePicker>-->
            <!--</Col>-->
            <!--<Col span="2" style="text-align: center">-</Col>-->
            <!--<Col span="11">-->
              <!--<DatePicker type="date" placeholder="Select date" v-model="searchEvent.eventUpdatetimeEnd"></DatePicker>-->
            <!--</Col>-->
          <!--</Row>-->
        <!--</FormItem>-->
        <!--<FormItem prop="eventUpdatetime">-->
          <!--<Input type="date" v-model="searchEvent.eventUpdatetime" :placeholder="new Date()">-->
            <!--<Icon type="ios-lock-outline" slot="prepend"></Icon>-->
          <!--</Input>-->
        <!--</FormItem>-->
        <!--<FormItem>-->
          <!--<Button type="primary" @click="handleSubmit('formInline')">Signin</Button>-->
        <!--</FormItem>-->
      <!--</Form>-->
    <!--</Card>-->
    <Table border stripe height="650" :loading="loading" :columns="columns1" :data="data1">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="showEvent(index)">详情</Button>
      </template>
    </Table>
    <Modal
      title="日志详情" fullscreen v-model="show" :closable="false">
      <Form :label-width="80">
        <FormItem label="基础信息">
          <CellGroup>
            <Cell title="事件等级" :extra="event.eventLevel"/>
            <Cell title="简略描述" :extra="event.eventSimpleDesc"/>
            <Cell title="最近发生时间" :extra="event.eventUpdatetime"/>
            <Cell title="最近处理时间" :extra="event.eventDealUpdateTime"/>
            <Cell title="发生次数" :extra="event.eventCount"/>
            <Cell title="持续时间" :extra="event.eventContiuneTime"/>
          </CellGroup>
        </FormItem>
        <Divider/>
        <FormItem label="最近是否解决">
          <i-switch v-model="event.eventUpdateFlag" :disabled="event.eventUpdateFlag"
                    @on-change="changeEventFlag($event)" style="float: right"
                    size="large">
            <span slot="true">On</span>
            <span slot="false">Off</span>
          </i-switch>
        </FormItem>
        <Divider/>
        <FormItem label="描述">
          <pre> {{event.eventDetail}}</pre>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import index from "../../../router";

  export default {
    name: "EventDetails",
    data() {
      return {
        switchValue: true,
        eventId: this.$route.params.eventId,
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
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '2',
            eventSimpleDesc: '上传FTP文件异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '14',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '13',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '12',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '11',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '10',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '9',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '8',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '7',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '6',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '5',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '4',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '3',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '3',
            eventSimpleDesc: '获取文章异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '2',
            eventDetail: '2016-10-03 10:12:12 发生错误哦',
          },
          {
            eventLevel: '4',
            eventSimpleDesc: '定时任务异常',
            eventUpdatetime: '2016-10-03 10:12:12',
            eventCount: 2,
            eventUpdateFlag: true,
            eventId: '1',
            eventDetail: 'Exception in thread "main" java.lang.ClassNotFoundException: afafad\r\n' +
              '\tat java.net.URLClassLoader.findClass(URLClassLoader.java:381)\r\n' +
              '\tat java.lang.ClassLoader.loadClass(ClassLoader.java:424)\r\n' +
              '\tat sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:331)\r\n' +
              '\tat java.lang.ClassLoader.loadClass(ClassLoader.java:357)\r\n' +
              '\tat java.lang.Class.forName0(Native Method)\r\n' +
              '\tat java.lang.Class.forName(Class.java:264)\r\n' +
              '\tat com.njh.config.config.main(config.java:73)\r\n',
          }
        ],
        show: false,
        event: {
          // 事件等级
          eventLevel: 4,
          // 简略描述
          eventSimpleDesc: '定时任务异常',
          // 最近发生时间
          eventUpdatetime: '2016-10-03 10:12:12',
          // 最近处理时间
          eventDealUpdateTime: '2016-10-03 10:12:12',
          // 最近是否解决
          eventUpdateFlag: true,
          // 发生次数
          eventCount: 11,
          // 详情
          eventDetail: '2016-10-03 10:12:12 发生错误哦',
          // 持续时间
          eventContiuneTime: '2016-10-03 10:12:12',
        },
        searchEvent: {
          // 事件等级
          eventLevel: 4,
          // 简略描述
          eventSimpleDesc: '定时任务异常',
          // 最近发生时间
          eventUpdatetimeStart: '2016-10-03 10:12:12',
          eventUpdatetimeEnd: '2016-10-03 10:12:12',
          // 最近处理时间
          eventDealUpdateTime: '2016-10-03 10:12:12',
          // 最近是否解决
          eventUpdateFlag: true,
          // 发生次数
          eventCount: 11,
          // 详情
          eventDetail: '2016-10-03 10:12:12 发生错误哦',
          // 持续时间
          eventContiuneTime: '2016-10-03 10:12:12',
        }
      }
    },
    methods: {
      showEvent: function (index) {
        let findFlag = false;
        this.data1.forEach(t => {
          if (t.eventId == index) {
            this.event = t;
            findFlag = true;
            return;
          }
        });
        if (!findFlag) {

        }
        this.openDialog();
      },
      getTableInfo: function () {

      },
      openDialog: function () {
        this.show = !this.show;
      },
      getEvent: function () {
        alert('本地缓存不存在,调用接口获取');
      },
      changeEventFlag: function (flag) {
        let confirmFlag = false;
        let content = "";
        if (!flag) {
          content = "错误确定修改好了吗?";
        } else {
          content = "错误确定不修改了吗?";
        }
        confirmFlag = confirm(content);
        if (confirmFlag) {
          //todo 发送ajax请求

        } else {

          return;

        }
      }
    },
    watch: {
      $route() {
        if (this.$route.params.eventId != undefined) {
          this.eventId = this.$route.params.eventId;
        }
      },
      eventId: function () {
        this.openDialog();
      }
    },
    mounted: function () {
      this.getTableInfo();
      if (this.eventId != undefined) {
        this.showEvent(this.eventId);
      }
    }
  }
</script>

<style scoped>

</style>
