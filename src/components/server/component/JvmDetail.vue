<template>
  <div>
    <Tabs>
      <TabPane label="概览" icon="logo-tux">
        <Row>
          <Col span="11">
            <Divider orientation="left">内存使用量</Divider>
            <Row>
              <ve-line :data="chartMemoryData" :settings="chartMemorySettings"></ve-line>
            </Row>
            <Row>
              <Col span="8" style="text-align: center">
                <Tag color="primary">已用:{{Math.round(jvmHeapChartInfo.jvm_memory_used)}}M</Tag>
              </Col>
              <Col span="8" style="text-align: center">
                <Tag color="primary">已提交:{{Math.round(jvmHeapChartInfo.jvm_memory_committed)}}M</Tag>
              </Col>
              <Col span="8" style="text-align: center">
                <Tag color="primary">最大:{{Math.round(jvmHeapChartInfo.jvm_memory_max)}}M</Tag>
              </Col>
            </Row>
          </Col>
          <Col span="2">
          </Col>
          <Col span="11">
            <Divider orientation="left">线程</Divider>
            <Row>
              <ve-line :data="chartThreadsData" :settings="chartClassesSettings"></ve-line>
            </Row>
            <Row>
              <Col span="6" style="text-align: center">
                <Tag color="primary">总计: {{jvmThreadsChartInfo.jvm_threads_total}}</Tag>
              </Col>
              <Col span="6" style="text-align: center">
                <Tag color="primary">活动线程: {{jvmThreadsChartInfo.jvm_threads_live}}</Tag>
              </Col>
              <Col span="6" style="text-align: center">
                <Tag color="primary">活动线程峰值: {{jvmThreadsChartInfo.jvm_threads_peak}}</Tag>
              </Col>
              <Col span="6" style="text-align: center">
                <Tag color="primary">守护线程数: {{jvmThreadsChartInfo.jvm_threads_daemon}}</Tag>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <Divider orientation="left">类</Divider>
            <Row>
              <ve-line :data="chartClassesData" :settings="chartClassesSettings"></ve-line>
            </Row>
            <Row>
              <Col span="8" style="text-align: center">
                <Tag color="primary">总数: {{jvmClassChartInfo.jvm_classes_total}}</Tag>
              </Col>
              <Col span="8" style="text-align: center">
                <Tag color="primary">已加载类: {{jvmClassChartInfo.jvm_classes_loaded}}</Tag>
              </Col>
              <Col span="8" style="text-align: center">
                <Tag color="primary">未加载类: {{jvmClassChartInfo.jvm_classes_unloaded}}</Tag>
              </Col>
            </Row>
          </Col>
          <Col span="2">
          </Col>
          <Col span="11">
            <Divider orientation="left">CUP占用率</Divider>
            <Row>
              <ve-line :data="chartCpuData" :settings="chartClassesSettings"></ve-line>
            </Row>
            <Row>
              <Col span="12" style="text-align: center">
                <Tag color="primary">系统 CPU 使用率 {{jvmCupChartInfo.system_cpu_usage}}%</Tag>
              </Col>
              <Col span="12" style="text-align: center">
                <Tag color="primary">当前 jvm CPU 使用率 {{jvmCupChartInfo.process_cpu_usage}}%</Tag>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider/>
      </TabPane>
      <TabPane label="内存" icon="logo-tux">
        <Row>
          <Col span="7">
            <Form :label-width="80">
              <FormItem label="图表(C):">
                <Select v-model="model1" style="width: 100%;" v-on:on-change="changeMemoryChart" value="1">
                  <Option value="1" key="1">
                    堆内存使用量
                  </Option>
                  <Option value="2" key="2">
                    非堆内存使用量
                  </Option>
                  <Option value="3" key="3">
                    内存池 PS Old GEN
                  </Option>
                  <Option value="4" key="4">
                    内存池 PS Eden Sapce
                  </Option>
                  <Option value="5" key="5">
                    内存池 PS Survivor Sapce
                  </Option>
                  <Option value="6" key="6">
                    内存池 Metasapce
                  </Option>
                  <Option value="7" key="7">
                    内存池 Code Cache
                  </Option>
                  <Option value="8" key="8">
                    内存池 Compressed Class Space
                  </Option>
                </Select>
              </FormItem>
            </Form>
          </Col>
          <Col span="1">
            <p></p>
          </Col>
          <Col span="7">
            <!--            <Form :label-width="80">-->
            <!--              <FormItem label="时间范围">-->
            <!--                <Select v-model="model2" style="width: 100%;">-->
            <!--                  <Option value="1" key="1">-->
            <!--                    全部-->
            <!--                  </Option>-->
            <!--                  <Option value="2" key="2">-->
            <!--                    12小时-->
            <!--                  </Option>-->
            <!--                  <Option value="3" key="3">-->
            <!--                    7天-->
            <!--                  </Option>-->
            <!--                  <Option value="4" key="4">-->
            <!--                    1个月-->
            <!--                  </Option>-->
            <!--                  <Option value="5" key="5">-->
            <!--                    3个月-->
            <!--                  </Option>-->
            <!--                  <Option value="6" key="6">-->
            <!--                    6个月-->
            <!--                  </Option>-->
            <!--                  <Option value="7" key="7">-->
            <!--                    一年-->
            <!--                  </Option>-->
            <!--                </Select>-->
            <!--              </FormItem>-->
            <!--            </Form>-->
          </Col>
          <Col span="1">
            <p></p>
          </Col>
          <Col span="7">
            <!--            <Form :label-width="80">-->
            <!--              <FormItem label="">-->
            <!--                <Button type="primary" shape="circle" size="small" style="float: right;" v-on:click="invokeGc()">执行GC-->
            <!--                </Button>-->
            <!--              </FormItem>-->
            <!--            </Form>-->
          </Col>
        </Row>
        <Row>
          <ve-line :data="chartHeapOrNoHeapData" :settings="chartHeapOrNoHeapSettings"></ve-line>
        </Row>
        <Row>

        </Row>
      </TabPane>
      <TabPane label="线程" icon="logo-tux">
        <Row>
          <Col span="24">
            <!--            <Form :label-width="80">-->
            <!--              <FormItem label="时间范围">-->
            <!--                <Select v-model="model2" style="width: 100%;">-->
            <!--                  <Option value="1" key="1">-->
            <!--                    全部-->
            <!--                  </Option>-->
            <!--                  <Option value="2" key="2">-->
            <!--                    12小时-->
            <!--                  </Option>-->
            <!--                  <Option value="3" key="3">-->
            <!--                    7天-->
            <!--                  </Option>-->
            <!--                  <Option value="4" key="4">-->
            <!--                    1个月-->
            <!--                  </Option>-->
            <!--                  <Option value="5" key="5">-->
            <!--                    3个月-->
            <!--                  </Option>-->
            <!--                  <Option value="6" key="6">-->
            <!--                    6个月-->
            <!--                  </Option>-->
            <!--                  <Option value="7" key="7">-->
            <!--                    一年-->
            <!--                  </Option>-->
            <!--                </Select>-->
            <!--              </FormItem>-->
            <!--            </Form>-->
          </Col>
        </Row>
        <Row>
          <ve-line :data="chartThreadsData" :settings="chartThreadsSettings"></ve-line>
        </Row>
      </TabPane>
      <TabPane label="类" icon="logo-tux">
        <Row>
          <!--          <Col span="24">-->
          <!--            <Form :label-width="80">-->
          <!--              <FormItem label="时间范围">-->
          <!--                <Select v-model="model2" style="width: 100%;">-->
          <!--                  <Option value="1" key="1">-->
          <!--                    全部-->
          <!--                  </Option>-->
          <!--                  <Option value="2" key="2">-->
          <!--                    12小时-->
          <!--                  </Option>-->
          <!--                  <Option value="3" key="3">-->
          <!--                    7天-->
          <!--                  </Option>-->
          <!--                  <Option value="4" key="4">-->
          <!--                    1个月-->
          <!--                  </Option>-->
          <!--                  <Option value="5" key="5">-->
          <!--                    3个月-->
          <!--                  </Option>-->
          <!--                  <Option value="6" key="6">-->
          <!--                    6个月-->
          <!--                  </Option>-->
          <!--                  <Option value="7" key="7">-->
          <!--                    一年-->
          <!--                  </Option>-->
          <!--                </Select>-->
          <!--              </FormItem>-->
          <!--            </Form>-->
          <!--          </Col>-->
        </Row>
        <Row>
          <ve-line :data="chartClassesData" :settings="chartClassesSettings"></ve-line>
        </Row>
        <Row>
          <Card :bordered="false">
            <p slot="title">详细信息</p>
            <p>时间:{{jvmClassChartInfo.time}}</p>
            <Divider/>
            <p>已加装当前类:{{jvmClassChartInfo.jvm_classes_loaded}}</p>
            <Divider/>
            <p>已加载总数: {{jvmClassChartInfo.jvm_classes_total}}</p>
            <Divider/>
            <p>已卸载总数: {{jvmClassChartInfo.jvm_classes_unloaded}}</p>
          </Card>
        </Row>
      </TabPane>
      <TabPane label="VM概要" icon="logo-tux">
        <div style="text-align:center">
          <p>VM概要</p>
          <p>{{jvmHeapChartInfo.time}}</p>
        </div>
        <Divider/>
        <Row>
          <Col span="12">
            <CellGroup>
              <Cell title="连接名称:" :extra="chartSysinfoDataInfo.applicationPid"/>
              <Cell title="虚拟机:" :extra="chartSysinfoDataInfo.vmName+'版本'+chartSysinfoDataInfo.version"/>
              <Cell title="供应商:" :extra="chartSysinfoDataInfo.vmVendor"/>
              <Cell title="名称:" :extra="chartSysinfoDataInfo.name"/>
            </CellGroup>
          </Col>
          <Col span="12">
            <CellGroup>
              <Cell title="运行时间:" extra="不知道"/>
              <Cell title="进程 CPU 时间:" extra="不知道"/>
              <Cell title="JIT 编译器:" extra="不知道"/>
              <Cell title="总编译时间:" extra="不知道"/>
            </CellGroup>
          </Col>
        </Row>
        <Divider/>
        <Row>
          <Col span="12">
            <CellGroup>
              <Cell title="活动线程:"   :extra="jvmThreadsChartInfo.jvm_threads_live"/>
              <Cell title="峰值:"    :extra="jvmThreadsChartInfo.jvm_threads_peak"/>
              <Cell title="守护程序线程:"   :extra="jvmThreadsChartInfo.jvm_threads_daemon"/>
              <Cell title="启动的线程总数:"  :extra="jvmThreadsChartInfo.jvm_threads_total"/>
            </CellGroup>
          </Col>
          <Col span="12">
            <CellGroup>
              <Cell title="已加装当前类: " :extra="jvmClassChartInfo.jvm_classes_loaded"/>
              <Cell title="已加载类总数: " :extra="jvmClassChartInfo.jvm_classes_total"/>
              <Cell title="已卸载类总数: " :extra="jvmClassChartInfo.jvm_classes_unloaded"/>
            </CellGroup>
          </Col>
        </Row>
        <Divider/>
        <Row>
          <Col span="12">
            <CellGroup>
              <Cell title="当前堆大小:" :extra="jvmHeapChartInfo.jvm_memory_used"/>
              <Cell title="最大堆大小:" :extra="jvmHeapChartInfo.jvm_memory_max"/>
            </CellGroup>
          </Col>
          <Col span="12">
            <CellGroup>
              <Cell title="提交的内存:" :extra="jvmHeapChartInfo.jvm_memory_committed"/>
              <Cell title="暂挂最终处理:" extra="不知道"/>
            </CellGroup>
          </Col>
        </Row>
        <Row>
          <CellGroup>
            <Cell title="垃圾收集器:" extra="不知道"/>
            <Cell title="垃圾收集器:" extra="不知道"/>
          </CellGroup>
        </Row>
        <Divider/>
        <Row>
          <Col span="12">
            <CellGroup>
              <Cell title="操作系统:" :extra="chartSysinfoDataInfo.name"/>
              <Cell title="体系结构:" :extra="chartSysinfoDataInfo.arch"/>
              <Cell title="处理程序数:" :extra="chartSysinfoDataInfo.availableProcessors"/>
              <Cell title="提交的虚拟内存:" extra="不知道"/>
            </CellGroup>
          </Col>
          <Col span="12">
            <CellGroup>
              <Cell title="总物理内存:" extra="不知道"/>
              <Cell title="空闲物理内存:" extra="不知道"/>
              <Cell title="总交换空间:" extra="不知道"/>
              <Cell title="空闲交换空间:" extra="不知道"/>
            </CellGroup>
          </Col>
        </Row>
        <Divider/>
        <Row>
          <Col span="24">
            <CellGroup>
              <div v-on:click="showVmDetail(1)">
                <Cell title="VM 参数:" extra="点击查看详情"/>
              </div>
              <div v-on:click="showVmDetail(2)">
                <Cell title="类路径:" extra="点击查看详情"/>
              </div>
              <div v-on:click="showVmDetail(3)">
                <Cell title="库路径:" extra="点击查看详情"/>
              </div>
              <div v-on:click="showVmDetail(4)">
                <Cell title="引导类路径:" extra="点击查看详情"/>
              </div>
            </CellGroup>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
    <Drawer title="查看信息" :closable="false" v-model="valueDrawerJson.flag" :transfer="true" :draggable="true" :width="50"
            :scrollable="true">
      <p>
        {{valueDrawerJson.info}}
      </p>
    </Drawer>
  </div>
