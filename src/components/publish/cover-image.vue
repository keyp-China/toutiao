<template>
  <div class="coverImage">
      <div v-for="(item,index) in images" :key="index" class="itemImage" @click="clickImg(index)">
          <img :src="item ? item : defaultImg">
      </div>
      <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
          <select-image @selectImg="selectImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'], // 接收父组件值
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 默认图片
      dialogVisible: false, // 对话窗是否显示
      index: -1 // 存储点击图片值
    }
  },
  methods: {
    // 点击图片 打开对话框
    clickImg (index) {
      this.dialogVisible = true
      this.index = index
    },
    // 接收子传来的值
    selectImg (url) {
      this.$emit('selectImg', url, this.index) // 继续往父级组件传值
      this.dialogVisible = false // 关闭对话框
    }
  }
}
</script>

<style lang="less" scoped>
.coverImage {
    display: flex;
    margin-left: 90px;
    .itemImage {
        border: 1px solid #ccc;
        margin-left: -1px;
        padding: 2px;
        height: 200px;
        width: 240px;
        img{
            height: 100%;
            width: 100%;
        }
    }
}
</style>
