<template>
  <div>
    <Row>
      <div style="float: right;">
        <Button type="primary" shape="circle" icon="ios-paper-plane" :loading="false" @click="value1 = true">连接</Button>
      </div>
    </Row>
    <Tabs>
      <TabPane label="系统信息" icon="logo-apple">
        <Row>
        </Row>
        <Row>
          <Col span="6">
            <Icon custom="i-icon i-icon-shop_fill" size="24"/>
            系统名称:{{state.systemInfo.name}}
          </Col>
          <Col span="6">
            <Icon custom="i-icon i-icon-shop_fill" size="24"/>
            系统架构:{{state.systemInfo.arch}}
          </Col>
          <Col span="6">
            <Icon custom="i-icon i-icon-shop_fill" size="24"/>
            系统版本:{{state.systemInfo.version}}
          </Col>
          <Col span="6">
            <Icon custom="i-icon i-icon-shop_fill" size="24"/>
            可用处理器个数:{{state.systemInfo.availableProcessors}}
          </Col>
        </Row>
        <Divider/>
        <Row>
          <Col span="6">
            物理内存 (G):{{state.systemInfo.totalPhysicalMemorySize/1024/1024/1024}}
          </Col>
          <Col span="6">
            系统 CPU 使用:{{state.systemInfo.systemCpuLoad * 100}} %
          </Col>
          <Col span="6">
            当前 JVM CPU 使用率:{{state.systemInfo.processCpuLoad * 100}}%
          </Col>
          <Col span="6">
            最后一分钟 CPU 平均负载:{{state.systemInfo.systemLoadAverage}}
          </Col>
        </Row>
        <Divider/>
        <Row>
          <Col span="6">
            已提交内存(MB):{{state.systemInfo.committedVirtualMemorySize/1024/1024}}
          </Col>
          <Col span="6">
            空闲内存 (MB){{state.systemInfo.freePhysicalMemorySize/1024/1024}}
          </Col>
          <Col span="6">
            交换内存空间 (MB):{{state.systemInfo.totalSwapSpaceSize/1024/1024}}
          </Col>
          <Col span="6">
            空闲交换空间 (MB):{{state.systemInfo.freeSwapSpaceSize/1024/1024}}
          </Col>
        </Row>
        <Divider/>
      </TabPane>
      <TabPane label="MBean" icon="logo-windows">
        标签二的内容
        <Divider/>
      </TabPane>
      <TabPane label="概览" icon="logo-tux">
        <Row>
          <Col span="12">
            <Divider orientation="left">堆内存使用量</Divider>
          </Col>
          <Col span="12">
            <Divider orientation="left">线程</Divider>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <Divider orientation="left">类</Divider>
          </Col>
          <Col span="12">
            <Divider orientation="left">CUP占用率</Divider>
          </Col>
        </Row>
        <Divider/>
      </TabPane>
      <TabPane label="内存" icon="logo-tux">
        <Divider></Divider>
      </TabPane>
      <TabPane label="线程" icon="logo-tux">
        <Divider></Divider>
      </TabPane>
      <TabPane label="类" icon="logo-tux">
        <Divider></Divider>
      </TabPane>
      <TabPane label="VM概要" icon="logo-tux">
        <Divider></Divider>
      </TabPane>
    </Tabs>
    <Drawer title="连接JVM" :closable="false" v-model="value1" :transfer="true" :draggable="true" :width="35"
            :scrollable="true">
      <List header="Header" footer="Footer" border>
        <ListItem v-for="oneInfo in this.jvmList">
          <Row>
            <Col span="12">
              <p v-if="oneInfo.name==''">无名称</p>
              <p v-else>{{oneInfo.name}}</p>
            </Col>
            <Col span="12">
              <Button style="float: right;" type="primary" icon="ios-paper-plane" @click="attachOne(oneInfo.pid)">连接
              </Button>
            </Col>
          </Row>
          <Divider/>
        </ListItem>
      </List>
    </Drawer>
  </div>
</template>

<script>

  export default {
    name: "JvmDetail",
    data() {
      return {
        state: {
          systemInfo: {},
          jvmInfo: {},
          heapMemoryInfo: {},
          metaspaceInfo: {},
          classInfo: {},
          threadInfo: {},
          garbageCollectorInfo: [],
          cpuData: [],
          heapMemoryData: [],
          memaspaceData: [],
          classData: [],
          threadData: [],
          scales: {
            cpu: {
              time: {
                alias: "时间",
                type: "time",
                mask: "HH:mm:ss",
                tickCount: 6,
                nice: false
              },
              load: {
                alias: "使用率",
                min: 5,
                max: 100,
                formatter: text => {
                  return `${text.toFixed(2)}%`;
                }
              },
              type: {
                type: "cat"
              }
            },
            heapMemory: {
              time: {
                alias: "时间",
                type: "time",
                mask: "HH:mm:ss",
                tickCount: 6,
                nice: false
              },
              size: {
                alias: "用量",
                // max:1000000000,
                // min:5,
                formatter: text => {
                  return `${text.toFixed(2)}M`;
                }
              },
              type: {
                type: "cat"
              }
            },
            class: {
              time: {
                alias: "时间",
                type: "time",
                mask: "HH:mm:ss",
                tickCount: 6,
                nice: false
              },
              size: {
                alias: "数量",
                // max:1000000000,
                min: 0,
                formatter: text => {
                  return `${text}`;
                }
              },
              type: {
                type: "cat"
              }
            }
          }
        },
        jvmList: {},
        systemInfoUrl: "http://localhost:8080/dashboard/overview",
        localJvmsUrl: "http://localhost:8080/vm/localJvms",
        value1: false
      }
    },
    methods: {
      init_page_data: function () {
        setInterval(() => {
          let data = {};
          this.getData(this.systemInfoUrl, data, 1);
          this.getData(this.localJvmsUrl, data, 2);
        }, 2000);
      },
      getData: function (url, data, falg) {
        this.$ajax.get(url, {params: this.$qs.parse(data)})
          .then((res) => {
            if (!res.data.success) {
              console.log(res)
              alert(res.data.errorMessage)
              return;
            }
            if (falg == 1) {
              this.state = res.data.data;
            } else {
              this.jvmList = res.data.data;
            }
          }).catch((err) => {
          console.warn('服务器连接错误，请稍后再试' + err);
        });
      },
      attachOne: function (pid) {
        alert(pid)
      }
    }
    ,
    mounted() {
      this.init_page_data();
    }
  }
</script>

<style scoped>

</style>
