<template>
  <div>
    <Row>
      <Col span="21">
        <p></p>
      </Col>
      <Col span="3">
        <Button type="primary" style="float: right;" size="large" @click="addParam">添加</Button>
      </Col>
    </Row>
    <br/>
    <Table stripe :data="tableData3" :columns="tableColumns3">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" @click="editorParam(index)">编辑</Button>
        <Button type="error" size="small" @click="deleteParam(index)">删除</Button>
      </template>
    </Table>
    <Row>
      <Row>
        <Modal v-model="paramFlag" draggable scrollable title="详情" @on-ok="onOk">
          <Form ref="formInline" :model="param" :label-width="80">
            <FormItem label="描述" prop="name">
              <Input v-model="param.desc"></Input>
            </FormItem>
            <FormItem label="名称" prop="name">
              <Input v-model="param.key"></Input>
            </FormItem>
            <FormItem label="值" prop="name">
              <Input v-model="param.value"></Input>
            </FormItem>
          </Form>
        </Modal>
      </Row>
      <Row>
        <Modal v-model="addFlag" draggable scrollable title="详情" @on-ok="onAddOk">
          <Form ref="formInline" :model="param" :label-width="80">
            <FormItem label="描述" prop="name">
              <Input v-model="param.desc"></Input>
            </FormItem>
            <FormItem label="名称" prop="name">
              <Input v-model="param.key"></Input>
            </FormItem>
            <FormItem label="值" prop="name">
              <Input v-model="param.value"></Input>
            </FormItem>
          </Form>
        </Modal>
      </Row>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "ProjectParam",
    inject: ['reload'],
    data() {
      return {
        tableData3: [],
        paramUrl: 'http://www.niejiahao.cn:8080/projectparam',
        param: {},
        paramFlag: false,
        addFlag: false
      }
    },
    computed: {
      tableColumns3() {
        let columns = [];
        columns.push({
          title: '描述',
          key: 'desc',
        });
        columns.push({
          title: '键',
          key: 'key'
        });
        columns.push({
          title: '值',
          key: 'value'
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
          method:'get',
          url: this.paramUrl + "/all",
          headers: {'Authorization': this.getToken()},
          params: this.$qs.parse(data)
        }).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.object.message);
            return;
          }
          console.log(res)
          this.tableData3 = res.data.object;
        }).catch((err) => {
          console.log(err);
        });
      },
      editorParam: function (index) {
        let param = this.tableData3[index];
        this.param = param;
        this.paramFlag = true;
      },
      addParam: function (index) {
        let param = {};
        this.addFlag = true;
      },
      deleteParam: function (index) {
        let param = this.tableData3[index];
        this.$ajax({
          method: 'delete',
          url: this.paramUrl +"/"+ param.key,
          headers: {'Authorization': this.getToken()},
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
      onOk: function () {
        let data = {};
        data['key'] = this.param.key;
        data['desc'] = this.param.desc;
        data['value'] = this.param.value;
        this.$ajax({
          method: 'put',
          url: this.paramUrl,
          data: this.$qs.stringify(data),
          headers: {'Authorization': this.getToken()},
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
      onAddOk: function () {
        let data = {};
        data['key'] = this.param.key;
        data['desc'] = this.param.desc;
        data['value'] = this.param.value;
        this.$ajax({
          method: 'post',
          url: this.paramUrl,
          data: this.$qs.stringify(data),
          headers: {'Authorization': this.getToken()},
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
      change(status) {
        this.$Message.info('开关状态：' + status);
      }
    },
    mounted: function () {
      let data = {};
      this.showTable(data);
    }
  }
</script>

<style scoped>

</style>
