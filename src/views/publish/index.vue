<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <el-form
      :model="formData"
      ref="formData"
      :rules="rules"
      style="margin-left: 50px"
      label-width="80px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入标题" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor v-model="formData.content" style="height:400px;width:1400px;"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" style="margin-top:80px">
        <el-radio-group v-model="formData.cover.type" @change="coverTypeChange">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <cover-image :images="formData.cover.images" @selectImg="selectImg"></cover-image>
      <el-form-item label="频道" prop="channel_id" style="margin-top:10px">
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
        cover: {
          // 封面
          type: 1,
          images: ['']
        }
      },
      rules: {
        title: [
          { required: true, message: '标题不允许为空' },
          { min: 5, message: '标题长度不能小于5个字符' }
        ],
        content: [{ required: true, message: '内容不允许为空' }],
        channel_id: [{ required: true, message: '频道不允许为空' }]
      },
      channels: [] // 频道列表数组
    }
  },
  methods: {
    // 接收子传值
    selectImg (url, index) {
      this.formData.cover.images = this.formData.cover.images.map((item, i) =>
        i === index ? url : item
      )
    },
    // 封面类型改变事件
    coverTypeChange () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 获取指定文章
    async getArticleById (articlesId) {
      let result = await this.$axios({
        url: `/articles/${articlesId}`
      })
      this.formData = result.data
    },
    // 发布文章
    publishArticle (draft) {
      // 获取是否有id
      let { articlesId } = this.$route.params
      this.$refs.formData.validate(async isOk => {
        if (isOk) {
          await this.$axios({
            url: articlesId ? `/articles/${articlesId}` : '/articles',
            method: articlesId ? 'put' : 'post',
            data: this.formData,
            params: { draft }
          })
          this.$message({ message: '数据处理成功', type: 'success' })
          this.$router.push('/home/articles')
        }
      })
    },
    // 获取频道列表
    async getChannels () {
      let result = await this.$axios({
        url: '/channels'
      })
      this.channels = result.data.channels
    }
  },
  created () {
    this.getChannels()
    // 判断是否存在id 是新增还是修改
    let { articlesId } = this.$route.params
    if (articlesId) {
      this.getArticleById(articlesId) // 获取指定文章的方法
    }
  }
}
</script>

<style>
</style>
