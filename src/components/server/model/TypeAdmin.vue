<style>
	
</style>
<script>

    var golPage = 1;
    var golLimit = 10;
    var golSearchText = undefined;
    var golBeginDate = '1970-01-01';
    var golEndDate = '2100-01-01';
    var selectList = {};
    export default {


        mounted(){
            this.listType(golPage,golLimit);
		},methods:{
            createType:function(){
                let param = new window.FormData();
                param.append("typeName",this.typeNam);
                param.append("typeDesc",this.typeDsc);
                //添加类别
                this.$http.post('/rest/admin/type/addType',param,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    this.$Message.info('类别添加成功');
                    this.listType(golPage,golLimit,golSearchText,golBeginDate,golEndDate);
                }).catch((err) => {
                    this.$Message.info('类别添加失败');
                    console.log(err);
                });
			},
            $tableSelect:function(selection,row){
                selectList = selection;
            },
            $tableSelectCancel:function(selection,row){
                selectList = selection;
            },
            $tableSelectAll:function(selection,row){
                selectList = selection;
            },
            $tableSelectAllCancel:function(selection,row){
                selectList = selection;
            },
            $batchOperation:function(name){
                if(name == 'delete'){
                    if(selectList == undefined || selectList == '' || selectList == null || selectList.length == undefined ||  selectList.length == 0) {
                        this.$Message.info('请至少选择一项进行删除操作');
                        return;
                    }
                    this.$Modal.confirm({
                        title: '删除确认',
                        content: '<p>是否确认删除选中的 '+selectList.length+' 项</p>',
                        onOk: () => {
                            this.removeType(selectList,'0','1');
                        },
                        onCancel: () => {}
                    });
                }else if (name == 'realyDelete'){
                    if(selectList == undefined || selectList == '' || selectList == null || selectList.length == undefined ||  selectList.length == 0) {
                        this.$Message.info('请至少选择一项进行删除操作');
                        return;
                    }
                    this.$Modal.confirm({
                        title: '删除确认',
                        content: '<p>是否确认彻底删除选中的：'+selectList.length+'项</p>' +
                            '<p style="color: red;">警告：彻底删除无法恢复</p>',
                        onOk: () => {
                            this.removeType(selectList,'1','1');
                        },
                        onCancel: () => {}
                    });

                }


            },
            removeType:function(ids,isDeleted,isMany){
                let param = new window.FormData();
                if(isMany == '0'){
                    param.append('typeId',ids);
                }else if(isMany == '1'){
                    let idsStr = '';
                    for(var i = 0;i<ids.length;i++){
                        if(idsStr!=''){
                            idsStr = idsStr + ",";
                        }
                        idsStr = idsStr + ids[i].id;
                    }
                    param.append('typeId',idsStr);
                }
                param.append('isDeleted',isDeleted);
                this.$http.post('/rest/admin/type/delete',param,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    this.$Message.info('删除成功');
                    this.listType(golPage,golLimit,golSearchText,golBeginDate,golEndDate);
                }).catch((err) => {
                    console.log(err);
                });
            },
            $dateChange:function(date ,type){
                this.listType(golPage,golLimit,golSearchText,date[0],date[1]);
                golBeginDate = date[0];
                golEndDate = date[1];
            },
            $searchTextChange:function(event){
                this.listType(golPage,golLimit,this.inputValue,golBeginDate,golEndDate);
                golSearchText = this.inputValue;
            },
			$pageSizechange:function(page){
				this.listType(page,golLimit,golSearchText,golBeginDate,golEndDate);
				golPage = page
			},$limitChange:function(limit){
                this.listType(golPage,limit,golSearchText,golBeginDate,golEndDate);
                golLimit = limit;
            },
            listType:function(page,limit,searchText,beginDate,endDate){
                let param = new window.FormData();
                param.append('page', page);
                param.append('limit', limit);
                if(searchText!=undefined){
                    param.append('searchText',searchText);
                }
                if(beginDate!=undefined && endDate!=undefined){
                    param.append('beginDate',beginDate);
                    param.append('endDate',endDate);
                }


                //加载主页面
                this.$http.post('/rest/blog/type/listType',param,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    this.type_data=[];
                    let list = res.data.data.list;

                    if(list.length>0){
                        for(let i = 0;i<list.length;i++){
                            list[i].createdTime = this.$tools.formatTime('yyyy-MM-dd hh:mm:ss',list[i].createdTime);
                            list[i].updateTime = this.$tools.formatTime('yyyy-MM-dd hh:mm:ss',list[i].updateTime);
                            let contype;

                            this.type_data.push(
                                {
                                    id: list[i].id,
                                    title: list[i].name,
                                    createNam: list[i].createUserName,
                                    create_time: list[i].createdTime

                                }
                            )
                        }
                    }
                    this.total = res.data.data.total
                    console.log(list);
                }).catch((err) => {
                    console.log(err);
                });
            }
		},components:{

        },data () {
            return {
                typeNam: "",
                typeDsc: "",
                type_col: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },{
                        title: '分类名称',
                        key: 'title'
                    },
                    {
                        title: '创建者',
                        key: 'createNam'
                    },
                    {
                        title: '创建日期',
                        key: 'create_time'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                                title: '删除确认',
                                                content: '<p>是否确认删除类型：'+params.row.title+'</p>',
                                                onOk: () => {
                                                    this.removeType(params.row.id,'0','0');
                                                },
                                                onCancel: () => {}
                                            });
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                type_data: [
                    // {
                    //     title: 'John Brown',
                    //     writer: 18,
                    //     type: 'New York No. 1 Lake Park',
                    //     sub: '2016-10-03',
                    //     label: '2016-10-03',
                    //     common: '2016-10-03',
                    //     contentType: '2016-10-03',
                    //     createTime: '2016-10-03',
                    //     updateTime: '2016-10-03'
                    // }
                ]
            }
        }
    }
