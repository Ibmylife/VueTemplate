<style>

</style>
<script>
    // import adminTable from '../component/AdminTable.vue'

    var golPage = 1;
    var golLimit = 10;
    var golTypeId = undefined;
    var golSearchText = undefined;
    var golBeginDate = '1970-01-01';
    var golEndDate = '2100-01-01';
    var selectList = {};
    export default {
        components:{
            // adminTable
        },
        data(){
            return {
                articleType : [],
                articles : [],
                total : 50,
                inputValue:'',
                article_col: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },{
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '作者',
                        key: 'writer'
                    },
                    {
                        title: '分类',
                        key: 'type'
                    },
                    {
                        title: '专题',
                        key: 'sub'
                    },
                    {
                        title: '评论',
                        key: 'common'
                    },
                    {
                        title: '内容类型',
                        key: 'contentType'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '修改时间',
                        key: 'updateTime'
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
                                                content: '<p>是否确认删除文章：'+params.row.title+'</p>',
                                                onOk: () => {
                                                    this.removeArticle(params.row.id,'0','0');
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
                article_data: [
                    // {
                    //     title: '',
                    //     writer: '',
                    //     type: '',
                    //     sub: '',
                    //     label: '',
                    //     common: '',
                    //     contentType: '',
                    //     createTime: '',
                    //     updateTime: ''
                    // }
                ]
            }
        },
        mounted(){
            this.listType();
            this.listArticle(golPage,golLimit);

        },
        methods:{
            $dateChange:function(date ,type){
                // console.log(date);
                // console.log(type);
                this.listArticle(golPage,golLimit,golTypeId,golSearchText,date[0],date[1]);
                golBeginDate = date[0];
                golEndDate = date[1];

            },
            $searchTextChange:function(event){
                this.listArticle(golPage,golLimit,golTypeId,this.inputValue,golBeginDate,golEndDate);
                golSearchText = this.inputValue;
            },
            $downMenuClick:function(typeId){
                this.listArticle(golPage,golLimit,typeId,golSearchText,golBeginDate,golEndDate);
                golTypeId = typeId;
            },
            $limitChange:function(limit){
                this.listArticle(golPage,limit,golTypeId,golSearchText,golBeginDate,golEndDate);
                golLimit = limit;
            },
            $pageSizechange:function(page){
                this.listArticle(page,golLimit,golTypeId,golSearchText,golBeginDate,golEndDate);
                golPage = page
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
            localToArticle:function(id){

                this.$emit('toArticle', id);
            },
            removeArticle:function(ids,isDeleted,isMany){
                let param = new window.FormData();
                if(isMany == '0'){
                    param.append('articeId',ids);
                }else if(isMany == '1'){
                    let idsStr = '';
                    for(var i = 0;i<ids.length;i++){
                        if(idsStr!=''){
                            idsStr = idsStr + ",";
                        }
                        idsStr = idsStr + ids[i].id;
                    }
                    param.append('articeId',idsStr);
                }
                param.append('isDeleted',isDeleted);
                this.$http.post('/rest/admin/article/delete',param,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    this.$Message.info('删除成功');
                    this.listArticle(golPage,golLimit,golTypeId,golSearchText,golBeginDate,golEndDate);
                }).catch((err) => {
                    console.log(err);
                });
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
                            this.removeArticle(selectList,'0','1');
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
                            this.removeArticle(selectList,'1','1');
                        },
                        onCancel: () => {}
                    });

                }


            },
            listType:function(){
                let param = new window.FormData();
                //加载主页面
                this.$http.post('/rest/blog/type/listTypeSimple',param,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    let data = res.data.data.list;
                    this.articleType = data;
                }).catch((err) => {
                    console.log(err);
                });
            },
            listArticle:function(page,limit,typeId,searchText,beginDate,endDate){
                let param = new window.FormData();
                param.append('page', page);
                param.append('limit', limit);
                if(typeId!=undefined){
                    param.append('typeId',typeId);
                }
                if(searchText!=undefined){
                    param.append('searchText',searchText);
                }
                if(beginDate!=undefined && endDate!=undefined){
                    param.append('beginDate',beginDate);
                    param.append('endDate',endDate);
                }


                //加载主页面
                this.$http.post('/rest/blog/article/listArticle',param,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    this.article_data=[];
                    let list = res.data.data.list;

                    if(list.length>0){
                        for(let i = 0;i<list.length;i++){
                            list[i].createdTime = this.$tools.formatTime('yyyy-MM-dd hh:mm:ss',list[i].createdTime);
                            list[i].updateTime = this.$tools.formatTime('yyyy-MM-dd hh:mm:ss',list[i].updateTime);
                            let contype;
                            if(list[i].articleType == '0'){
                                contype = '文章';
                            }else if(list[i].articleType == '1'){
                                contype = '图集';
                            }else if(list[i].articleType == '3'){
                                contype = '视频';
                            }
                            this.article_data.push(
                                {
                                    id: list[i].id,
                                    title: list[i].title,
                                    writer: list[i].createUserName,
                                    type: list[i].typeNam,
                                    sub: '无',
                                    common: '0',
                                    contentType: contype,
                                    createTime: list[i].createdTime,
                                    updateTime: list[i].updateTime
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
        }
    }

</script>
<template>
	<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-4">
				<h3 class="admin_page_title">文章</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-5" style="padding-left: 0">
                <RadioGroup v-model="buttonSize" type="button">
                    <Radio label="all">全部(100)</Radio>
                    <Radio label="public">已发布(20)</Radio>
                    <Radio label="small">草稿(30)</Radio>
                    <Radio label="large">屏蔽(40)</Radio>
                    <Radio label="ha">待审核(10)</Radio>
                </RadioGroup>
			</div>
            <div class="col-lg-3" style="margin-top: 0;margin-bottom: 20px;margin-left: 0">
                <div  style="width: 320px;float: left;">
                    <Dropdown @on-click="$batchOperation">
                        <Button type="primary">
                            批量操作
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu  slot="list">
                            <DropdownItem>通过审核</DropdownItem>
                            <DropdownItem>发布</DropdownItem>
                            <DropdownItem>取消发布</DropdownItem>
                            <DropdownItem>屏蔽</DropdownItem>
                            <DropdownItem name="delete">移至回收站</DropdownItem>
                            <DropdownItem name="realyDelete" >彻底删除</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown   @on-click="$downMenuClick" style="margin-left:10px">
                        <Button type="primary">
                            文章分类
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem>全部</DropdownItem>
                            <DropdownItem v-for="type in articleType" v-bind:name=type.columns.id>{{type.columns.name}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                </div>
            </div>
            <div class="col-lg-2">
                <DatePicker @on-change="$dateChange" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 175px"></DatePicker>
            </div>
            <div class="col-lg-1">
                <Input  @on-change="$searchTextChange" v-model="inputValue" placeholder="Enter something..." clearable style="width: 150px" />
            </div>
		</div>

		<div class="row">
            <Table height="400" @on-select="$tableSelect" @on-select-cancel="$tableSelectCancel" @on-select-all="$tableSelectAll"
                   @on-select-all-cancel="$tableSelectAllCancel"  :columns="article_col" :data="article_data"></Table>
            <div style="float:right;margin-top: 20px;">
                <Page :total=total size="small" show-elevator show-sizer @on-change="$pageSizechange"
                      @on-page-size-change="$limitChange" />
            </div>
		</div>



	</div>
	</body>
</template>

