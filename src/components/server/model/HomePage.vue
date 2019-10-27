<style scoped>
    @import "../../../assets/admin/css/admin.css";
	@import "../../../assets/public/font-awesome-4.7.0/css/font-awesome.min.css";
	@import "../../../assets/public/bootstrap-3.3.7-dist/css/bootstrap.min.css";
	@import "../../../assets/public/bootstrap-3.3.7-dist/css/bootstrap-theme.min.css";
	@import "../../../assets/public/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css";
    .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
        position: relative;
        min-height: 1px;
        padding-right: 5px;
         padding-left: 5px;
    }
    .admin_modle-title {
        padding-left: 15px;
    }
    .table-condensed tr{
        line-height: 25px;
    }
</style>
<script>
    var Highcharts = require('highcharts');
    export default {
        name: 'app',
        components: {
            Highcharts
        },mounted(){
            var options = {
                chart: {
                    type: 'line'
                },
                title: {
                    text: '网站本月情况一览'
                },
                xAxis: {
                    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
                },
                yAxis: {
                    title: {
                        text: '新增数量'
                    }
                },
                series: [{
                    name: '文章',
                    data: [1,2,3,5,5,3,6,3,6,3,5,8,5,9,41,9,1,9,5,1,5,9,6,3,22,55,9,4,5,2,3]
                }, {
                    name: '评论',
                    data: [5,1,5,9,6,2,5,8,4,2,5,4,5,2,5,5,2,45,8,5,56,6,58,5,5,4,5,58,5,2,6]
                },{
                    name: '用户',
                    data: [6,6,6,5,58,5,45,8,5,2,5,8,5,2,5,5,5,5,5,5,4,5,5,96,5,52,4,58,5,5,5]
                },{
                    name: '访问量',
                    data: [1,2,3,4,5,6,7,8,9,10,11,12,14,15,13,1,5,3,6,3,6,5,4,1,2,1,8,2,1,3,8]
                }]
            };

            var chart = Highcharts.chart('container', options);
		}
    }
