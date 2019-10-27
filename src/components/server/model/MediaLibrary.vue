<style>
	.demo-upload-list{
		display: inline-block;
		width: 100px;
		height: 100px;
		text-align: center;
		line-height: 60px;
		border: 1px solid transparent;
		border-radius: 4px;
		overflow: hidden;
		background: #fff;
		position: relative;
		box-shadow: 0 1px 1px rgba(0,0,0,.2);
		margin-right: 4px;
	}
	.demo-upload-list img{
		width: 100%;
		height: 100%;
	}
	.demo-upload-list-cover{
		display: none;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,.6);
	}
	.demo-upload-list:hover .demo-upload-list-cover{
		display: block;
	}
	.demo-upload-list-cover i{
		color: #fff;
		font-size: 20px;
		cursor: pointer;
		margin: 0 2px;
	}
</style>
<script>
    var colPage = 1;
    var colLimit = 10;

    export default {
        data () {
            return {
                defaultList: [
                    // {
                    //     'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    //     'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    // },
                    // {
                    //     'name': 'bc7521e033abdd1e92222d733590f104',
                    //     'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    // }
                ],
                imgName: '',
				imgUrl: '',
                visible: false,
                total : 50,
            }
        },
        methods: {
            handleView (name,url) {
                this.imgName = name;
                this.imgUrl = url;
                this.visible = true;
            },
            handleRemove (file) {

                this.$Modal.confirm({
                    title: '删除确认',
                    content: '<p>是否确认删除图片</p>',
                    onOk: () => {
                        this.removePic(file.id,0);
                    },
                    onCancel: () => {}
                });


            },
            removePic(ids,isDelete){
                //删除方法
                let param = new window.FormData();
                param.append('ids',ids);
                param.append('isDelete',isDelete);

                this.$http.post('/rest/file/fileOpera/del',param,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    this.getPicMsg(colPage,colLimit);
                }).catch((err) => {
                    console.log(err);

                });
            },

            handleSuccess (res, file) {
                for(let i = 0;i<res.data.length;i++){
                    file.url = 'http://'+res.data[i].split("::")[1];
                    file.name = res.data[i].split("::")[0];
                    file.id = res.data[i].split("::")[2];
                    this.defaultList.push({
                        name: file.name,
                        url: file.url,
                        id: file.id
                    })
                }


            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件： ' + file.name + ' 格式不正确，请选择 .jpg 或 .png 文件'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '文件过大',
                    desc: '文件：  ' + file.name + ' 过大，请不要上传超过2M的文件'
                });
            },
            handleBeforeUpload () {

            },
            getPicMsg(page,limit){
                this.defaultList=[];
                let param = new window.FormData();
                param.append('page',page);
                param.append('limit',limit)
                //加载主页面
                this.$http.post('/rest/file/fileOpera/getFileMsg',param,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    let data = res.data.data.list;
                    for(let i = 0 ; i < data.length;i++){
                        this.defaultList.push({
                            name: data[i].columns.file_new_name,
                            url: 'http://'+data[i].columns.file_url,
                            id:   data[i].columns.id
                        });
                        console.log(this.defaultList);
                    }
                    this.total = res.data.data.total
                }).catch((err) => {
                    console.log(err);

                });
            },
            $limitChange:function(limit){

                this. getPicMsg(colPage,limit);
                colLimit = limit;
            },
            $pageSizechange:function(page){


                this. getPicMsg(page,colLimit);
                colPage = page

            },
        },
        mounted () {
            this.getPicMsg(1,10);
        }
    }
</script>
<template>
	<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-4">
				<h3 class="admin_page_title">媒体库
				</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-12">
				<div class="medius_title">
					<i class="fa fa-film" style="float:left;font-size: 20px;margin-left: 10px;margin-top: 15px;color: #337abe;"></i>
					<i class="fa fa-list" style="float:left;font-size: 20px;margin-left: 10px;margin-top: 16px;"></i>

					<Dropdown style="float:left;margin-left: 30px;margin-top: 15px;margin-right: 30px;">
						<a href="javascript:void(0)">
							多媒体类别
						<Icon type="ios-arrow-down"></Icon>
						</a>
						<DropdownMenu slot="list">
							<DropdownItem>图片</DropdownItem>
							<DropdownItem>音频</DropdownItem>
							<DropdownItem>视频</DropdownItem>
						</DropdownMenu>
					</Dropdown>



					<!-- <div  style="float: left; margin-left: 10px;margin-top: 11px;">
						<input style="width:120px;" size="16" type="text" class="datetimeStart" readonly class="form_datetime" placeholder="筛选起始日期">
						--
						<input style="width:120px;" size="16" type="text" class="datetimeEnd" readonly class="form_datetime" placeholder="筛选结束日期">
					</div> -->
					<Col span="12" style="float:left;width: 115px;margin-left: 10px;margin-top: 9px;width: 150px;">
						<DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
					</Col>
						<form style="float:right;margin-left: 10px;margin-top: -11px;width: 150px;margin-right: 120px;">
						<div class="form-group">
							<label for="exampleInputEmail2"></label>
							<input type="email" class="form-control" style="height: 36px;width: 250px;" placeholder="请输入搜索内容">
						</div>
						</form>

				</div>

				<div style="margin-left: 15px;margin-top: 15px;">
					<div class="demo-upload-list" v-for="item in defaultList">
						<!--<template v-if="item.status === 'finished'">-->
							<img :src="item.url">
							<div class="demo-upload-list-cover">
								<Icon type="ios-eye-outline" @click.native="handleView(item.name,item.url)"></Icon>
								<Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
							</div>
						<!--</template>-->
						<!--<template v-else>-->
							<!--<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>-->
						<!--</template>-->
					</div>
					<Upload
							ref="upload"
							:show-upload-list="false"
							:on-success="handleSuccess"
							:format="['jpg','jpeg','png']"
							:max-size="2048"
							:on-format-error="handleFormatError"
							:on-exceeded-size="handleMaxSize"
							:before-upload="handleBeforeUpload"
							multiple
							type="drag"
							:data="{fileType:0}"
							action="/rest/file/fileOpera/fileUpload"
							style="display: inline-block;width:100px;">
						<div style="width: 100px;height:100px;line-height: 100px;">
							<Icon type="ios-camera" size="20"></Icon>
						</div>
					</Upload>
					<Modal title="View Image" v-model="visible">
						<img :src="imgUrl" v-if="visible" style="width: 100%">
					</Modal>
				</div>


			</div>
            <Page :total=total style="float: right" size="small" show-elevator show-sizer @on-change="$pageSizechange"
                  @on-page-size-change="$limitChange" />
		</div>

	</div>
	</body>
</template>

