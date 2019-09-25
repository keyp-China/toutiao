<template>
  <div class="aside">
    <div class="title">
      <img src="../../assets/img/toutiao.jpg" />
      <span>今日头条</span>
    </div>
    <!-- el-menu => router属性 true时,启用路由 -->
    <!-- :router="true"  和  router  -->
    <el-menu router :default-active="$route.path" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b" unique-opened>
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="content">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="fans">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/home/gradata">图文数据</el-menu-item>
        <el-menu-item index="/home/fanpro">粉丝概况</el-menu-item>
        <el-menu-item index="/home/fanpic">粉丝画像</el-menu-item>
        <el-menu-item index="/home/fanlist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
        <i class="el-icon-setting"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.aside {
  height: 100vh;
  width: 201px;
  .title {
    height: 50px;
    background-color: #000;
    padding-top: 10px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    img {
      vertical-align: middle;
      height: 35px;
      margin-right: 10px;
    }
  }
}
</style>
