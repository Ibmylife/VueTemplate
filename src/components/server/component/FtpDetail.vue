<template>
  <div>
    <!--数据显示方式, 详情,查看-->
    <!--图片名称 ,创建时间,大小,文件上传者-->
    <!--文件名称,创建时间,大小,文件上传者-->
    <!--表格, 文件:图标,文件名 ,图片:详情,图片名-->
    <div class="row">
      <div class="col-lg-3">
      </div>
      <div class="col-lg-5">

      </div>
      <div class="col-lg-2">
        <Button type="primary" @click="clickUploadFile" class="center-block text-center">上传文件</Button>
      </div>
      <div class="col-lg-2">
        <p></p>
      </div>
    </div>
    <!--    <Divider/>-->
    <Table border :columns="columns12" :data="tableFiles">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">详情</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pages.total" :current="pages.pageNum" :page-size="pages.pageSize"
              @on-change="changePage"></Page>
      </div>
    </div>
    <div>
      <Modal v-model="uploadModalFlag" draggable scrollable title="上传文件">
        <div>
          <Upload type="drag" action="http://www.niejiahao.cn:8080/files/artices" name="file" :on-success="uploadSuccess"
                  :on-error="uploadError">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或者拉取文件到这上传</p>
            </div>
          </Upload>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FtpDetail",
    inject: ['reload'],
    data() {
      return {
        showInType: {
          detail: false,
          table: true,
        },
        layout: {
          columnNumber: 4,
          columnNumberSizeClass: "col-md-3",
          columnNumberSize: 0,
        },
        pages: {
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        tableFiles: [],
        columns12: [
          {
            title: '文件名',
            key: 'fileName'
          },
          {
            title: '文件类型',
            key: 'fileType'
          },
          {
            title: '文件大小',
            key: 'fileSize'
          },
          {
            title: '上传时间',
            key: 'createTime'
          },
          {
            title: '上传人',
            key: 'userId'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        uploadModalFlag: false,
      }
    },
    methods: {
      changeShowInType: function () {
        this.showInType.table = !this.showInType.table;
        this.showInType.detail = !this.showInType.detail;
      },
      getTableData: function () {
        let data = {};
        data['pageSize'] = this.pages.pageSize;
        data['pageNum'] = this.pages.pageNum - 1;
        let url = 'http://www.niejiahao.cn:8080/files/';
        this.$ajax.get(url, {params: this.$qs.parse(data)}).then((res) => {
          //这里使用了ES6的语法
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            return;
          }
          this.pages.pageSize = res.data.object.pageSize;
          this.pages.pageNum = res.data.object.pageNum + 1;
          this.pages.total = res.data.object.total;
          this.tableFiles = res.data.object.content
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      /**
       * 详情数据
       */
      getDetailData: function () {
        let data = new window.FormData();
        let url = '';
        this.$ajax({
          method: 'post',
          url: url,
          data: data,
        }).then((res) => {
          //这里使用了ES6的语法
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
            return;
          }
          this.detailFiles = res.data.object.content
          this.reload();
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
      clickUploadFile: function () {
        this.uploadModalFlag = true;
      },
      show: function (index) {
        alert(index)
      },
      remove: function (index) {
        let fileId = this.tableFiles[index]['fileId'];
        this.$ajax({
          method: 'delete',
          url: 'http://www.niejiahao.cn:8080/files/' + fileId,
        }).then((res) => {
          if (!res.data.successFlag) {
            this.$Message.error(res.data.message);
          } else {
            this.$Message.success(res.data.message);
            this.reload();
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      changePage: function (index) {
        this.pages.pageNum = index;
        this.getTableData();
      },
      uploadSuccess: function (response, file, fileList) {
        this.uploadModalFlag = false;
        this.$Notice.success("<p>上传成功</p>")
        this.reload();
      },
      uploadError: function (error, file, fileList) {
        this.clearFiles();
        this.$Notice.error("上传失败" + error)
        this.uploadModalFlag = true;
      }
    },
    mounted: function () {
      this.getTableData();
    },
    watch: {}
  }
</script>

<style scoped>

</style>
