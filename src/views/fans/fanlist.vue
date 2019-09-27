<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">粉丝列表</template>
    </bread-crumb>
    <fans-menu></fans-menu>
    <el-card>
      <div class="fans-list">
        <div class="fans-item" v-for="(item,key) in list" :key="key">
          <img :src="item.photo" />
          <span>{{item.name}}</span>
        </div>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          @current-change="currentChange"
        ></el-pagination>
      </el-row>
    </el-card>
  </el-card>
</template>

<script>
import { getFansList } from '../../api/fans'
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0,
        pageSize: 40,
        currentPage: 1
      }
    }
  },
  methods: {
    // 点击页面改变事件
    currentChange (newPage) {
      this.page.currentPage = newPage
      this.getFansList()
    },
    // 获取粉丝列表
    async getFansList () {
      let params = { page: this.page.currentPage, per_page: this.page.pageSize }
      let result = await getFansList(params)
      this.list = result.data.results
      this.page.total = result.data.total_count
    }
  },
  created () {
    this.getFansList()
  }
}
</script>

<style lang="less" scoped>
.fans-list {
  display: flex;
  flex-wrap: wrap;
  .fans-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 110px;
    width: 130px;
    border: 1px solid #ccc;
    margin: 14px;
    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      margin: 10px;
    }
  }
}
</style>
