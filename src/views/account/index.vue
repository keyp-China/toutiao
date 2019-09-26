<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form
      :model="formData"
      :rules="rules"
      ref="formData"
      label-width="100px"
      style="width:600px;margin-left:100px;"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="头条简介" prop="intro">
        <el-input v-model="formData.intro"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formData.mobile" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="editUserInfo" type="primary">保存</el-button>
        <el-button @click="getUserInfo">重置</el-button>
      </el-form-item>
    </el-form>
    <el-upload action :http-request="uploadImg" :show-file-list="false">
        <img :src="formData.photo ? formData.photo : defaultPhoto" class="headPhoto" />
    </el-upload>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus' // 引入事件公交
export default {
  data () {
    return {
      defaultPhoto: require('../../assets/img/avatar.jpg'), // 默认用户头像
      formData: {},
      rules: {
        name: [
          { required: true, message: '请输入用户名' },
          { max: 7, message: '用户名不能超过7个字符' }
        ],
        intro: [{ required: true, message: '请输入头条简介' }],
        email: [
          { required: true, message: '请输入邮箱' },
          {
            pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
            message: '邮箱格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    // 上传头像的方法
    async uploadImg (params) {
      let formdata = new FormData()
      formdata.append('photo', params.file)
      let result = await this.$axios({
        url: '/user/photo',
        method: 'patch',
        data: formdata
      })
      this.formData.photo = result.data.photo
      this.$message({ message: '头像更换成功', type: 'success' })
      eventBus.$emit('updateUserInfo')
    },
    // 修改用户信息
    editUserInfo () {
      this.$refs.formData.validate(async isOK => {
        if (isOK) {
          await this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          })
          this.$message({ message: '账户信息修改成功', type: 'success' })
          eventBus.$emit('updateUserInfo')
        }
      })
    },
    // 获取用户信息
    async getUserInfo () {
      let result = await this.$axios({
        url: '/user/profile'
      })
      this.formData = result.data
      eventBus.$emit('updateUserInfo')
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.headPhoto {
    position: relative;
    width: 200px;
    height: 200px;
    top: -300px;
    left: 800px;
    border-radius: 50%;
}
</style>
