<template>
  <div>
    <Table border stripe height="524" :loading="loading" :columns="columns1" :data="data1">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="showEvent(index)">详情</Button>
      </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pages.total" :current="pages.pageNum" :page-size="pages.pageSize"
              @on-change="changePage"></Page>
      </div>
    </div>
    <Modal title="日志详情" fullscreen v-model="show" :closable="false">
      <Form :label-width="80">
        <FormItem label="基础信息">
          <CellGroup>
            <Cell title="时间" :extra="event.eventUpdatetime"/>
            <Cell title="事件等级" :extra="event.eventLevel"/>
            <Cell title="简略描述" :extra="event.eventSimpleDesc"/>
          </CellGroup>
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
          }
        ],
        show: false,
        event: {},
        searchEvent: {},
        pages: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
      }
    },
    methods: {
      showEvent: function (index) {
        let findFlag = true;
        let event = this.data1[index];
        this.event = event;
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
      changePage: function (index) {
        this.pages.pageNum = index;
        this.getTableData();
      },
      getTableData: function () {
        let data = {};
        data['pageSize'] = this.pages.pageSize;
        data['pageNum'] = this.pages.pageNum - 1;
        let url = 'http://www.niejiahao.cn:8080/events/';
        data['order'] = 'desc';
        data['properties'] = 'eventUpdatetime'
        this.$ajax.get(url, {params: this.$qs.parse(data)}).then((res) => {
          //这里使用了ES6的语法
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            return;
          }
          this.pages.pageSize = res.data.object.pageSize;
          this.pages.pageNum = res.data.object.pageNum + 1;
          this.pages.total = res.data.object.total;
          this.data1 = res.data.object.content
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
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
      } else {
        this.getTableData();
      }
    }
  }
</script>

<style scoped>

</style>
