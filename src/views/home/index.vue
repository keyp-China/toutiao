<template>
  <!-- 外层容器 -->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside style="width:200px;overflow:hidden;backgroundColor:#323745" >
      <layout-aside></layout-aside>
    </el-aside>
    <!-- 右侧容器 -->
    <el-container>
      <!-- 顶栏 -->
      <el-header style="height:50px;">
        <layout-header></layout-header>
      </el-header>
      <!-- 主要区域 -->
      <el-main style="backgroundColor:#eee;">
        <!-- 二级路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
</script>

<style>
</style>
