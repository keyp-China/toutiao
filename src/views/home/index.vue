<template>
  <!-- 外层容器 -->
  <el-container>
    <!-- 侧边栏 -->
    <el-aside>左侧</el-aside>
    <!-- 右侧容器 -->
    <el-container>
      <!-- 顶栏 -->
      <el-header>顶部</el-header>
      <!-- 主要区域 -->
      <el-main>
        <!-- 二级路由 -->
        二级路由
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