</script>
<template>
<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-4">
				<h3 class="admin_page_title">类别管理</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-4">
				<br/><br/>
			    <p style="font-weight: bold;font-size: 15px;margin-bottom: 5px;">请输入分类名称:</p>
			    <div class="row">
					<Input v-model="typeNam" placeholder="分类名称" style="width: 300px" />
				</div>
				<br>
				<p style="font-weight: bold;font-size: 15px;margin-bottom: 5px;">请输入分类介绍:</p>
			    <div class="row">
    				<Input v-model="typeDsc" type="textarea" :rows="4" placeholder="请输入分类介绍" />
				</div>
				<Button type="success" style="float: right;margin-top:20px;" v-on:click="createType()">创建类型</Button>
			</div>
			
			<div class="col-lg-8">
				<div class="container-fluid">
						
						<div class="row">
				            <div class="col-lg-3" style="margin-top: 0;margin-bottom: 20px;margin-left: 0">
				                <div  style="width: 320px;float: left;">
				                    <Dropdown @on-click="$batchOperation">
				                        <Button type="primary">
				                            批量操作
				                            <Icon type="ios-arrow-down"></Icon>
				                        </Button>
				                        <DropdownMenu slot="list">
											<DropdownItem>通过审核</DropdownItem>
											<DropdownItem>发布</DropdownItem>
											<DropdownItem>取消发布</DropdownItem>
											<DropdownItem>屏蔽</DropdownItem>
											<DropdownItem name="delete">移至回收站</DropdownItem>
											<DropdownItem name="realyDelete" >彻底删除</DropdownItem>
				                        </DropdownMenu>
				                    </Dropdown>
				                    
				                </div>


				               



				            </div>
							<div class="col-lg-4">
								<DatePicker @on-change="$dateChange" type="daterange" placement="bottom-end" placeholder="输入筛选日期" style="width: 175px"></DatePicker>
							</div>
							<div class="col-lg-4">
								<Input  @on-change="$searchTextChange" v-model="inputValue" placeholder="输入搜索内容" clearable style="width: 150px" />
							</div>
						</div>

						<div class="row">
							<Table height="400" @on-select="$tableSelect" @on-select-cancel="$tableSelectCancel" @on-select-all="$tableSelectAll"
								   @on-select-all-cancel="$tableSelectAllCancel" :columns="type_col" :data="type_data"></Table>
							<div style="float:right;margin-top: 20px;">
								<Page :total=total size="small" show-elevator show-sizer @on-change="$pageSizechange"
									  @on-page-size-change="$limitChange" />
							</div>
						</div>



					</div>
				
			</div>
		</div>
	</div>
</body>

</template>

