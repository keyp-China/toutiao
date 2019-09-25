<template>
  <el-tabs>
    <el-tab-pane label="素材库">
      <el-card class="itemCard">
        <img :src="item.url" v-for="item in list" :key="item.id" @click="sendImg(item.url)" />
        <!-- 分页 -->
        <el-row type="flex" justify="center" style="margin:10px 0">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            @current-change="currentChange"
          ></el-pagination>
        </el-row>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="上传图片">
      <el-upload class="avatar-uploader" action :http-request="uploadImg" :show-file-list="false">
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      list: [], // 图片素材列表
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 12
      }
    }
  },
  methods: {
    // 上传方法
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      // 上传文件
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        this.sendImg(result.data.url) // 调用给父传值的方法
      })
    },
    // 给父传值
    sendImg (url) {
      this.$emit('selectImg', url)
    },
    // 分页按钮事件
    currentChange (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 获取素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          per_page: this.page.pageSize,
          page: this.page.currentPage
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.itemCard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  img {
    margin: 8px;
    width: 200px;
    height: 140px;
  }
}

.avatar-uploader .el-upload {
  border: 1px solid #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