</script>
<template>
	<body>
	<div class="container-fluid">
		<div class="row">
			<div class="col-lg-4">
				<h3 class="admin_page_title">概览</h3>
			</div>
		</div>
		<div class="row">
			<!-- 这里是右侧的 id="container"-->
			<div class="col-lg-12">
				<div id="container" class="linepic"></div>
			</div>
			<!-- 这里是右侧的哈哈 -->
		</div>
		<div class="row">

			<div class="col-lg-3">
				<div class="admin_second">
					<div class="admin_modle-title">最近文章</div>

					<!-- <div class="admin_model_second_title">
						近期文章
					</div> -->
					<div class="admin_modle_content" style="padding-left: 0px;padding-top: 0px;">
						<div class="row">
							<div class="col-lg-12">
								<div class="admin_page_article">
									<div>由root发表：《<a>我的文章</a>》</div>
									<div>2017年5月5日 下午2:30</div>
									<div class="article_tools">
										<a href="javascript:void(0);">查看</a><span class="line_a"> |</span>
										<a href="javascript:void(0);">编辑</a><span class="line_a"> |</span>
										<a href="javascript:void(0);" style="color: #d98500;">屏蔽</a><span class="line_a"> |</span>
										<a href="javascript:void(0);" style="color: #a00;">移到回收站</a>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-12">
								<div class="admin_page_article">
									<div>由root发表：《<a>我的文章</a>》</div>
									<div>2017年5月5日 下午2:30</div>
									<div class="article_tools">
										<a href="javascript:void(0);">查看</a><span class="line_a"> |</span>
										<a href="javascript:void(0);">编辑</a><span class="line_a"> |</span>
										<a href="javascript:void(0);" style="color: #d98500;">屏蔽</a><span class="line_a"> |</span>
										<a href="javascript:void(0);" style="color: #a00;">移到回收站</a>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-12">
								<div class="admin_page_article">
									<div>由root发表：《<a>我的文章</a>》</div>
									<div>2017年5月5日 下午2:30</div>
									<div class="article_tools">
										<a href="javascript:void(0);">查看</a><span class="line_a"> |</span>
										<a href="javascript:void(0);">编辑</a><span class="line_a"> |</span>
										<a href="javascript:void(0);" style="color: #d98500;">屏蔽</a><span class="line_a"> |</span>
										<a href="javascript:void(0);" style="color: #a00;">移到回收站</a>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-lg-12">
								<div class="admin_page_article">
									<div>由root发表：《<a>我的文章</a>》</div>
									<div>2017年5月5日 下午2:30</div>
									<div class="article_tools">
										<a href="javascript:void(0);">查看</a><span class="line_a"> |</span>
										<a href="javascript:void(0);">编辑</a><span class="line_a"> |</span>
										<a href="javascript:void(0);" style="color: #d98500;">屏蔽</a><span class="line_a"> |</span>
										<a href="javascript:void(0);" style="color: #a00;">移到回收站</a>
									</div>
								</div>
							</div>
						</div>




					</div>
				</div>
			</div>

			<div class="col-lg-3">
				<div class="admin_second">
					<div class="admin_modle-title">快速草稿</div>
					<div class="admin_modle_content">
						<div class="row">
							<form>
								<div class="form-group">
									<input type="email" class="form-control" id="exampleInputEmail1" placeholder="标题" style="width: 97%;margin-top: 5px;">
								</div>
								<textarea class="form-control" rows="3" style="width: 97%;resize: none;" placeholder="请输入草稿内容"></textarea><br>
								<button type="submit" class="btn btn-info">保存草稿</button>
							</form>
						</div>
					</div>
				</div>
				<div class="admin_second">
					<div class="admin_modle-title">媒体库上传</div>
					<div class="admin_modle_content">
						<div class="row">
							<form>
								<input type="file" id="exampleInputFile"><br>
								<input type="email" class="form-control" id="exampleInputEmail1" placeholder="文件描述(选填)" style="width: 97%;margin-top: 5px;"><br>
								<button type="submit" class="btn btn-info">保存草稿</button>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="admin_second">
					<div class="admin_modle-title">近期操作日志</div>
					<div class="admin_modle_content" style="padding-right: 10px">
						<div class="row">
							<table class="table table-condensed">
								<tr>
									<td class="td_title">
										<span class="label label-primary">新增</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
										2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-info">修改</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-warning">警告</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-danger">删除</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-danger">删除</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-danger">删除</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-danger">删除</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-danger">删除</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-danger">删除</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-danger">删除</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-warning">警告</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-warning">警告</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-warning">警告</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>
								<tr>
									<td class="td_title">
										<span class="label label-warning">警告</span>
									</td>
									<td>
										<a href="javascript:void(0)">ROOT</a>
                                        2017年3月4日
										<a href="javascript:void(0)">《我的文章》</a>
									</td>
								</tr>

							</table>
						</div>
					</div>
				</div>
			</div>

			<div class="col-lg-3">
				<div class="admin_second">
					<div class="admin_modle-title">历史</div>
					<div class="admin_modle_content">
						<div class="row">
							<div class="col-lg-4">
								<a href="javascript:void(0)"><i class="fa fa-pencil content_icon_font"></i>500文章</a>
							</div>
							<div class="col-lg-4">
								<a href="javascript:void(0)"><i class="fa fa-commenting content_icon_font"></i>800评论</a>
							</div>
							<div class="col-lg-4">
								<a href="javascript:void(0)"><i class="fa fa-paper-plane content_icon_font"></i>200留言</a>
							</div>
						</div>
						<br>
						<div class="row">
							<div class="col-lg-4">
								<a href="javascript:void(0)"><i class="fa fa-user content_icon_font"></i>300用户</a>
							</div>
							<div class="col-lg-4">
								<a href="javascript:void(0)"><i class="fa fa-mouse-pointer content_icon_font"></i>3200访问</a>
							</div>
							<div class="col-lg-4">
								<a href="javascript:void(0)"><i class="fa fa-globe content_icon_font" ></i>6000IP</a>
							</div>
						</div>
						<br>
						<div class="row">
							<div class="col-lg-12" style="padding-left: 15px;">
								<i class="fa fa-calendar content_icon_font" ></i>已运行时间：<a href="javascript:void(0)" style="text-decoration:none;">200天21小时65分32秒</a>
							</div>
						</div>

					</div>
				</div>
			</div>

			<div class="col-lg-3">
				<div class="admin_second">
					<div class="admin_modle-title">服务器资源使用量：2017/3/6 12:52</div>
					<div class="admin_modle_content" style="padding-left: 20px;">
						<span style="font-weight: 600">内存占用量：</span><br>
						<span style="font-weight: 600">CPU占用量：</span><br>
						<span style="font-weight: 600">数据库大小：</span><br>
						<span style="font-weight: 600">媒体库大小：</span><br>
						<span style="font-weight: 600">最近GC时间：</span><br>
						<span style="font-weight: 600">最近GC回收：</span><br>

					</div>
				</div>
			</div>
			<div class="col-lg-3">
				<div class="admin_second">
					<div class="admin_modle-title">搜索引擎最后爬取时间</div>
					<div class="admin_modle_content" style="padding-left: 20px;">
						<span style="font-weight: 600">百度：</span><br>
						<span style="font-weight: 600">搜狗：</span><br>
						<span style="font-weight: 600">360：</span><br>
					</div>
				</div>
			</div>

		</div>



	</div>

	</body>
</template>





