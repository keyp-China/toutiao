<template>
  <el-card
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="title" label="标题" width="800px"></el-table-column>
      <el-table-column :formatter="checkStatus" prop="comment_status" label="评论状态" align="center"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数" align="center"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数" align="center"></el-table-column>
      <el-table-column prop label="操作" align="center">
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button
            type="text"
            size="small"
            @click="triggerStatus(obj.row)"
          >{{ obj.row.comment_status ? "关闭评论" : '打开评论' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin-top:10px">
      <el-pagination
        @current-change="currentChange"
        @size-change="sizeChange"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import { getComment, triggerStatus } from '../../api/comment'
export default {
  data () {
    return {
      list: [], // 数据列表
      page: {
        total: 0, // 总条数
        pageSize: 10, // 每页显示条数
        currentPage: 1 // 当前页码
      },
      loading: false // 加载
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      return row.comment_status ? 'success-row' : 'warning-row'
    },
    // 改变当前页
    currentChange (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    // 改变每页的值
    sizeChange (newSize) {
      this.page.currentPage = 1
      this.page.pageSize = newSize
      this.getComment()
    },
    // 切换评论状态
    triggerStatus (row) {
      let status = row.comment_status ? '关闭' : '开启'
      this.$confirm(`你确定是否要${status}该条评论么?`)
        .then(async () => {
          await triggerStatus(row)
          this.$message({ message: `${status}成功！`, type: 'success' })
          this.getComment()
        })
        .catch(() => {})
    },
    // 判断评论状态显示
    checkStatus (row, column, cellValue, index) {
      return cellValue ? `正常` : `关闭`
    },
    // 获取评论列表
    async getComment () {
      this.loading = true
      let params = {
        response_type: 'comment',
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      let result = await getComment(params)
      this.list = result.data.results
      // 设置total 总条数
      this.page.total = result.data.total_count
      this.loading = false
    }
  },
  // 钩子函数 创建组件是执行
  created () {
    this.getComment()
  }
}
</script>
<style lang='less' scoped>
.el-table /deep/ .warning-row {
  background-color: oldlace;
}

.el-table /deep/ .success-row {
  background-color: #f0f9eb;
}
</style>
