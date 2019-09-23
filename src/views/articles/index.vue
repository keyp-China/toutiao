<template>
  <div>
    <el-card>
      <bread-crumb slot="header">
        <template slot="title">内容列表</template>
      </bread-crumb>
      <el-form style="margin-left:50px">
        <el-form-item label="文章状态：">
          <el-radio-group v-model="searchFrom.radio" @change="changeFrom">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="0">草稿</el-radio-button>
            <el-radio-button label="1">待审核</el-radio-button>
            <el-radio-button label="2">审核通过</el-radio-button>
            <el-radio-button label="3">审核失败</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
          <el-select v-model="searchFrom.select" filterable placeholder="请选择" @change="changeFrom">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <el-date-picker
            v-model="searchFrom.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeFrom"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="content">
      <div class="title">共找到{{page.total}}条符合条件的内容</div>
      <div class="item" v-for="item in list" :key="item.id.toString()">
        <div class="left">
          <img :src="item.cover.images.length ? item.cover.images[0] : defaultCover" />
          <div>
            <span class="tagline">{{item.title}}</span>
            <span>
              <el-tag :type="item.status | statusValue">{{item.status | statusText}}</el-tag>
            </span>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span @click="delArticles(item.id)">
            <i class="el-icon-delete"></i>删除
          </span>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchFrom: {
        radio: 'all', // 文章状态
        select: null, // 频道列表
        date: [] // 时间选择
      },
      channels: [], // 频道列表数组
      list: [], // 内容列表数据
      defaultCover: require('../../assets/img/404.png'), // 默认封面
      // 分页信息
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    delArticles (id) {
      this.$confirm('你确定要删除该文章内容吗？').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.$message({ message: '删除内容成功', type: 'success' })
          this.getArticles()
        })
      })
    },
    // 查询form改变事件方法
    changeFrom () {
      this.getArticles()
    },
    // 当页码改变时 会传入一个参数
    currentChange (newPage) {
      this.page.currentPage = newPage // 将最新页码赋值给currentPage
      this.getArticles()
    },
    // 当页码改变时 会传入一个参数
    sizeChange (newSize) {
      this.page.currentPage = 1
      this.page.pageSize = newSize // 将最新页码赋值给currentPage
      this.getArticles()
    },
    // 获取内容列表
    getArticles () {
      let params = {
        status: this.searchFrom.radio === 'all' ? null : this.searchFrom.radio,
        channel_id: this.searchFrom.select,
        begin_pubdate: this.searchFrom.date.length
          ? this.searchFrom.date[0]
          : null,
        end_pubdate:
          this.searchFrom.date.length > 1 ? this.searchFrom.date[1] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.page.total = result.data.total_count
        this.list = result.data.results
      })
    },
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  filters: {
    // 转换状态的名称
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
        default:
          return '状态不存在'
      }
    },
    // 转换状态的颜色
    statusValue (value) {
      switch (value) {
        case 0:
          return 'info'
        case 1:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'danger'
        default:
          return 'danger'
      }
    }
  },
  created () {
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
.content {
  margin-top: 0px;
  background-color: #fff;
  padding: 0 20px;
  .title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px dashed #ccc;
  }
  .item {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #f2f3f5;
    .left {
      display: flex;
      img {
        height: 100px;
        width: 150px;
        margin-right: 10px;
      }
      div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .tagline {
          font-size: 14px;
        }
        .date {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .right {
      span {
        margin-right: 15px;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
</style>