</template>

<script>

  export default {
    name: "JvmDetail",
    data() {
      return {
        valueDrawerJson: {
          flag: false,
          info: ''
        },
        interval: '',
        chartMemorySettings: {
          stack: {'memory': ['time', 'jvm_memory_used']},
          area: true
        },
        chartMemoryData: {
          columns: ['time', 'jvm_memory_used'],
          rows: []
        },
        chartClassesSettings: {
          stack: {'memory': ['time', 'jvm_classes_loaded']},
          area: true
        },
        chartClassesData: {
          columns: ['time', 'jvm_classes_loaded'],
          rows: []
        },
        chartThreadsSettings: {
          stack: {'memory': ['time', 'jvm_threads_live', 'jvm_threads_peak']},
          area: true
        },
        chartThreadsData: {
          columns: ['time', 'jvm_threads_live', 'jvm_threads_peak'],
          rows: []
        },
        chartCpuSettings: {
          stack: {'memory': ['time', 'system_cpu_count', 'system_cpu_usage', 'process_cpu_usage']},
          area: true
        },
        chartCpuData: {
          columns: ['time', 'system_cpu_usage', 'process_cpu_usage'],
          rows: []
        },
        chartHeapOrNoHeapSettings: {
          stack: {'memory': ['time', 'max', 'used']},
          area: true
        },
        chartHeapOrNoHeapData: {
          columns: ['time', 'max', 'used'],
          rows: []
        },
        chartHeapOrNoHeapDatas: {},
        chartHeapOrNoHeapDataInfo: {},
        chartSysinfoDataInfo: {},
        model1: '',//这个是下拉框用的
        model2: '',//这个是下拉框用的
        headMemoryUrl: 'http://www.niejiahao.cn:8080/jvm/memory',
        jvmClassesUrl: 'http://www.niejiahao.cn:8080/jvm/classes',
        jvmTrheadsUrl: 'http://www.niejiahao.cn:8080/jvm/threads',
        jvmCpuUrl: 'http://www.niejiahao.cn:8080/jvm/cpu',
        jvmMemoryUrl: 'http://www.niejiahao.cn:8080/jvm/heapOrNoheap',
        jvmSysUrl: 'http://www.niejiahao.cn:8080/jvm/sysInfo',
        jvmHeapChartInfo: {},
        jvmClassChartInfo: {},
        jvmThreadsChartInfo: {},
        jvmCupChartInfo: {},
      }
    },
    methods: {
      getData: function (url, data) {
        this.$ajax.get(url, {params: this.$qs.parse(data)})
          .then((res) => {
            if (!res.data.success) {
              console.log(res)
              this.$Notice.error(res.data.errorMessage)
              return;
            }
            console.log(res)
          }).catch((err) => {
          console.warn('服务器连接错误，请稍后再试' + err);
        });
      },
      invokeGc: function () {
        alert("执行GC")
      },
      showVmDetail: function (value) {
        if (value == 1) {
          this.valueDrawerJson.flag = true;
          this.valueDrawerJson.info = this.chartSysinfoDataInfo.systemProperties;
        } else if (value == 2) {
          this.valueDrawerJson.flag = true;
          this.valueDrawerJson.info = this.chartSysinfoDataInfo.classPath;
        } else if (value == 3) {
          this.valueDrawerJson.flag = true;
          this.valueDrawerJson.info = this.chartSysinfoDataInfo.libraryPath;
        } else if (value == 4) {
          this.valueDrawerJson.flag = true;
          this.valueDrawerJson.info = this.chartSysinfoDataInfo.bootClassPath;
        }
      },
      showHeapDetail: function () {
        //显示堆内存时间
        let data = {};
        let url = this.headMemoryUrl;
        this.$ajax.get(url, {params: this.$qs.parse(data)}).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            return;
          }
          //请求成功返回的数据
          this.chartMemoryData.rows = res.data.object;
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      showClassesDetail: function () {
        //显示堆内存时间
        let data = {};
        let url = this.jvmClassesUrl;
        this.$ajax.get(url, {params: this.$qs.parse(data)}).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            return;
          }
          //请求成功返回的数据
          this.chartClassesData.rows = res.data.object;
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      showThreadsDetail: function () {
        //显示堆内存时间
        let data = {};
        let url = this.jvmTrheadsUrl;
        this.$ajax.get(url, {params: this.$qs.parse(data)}).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            return;
          }
          //请求成功返回的数据
          this.chartThreadsData.rows = res.data.object;
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      showCpuDetail: function () {
        //显示堆内存时间
        let data = {};
        let url = this.jvmCpuUrl;
        this.$ajax.get(url, {params: this.$qs.parse(data)}).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            return;
          }
          //请求成功返回的数据
          this.chartCpuData.rows = res.data.object;
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      changeMemoryChart: function (value) {
        if (value == 1) {
          this.chartHeapOrNoHeapData.rows = this.chartHeapOrNoHeapDatas['heap']
        }
        if (value == 2) {
          this.chartHeapOrNoHeapData.rows = this.chartHeapOrNoHeapDatas['nonheap']
        }
        if (value == 3) {
          this.chartHeapOrNoHeapData.rows = this.chartHeapOrNoHeapDatas['psoldgen']
        }
        if (value == 4) {
          this.chartHeapOrNoHeapData.rows = this.chartHeapOrNoHeapDatas['psedenspace']
        }
        if (value == 5) {
          this.chartHeapOrNoHeapData.rows = this.chartHeapOrNoHeapDatas['pssurvivorspace']
        }
        if (value == 6) {
          this.chartHeapOrNoHeapData.rows = this.chartHeapOrNoHeapDatas['metaspace']
        }
        if (value == 7) {
          this.chartHeapOrNoHeapData.rows = this.chartHeapOrNoHeapDatas['codecache']
        }
        if (value == 8) {
          this.chartHeapOrNoHeapData.rows = this.chartHeapOrNoHeapDatas['compressedclassspace']
        }
      },
      showMemoryChart: function () {
        //显示堆内存时间
        let data = {};
        let url = this.jvmMemoryUrl;
        this.$ajax.get(url, {params: this.$qs.parse(data)}).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            return;
          }
          //请求成功返回的数据
          this.chartHeapOrNoHeapDatas = res.data.object;
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      showSysInfoChart: function () {
        //显示堆内存时间
        let data = {};
        let url = this.jvmSysUrl;
        this.$ajax.get(url, {params: this.$qs.parse(data)}).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            return;
          }
          //请求成功返回的数据
          this.chartSysinfoDataInfo = res.data.object;
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      }
    },
    mounted() {
      this.interval = setInterval(() => {
        this.showHeapDetail();
        this.showClassesDetail();
        this.showThreadsDetail();
        this.showCpuDetail();
        this.showMemoryChart();
        this.showSysInfoChart();
      }, 10000);
    }
    ,
    destroyed() {
      window.clearTimeout(this.interval);
    },
    watch: {
      'chartMemoryData.rows': function () {
        if (this.chartMemoryData.rows == null) {
          return;
        }
        let rows = this.chartMemoryData.rows;
        let length = rows.length;
        this.jvmHeapChartInfo = rows[length - 1];
      },
      'chartClassesData.rows': function () {
        if (this.chartClassesData.rows == null) {
          return;
        }
        let rows = this.chartClassesData.rows;
        let length = rows.length;
        this.jvmClassChartInfo = rows[length - 1];
      },
      'chartThreadsData.rows': function () {
        if (this.chartThreadsData.rows == null) {
          return;
        }
        let rows = this.chartThreadsData.rows;
        let length = rows.length;
        this.jvmThreadsChartInfo = rows[length - 1];
      }
      ,
      'chartCpuData.rows': function () {
        if (this.chartCpuData.rows == null) {
          return;
        }
        let rows = this.chartCpuData.rows;
        let length = rows.length;
        this.jvmCupChartInfo = rows[length - 1];
      },
      'chartHeapOrNoHeapDatas': function () {
        if (this.chartHeapOrNoHeapDatas == null) {
          return;
        }
        let heapRows = this.chartHeapOrNoHeapDatas['heap'];
        let nonheapRows = this.chartHeapOrNoHeapDatas['nonheap'];
        let heaplength = heapRows.length;
        let nonheaplength = nonheapRows.length;
        this.chartHeapOrNoHeapDataInfo.heapInfo = heapRows[heaplength - 1];
        this.chartHeapOrNoHeapDataInfo.nonheapInfo = nonheapRows[nonheaplength - 1];
      }
    }
  }
</script>

<style scoped>

</style>
