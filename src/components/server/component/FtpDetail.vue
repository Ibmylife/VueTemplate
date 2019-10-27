<template>
  <div>
    <!--数据显示方式, 详情,查看-->
    <!--图片名称 ,创建时间,大小,文件上传者-->
    <!--文件名称,创建时间,大小,文件上传者-->
    <!--表格, 文件:图标,文件名 ,图片:详情,图片名-->
    <!--<Button >显示方式</Button>-->
    <div class="row">
      <div class="col-lg-3">
      </div>
      <div class="col-lg-5">

      </div>
      <div class="col-lg-2">
        <Button type="primary" @click="clickUploadFile" class="center-block text-center">上传文件</Button>
      </div>
      <div class="col-lg-2">
        <div @click="changeShowInType" class="center-block text-center">
          <Icon type="ios-apps-outline" size="40" v-if="showInType.table"/>
          <Icon type="md-apps" size="40" v-if="showInType.detail"/>
        </div>
      </div>
    </div>
    <Divider/>
    <!--详情,每行6个card-->
    <div v-if="showInType.detail">
      <div v-for="(file,index) in detailFiles">
        <div :class="layout.columnNumberSizeClass">
          <Card>
            <div style="text-align:center">
              <img :src="file.url" class="img-responsive">
              <h3>{{file.fileName}}</h3>
            </div>
          </Card>
        </div>
      </div>
    </div>
    <div v-if="showInType.table">
      <Table border :columns="columns12" :data="tableFiles">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
          <Button type="error" size="small" @click="remove(index)">Delete</Button>
        </template>
      </Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pages.total" :current="pages.pageNum" :page-size="pages.pageSize"
                @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FtpDetail",
    data() {
      return {
        showInType: {
          detail: true,
          table: false,
        },
        layout: {
          columnNumber: 4,
          columnNumberSizeClass: "col-md-3",
          columnNumberSize: 0,
        },
        pages: {
          pageNum: 0,
          pageSize: 5,
          total: 0
        },
        detailFiles: [
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
        ],
        tableFiles: [
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
          {
            url: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2259376396,2250852130&fm=27&gp=0.jpg",
            fileName: "ceshi",
            fileSize: "1m",
            fileType: ".jpg",
            fileDate: new Date(),
          },
        ],
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
            key: 'fileDate'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        data6: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
          }
        ]
      }
    },
    methods: {
      changeShowInType: function () {
        this.showInType.table = !this.showInType.table;
        this.showInType.detail = !this.showInType.detail;
      },
      getTableData: function () {
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
          this.pages.pageSize = res.data.object.pageSize;
          this.pages.pageNum = res.data.object.pageNum + 1;
          this.pages.total = res.data.object.total;
          this.tableFiles = res.data.object.content
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      },
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
          //请求成功返回的数据
        }).catch((error) => {
          console.log(error)       //请求失败返回的数据
        })
      }
    },
    mounted: function () {
      // this.getTableData();
      // this.getDetailData();
    },
    watch: {
      'layout.columnNumber': function () {
        this.columnNumberSizeClass = this.getColWithBootstrap(this.layout.columnNumber)
        this.columnNumberSize = this.getColSizeWithBootstrap(this.layout.columnNumber)
      }
    }
  }
</script>

<style scoped>

</style>
