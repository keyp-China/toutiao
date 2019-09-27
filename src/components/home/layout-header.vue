<template>
  <el-row class="header" type="flex" align="middle" justify="space-between">
    <el-col :span="6" class="left">
      <div>
        <i class="el-icon-s-unfold icon"></i>
        <span class="title">北京今日头条科技有限公司</span>
      </div>
    </el-col>
    <el-col :span="4" class="right">
      <img class="head-img" :src="userInfo.photo?userInfo.photo:defaultPhoto" />
      <el-dropdown trigger="click" @command="handleCommand">
        <!-- 匿名插槽 -->
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userInfo">个人信息</el-dropdown-item>
          <el-dropdown-item command="gitHub">git地址</el-dropdown-item>
          <el-dropdown-item command="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import { getUserInfo } from '../../api/account'
import eventBus from '../../utils/eventBus' // 引入事件公交
export default {
  data () {
    return {
      userInfo: {}, // 用户对象
      defaultPhoto: require('../../assets/img/avatar.jpg') // 默认用户头像
    }
  },
  methods: {
    // 获取用户个人信息
    async getUserInfo () {
      let result = await getUserInfo()
      this.userInfo = result.data
    },
    handleCommand (command) {
      if (command === 'userInfo') {
        // 个人信息
        this.$router.push('/home/account')
      } else if (command === 'gitHub') {
        // GitHub
        window.location.href = `https://github.com/keyp-China/toutiao`
      } else {
        // 退出
        this.$confirm('你确定是否要退出当前用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          window.localStorage.clear()
          this.$router.push('/login')
        }).catch(() => {})
      }
    }
  },
  created () {
    this.getUserInfo()

    eventBus.$on('updateUserInfo', () => {
      this.getUserInfo()
    })
  }
}
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
