<template>
  <!-- 卡片 -->
  <el-card>
    <!-- header具名是给卡片的 -->
    <bread-crumb slot="header">
      <!-- title具名 是面包屑组件的具名 -->
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- http-request 自定义上传 -->
    <el-upload :show-file-list="false" :http-request="uploadImg" action class="too-difficult">
      <el-button type="primary">图片上传</el-button>
    </el-upload>
    <!-- el-tabs => el-tab-pane -->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <!-- 全部素材 -->
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <div class="operate">
              <i
                @click="changeCollected(item)"
                :style="{color: item.is_collected ? 'red' : '#000'}"
                class="el-icon-star-on"
              ></i>
              <i @click="delMaterial(item.id)" class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
      <el-row type="flex" justify="center">
        <el-pagination
          @current-change="currentChange"
          @size-change="sizeChange"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="page.currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="page.pageSize"
          :total="page.total"
        ></el-pagination>
      </el-row>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // 默认选中全部
      list: [], // 定义一个list接收数据
      // 分页信息
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    // 收藏状态切换
    async changeCollected (item) {
      await this.$axios({
        url: `/user/images/${item.id}`,
        method: 'put',
        data: { collect: !item.is_collected }
      })
      this.$message({ message: `素材${item.is_collected ? '取消' : ''}收藏成功`, type: 'success' })
      this.getMaterial()
    },
    // 删除素材
    delMaterial (id) {
      this.$confirm('你确定要删除该素材吗？').then(async () => {
        await this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        })
        this.$message({ message: '删除素材成功', type: 'success' })
        this.getMaterial()
      }).catch(() => {})
    },
    //   上传方法
    async uploadImg (params) {
      // 声明一个新的表单
      const data = new FormData()
      data.append('image', params.file)
      // 上传文件
      await this.$axios({
        url: '/user/images',
        method: 'post',
        data
      })
      this.$message({ message: '素材上传成功', type: 'success' })
      this.getMaterial()
    },
    // 当页码改变时 会传入一个参数
    currentChange (newPage) {
      this.page.currentPage = newPage // 将最新页码赋值给currentPage
      this.getMaterial() // 获取最新数据
    },
    // 当页码改变时 会传入一个参数
    sizeChange (newSize) {
      this.page.currentPage = 1
      this.page.pageSize = newSize // 将最新页码赋值给currentPage
      this.getMaterial() // 获取最新数据
    },
    // 切换页签方法
    changeTab () {
      // 首先要把页码归1
      this.page.currentPage = 1
      this.getMaterial()
    },
    //   获取素材列表
    async getMaterial () {
      // this.activeName === 'collect' 相当于去找收藏的数据
      // 如果不等于collect 相等于去找全部的数据
      let result = await this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      })
      this.list = result.data.results
      this.page.total = result.data.total_count // 赋值总数  每次总条数都会重新赋值
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.too-difficult {
  position: absolute;
  right: 30px;
  margin-top: -10px;
  z-index: 1;
}
.img-list {
  display: flex;
  flex-wrap: wrap;
  .img-item {
    width: 250px;
    height: 250px;
    border-radius: 6px;
    margin: 30px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      background-color: #f4f5f6;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i {
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
}
</style>
