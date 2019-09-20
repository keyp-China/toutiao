<template>
  <el-row class="header" type="flex" align="middle" justify="space-between">
    <el-col :span="6" class="left">
      <div>
        <i class="el-icon-s-unfold icon"></i>
        <span class="title">北京今日头条科技有限公司</span>
      </div>
    </el-col>
    <el-col :span="4" class="right">
      <img class="head-img" src="../../assets/img/avatar.jpg" />
      <el-dropdown trigger="click">
        <!-- 匿名插槽 -->
        <span class="el-dropdown-link">
          15004544540
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  .left {
    .icon {
      font-size: 22px;
      margin-right: 5px;
    }
    .title {
      vertical-align: top;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>
