<style>
	.ivu-icon-ios-close:before {
		content: "\F178";
		color: #000;
	}
	.v-note-wrapper {
		width: 99.5%;
		position: relative;
		min-width: 100px;
		min-height: 100px;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: column;
		-ms-flex-direction: column;
		flex-direction: column;
		-webkit-transition: all 0.3s linear 0s;
		transition: all 0.3s linear 0s;
		background: #fff;
		z-index: 1500;
		text-align: left;
	}
</style>
<script>
    // import adminEditor from '../component/AdminEditor.vue'
    import { VueEditor } from 'vue2-editor'
    var labelSelectFlg = 0;
    export default {
        components: {
            VueEditor
        },

        data() {
            return {
                articleType: "0",
                articleDesc: "",
                articleTitle: "",
                state: "1",
                labelId: "",
                labelName: "",
				playLabel:[
					// {
                    //     labelNam : "第一个",
					// 	labelId : "111"
					// },{
                    //     labelNam : "第二个",
                    //     labelId : "111"
                    // }
				],
                markDownIsDisabled: false,
                editorIsDisabled : false,
                markdownContent: "",
				content: "",
                vueEditorContent: "",
                vertical: 'comment',
                type : [],
                label : [
                    // {
                    //     name : "hello",
                    //     id : "word"
                    // }
                ],
                typeId: '',
                show: true,
                selectLabelNam: "",
                selectLabelId: "",
                loading: false,

            }
        },mounted(){
            this.listType();
        },methods: {
            publishArticle:function(){
                // console.log(this.articleTitle);
                // console.log(this.markdownContent);
                // console.log(this.content);
                // console.log(this.playLabel);
                // console.log(this.typeId);
                let param = new window.FormData();
                param.append("articeTitle",this.articleTitle);
                param.append("articleContent",this.content);
                param.append("articleMarkdown",this.markdownContent);
                param.append("articleType",this.articleType);
                param.append("articleDesc",this.articleDesc);
                param.append("state",this.state);
                param.append("typeId",this.typeId);
                let labelId = "";
                let labelName = "";
                for (let i = 0; i < this.playLabel.length; i++) {
                    if(this.playLabel[i].labelId!=""){
                        if(labelId!=""){
                            labelId = labelId + ",";
                        }
                        labelId = labelId + this.playLabel[i].labelId;
                    }else{
                        if(labelName!=""){
                            labelName = labelName + ",";
                        }
                        labelName = labelName + this.playLabel[i].labelNam;
                    }

                }
                param.append("labelId",labelId);
                param.append("labelName",labelName);

                //加载主页面
                this.$http.post('/rest/admin/article/writeArticle',param,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res) => {
                    this.$Message.info('文章保存成功');
                }).catch((err) => {
                    console.log(err);
                });


			},
            $addLabel:function() {


                if (this.selectLabelNam != '' && this.playLabel.length > 0)
                {
                    let isSameFlg = false;
                    for (let i = 0; i < this.playLabel.length; i++) {
                        if (this.playLabel[i].labelNam == this.selectLabelNam) {
                            isSameFlg = true;
                        }
                    }
                    if(!isSameFlg){
                        this.playLabel.push(
                            {
                                labelNam: this.selectLabelNam,
                                labelId: this.selectLabelId
                            }
                        );
                    }
                }else if((this.selectLabelNam != '' && this.playLabel.length == 0)){
                    this.playLabel.push(
                        {
                            labelNam: this.selectLabelNam,
                            labelId: this.selectLabelId
                        }
                    );
                }
                this.selectLabelNam = "";
                this.selectLabelId = "";

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
                    this.type = data;
                    console.log(this.type);
                }).catch((err) => {
                    console.log(err);
                });
            },
            handleClose (name) {
                for(let i = 0;i<this.playLabel.length;i++){
                    if(this.playLabel[i].labelNam == name){
                        this.playLabel.splice(i,1);
					}
				}
            },
            $labelSelectChange:function(value){
                this.selectLabelNam = value.label;
                this.selectLabelId = value.value;
                this.$addLabel();
                labelSelectFlg = 1;
            },$selectBlur:function(){
                if(labelSelectFlg != 1){
                    this.$addLabel();
                }
                labelSelectFlg = 0;
            },$labelSearchTextChange:function(value){
                this.selectLabelNam = value;
            },
            $change(value,render){
                this.content = render;
				if(value != ''){
					this.editorIsDisabled = true;
				}else{
                    this.editorIsDisabled = false;
				}

            },
            $textchange(delta, oldDelta, source){
				this.content = this.vueEditorContent;
                if(this.vueEditorContent!=''){
                    this.markDownIsDisabled = true;
				}else{
                    this.markDownIsDisabled = false;
				}
            },remoteMethod (query) {
                if (query !== '') {
                    this.loading = true;
                    let param = new window.FormData();
                    param.append("searchText",query)
                    //加载主页面
                    this.$http.post('/rest/admin/label/blurrySelect',param,{
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then((res) => {
                        this.label = [];
                        let data = res.data.data.list;
                        for (let i = 0; i < data.length; i++) {
                            this.label.push(
                                {
                                    name : data[i].columns.name,
                                    id : data[i].columns.id
                                }
                            )
                        }
                        this.loading = false;
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    this.label = [];
                }
            }
        }
    }
</script>
<template>
	<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-4">
				<h3 class="admin_page_title">写文章</h3>
			</div>
		</div>
		<div class="row">

            </div>
		</div>

	<div class="row">
		<div  class="col-lg-9">
			<Input v-model="articleTitle" size="large" placeholder="文章标题" style="margin-top: 10px;margin-bottom: 10px;"/>
			<Tabs>
				<TabPane label="markdown" icon="logo-markdown" v-bind:disabled="markDownIsDisabled">
					<div id="markdown">
						<mavon-editor v-model="markdownContent" id="markdown" @change="$change"  :ishljs = 'true'/><br>
					</div>
				</TabPane>
				<TabPane label="Editor" icon="ios-paper" v-bind:disabled="editorIsDisabled">
					<vue-editor id="Editor" @text-change="$textchange" v-model="vueEditorContent"></vue-editor>
				</TabPane>
			</Tabs>
		</div>
		<div class="col-lg-3">
			<Card style="width:100%">
				<p slot="title">
					文章发布
				</p>
				<RadioGroup v-model="vertical" vertical>
					<Radio label="comment" default>
						<Icon type="social-apple"></Icon>
						<span>开启评论</span>
					</Radio>
					<Radio label="uncomment">
						<Icon type="social-android"></Icon>
						<span>关闭评论</span>
					</Radio>
					<br />
					<Button>保存草稿</Button>
					<Button type="primary" style="margin-left: 60px;" v-on:click="publishArticle()">发布</Button>
				</RadioGroup>

			</Card>
			<br/>
			<Card style="width:100%">
				<p slot="title">
					所属分类
				</p>
				<RadioGroup v-model="vertical" style="width: 100%" vertical>
					<Select v-model="typeId" style="width:100%">
						<Option v-for="ty in type" :key="ty.columns.name" :value="ty.columns.id">{{ty.columns.name}}</Option>
					</Select>
				</RadioGroup>

			</Card>
			<br/>
			<Card style="width:100%">
				<p slot="title">
					标签
				</p>
                <div style="margin-bottom: 10px;">
                    <Tag v-if="show" v-for="lab in playLabel" style="color: #FF7E00" closable @on-close="handleClose(lab.labelNam)" color="geekblue" v-bind:value="lab.labelId">{{lab.labelNam}}</Tag>
                </div>
                <!--<Input size="large" @on-blur="$addLabel" v-model="selectLabelNam" placeholder="新建" style="width: 100%;margin-bottom: 10px;"/>-->

                <!--<Select v-model="selectLabelId" @on-change="$labelSelectChange(selectLabelId)"  filterable>-->
                    <!--<Option v-for="ty in type"  v-model="selectLabelNam" :value="ty.columns.id">{{ty.columns.name}}</Option>-->
                <!--</Select>-->
                <Select  @blur.native.capture="$selectBlur()" @on-query-change="$labelSearchTextChange"
                        :label-in-value="true" @on-change="$labelSelectChange"
                        v-model="selectLabelId" style="width:100%" filterable
                        remote
                        :remote-method="remoteMethod"
                        :loading="loading"
                >
                    <Option v-for="lab in label" :value="lab.id">{{lab.name}}</Option>
                </Select>
					<!--<Select v-model="model1" style="width:100%">-->
						<!--<Option v-for="ty in type" :value="ty.columns.id">{{ty.columns.name}}</Option>-->
					<!--</Select>-->

			</Card>
			<br />
			<Card style="width:100%">
				<p slot="title">
					定时发布
				</p>
				<RadioGroup v-model="vertical" style="width: 100%" vertical>
					<DatePicker type="date" placeholder="Select date" style="width: 100%"></DatePicker><br /><br />
					<TimePicker type="time" placeholder="Select time" style="width: 100%"></TimePicker>
				</RadioGroup>

			</Card>
			<br />
			<Card style="width:100%">
				<p slot="title">
					密码保护
				</p>
				<Input  size="large" type="password" placeholder="输入密码" style="margin-top: 10px;margin-bottom: 10px;"/>


			</Card>
		</div>
	</div>

	</body>
</template>

