<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    {{formData}}
    <el-form :model="formData" ref="formData" :rules="rules" style="margin-left: 50px" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="formData.content" type="textarea" :rows="8" placeholder="请输入内容" style="width:900px"></el-input>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publishArticle(false)">发表</el-button>
        <el-button @click="publishArticle(true)">存为草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        title: '', // 标题
        content: '', // 内容
        channel_id: null, // 频道id
        cover: { // 封面
          type: 0,
          images: []
        }
      },
      rules: {
        title: [{ required: true, message: '标题不允许为空' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符' }],
        content: [{ required: true, message: '内容不允许为空' }],
        channel_id: [{ required: true, message: '频道不允许为空' }]
      },
      channels: [] // 频道列表数组
    }
  },
  methods: {
    // 发布文章
    publishArticle (draft) {
      this.$refs.formData.validate(isOk => {
        debugger
        if (isOk) {
          this.$axios({
            url: '/articles',
            method: 'post',
            data: this.formData,
            params: { draft }
          }).then(() => {
            this.$message({ message: '数据处理成功', type: 'success' })
            this.$router.push('/home/articles')
          })
        }
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
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
