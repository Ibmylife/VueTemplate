<template>
  <Menu active-name="1-2" theme="dark" width="auto">
    <router-link id="webMsg" to="/admin/adminHome">
      <img style="width: 70%" src="../../../assets/blog/pic/leftsee.png"/>
    </router-link>

    <Submenu name="3">
      <template slot="title">
        <Icon type="ios-paper-outline"/>
        文章
      </template>
      <MenuItem name="3-1" to="/admin/allArticle">全部文章</MenuItem>
      <MenuItem name="3-2" to="/admin/writerArticle">写文章</MenuItem>
      <MenuItem name="3-3" to="/admin/typeAdmin">类别管理</MenuItem>
    </Submenu>
    <!--  <Submenu name="4">
         <template slot="title">
             <Icon type="ios-copy-outline" />
             专题
         </template>
         <MenuItem name="4-1">添加专题</MenuItem>
         <MenuItem name="4-2">专题管理</MenuItem>
     </Submenu> -->
    <!-- <Submenu name="5">
        <template slot="title">
            <Icon type="ios-help-circle-outline" />
            关于
        </template>
        <MenuItem name="5-1">关于网站</MenuItem>
        <MenuItem name="5-2">友情链接</MenuItem>
    </Submenu> -->
    <Submenu name="6">
      <template slot="title">
        <Icon type="ios-film-outline"/>
        媒体
      </template>
      <MenuItem name="6-1" to="/admin/mediaLibrary">媒体库管理</MenuItem>
    </Submenu>
    <!--         <Submenu name="7">
                <template slot="title">
                    <Icon type="ios-text-outline" />
                    评论
                </template>
                <MenuItem name="7-1">评论管理</MenuItem>
                <MenuItem name="7-2">留言管理</MenuItem>
            </Submenu> -->
    <!-- <Submenu name="8">
        <template slot="title">
            <Icon type="ios-leaf-outline" />
            外观
        </template>
        <MenuItem name="8-1">外观管理</MenuItem>
    </Submenu> -->
    <!-- <Submenu name="9">
        <template slot="title">
            <Icon type="md-person" />
            用户
        </template>
        <MenuItem name="9-1">用户管理</MenuItem>
        <MenuItem name="9-2">添加用户</MenuItem>
        <MenuItem name="9-3">角色管理</MenuItem>
    </Submenu> -->
    <!-- <Submenu name="10">
        <template slot="title">
            <Icon type="md-settings" />
            设置
        </template>
        <MenuItem name="10-1">网站设置</MenuItem>
        <MenuItem name="10-2">定时器设置</MenuItem>
        <MenuItem name="10-3">媒体库设置</MenuItem>
    </Submenu> -->
    <!-- <Submenu name="11">
        <template slot="title">
            <Icon type="ios-hammer-outline" />
            工具
        </template>
        <MenuItem name="11-1">日志</MenuItem>
        <MenuItem name="11-2">归档导出</MenuItem>
        <MenuItem name="11-3">回收站</MenuItem>
    </Submenu> -->


  </Menu>
</template>
<script>
  export default {}
</script>
<style scoped>
  #webMsg {
    margin-left: 37px;
    margin-top: 14px;
    display: block;
    margin-bottom: 6px;
  }
</style>
