<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="header">
        <div style="text-algin:center">手机号登录/注册</div>
      </div>
      <div>
        <!--
            数据校验-1 el-form组件绑定 model属性 => 数据对象
            数据校验-2 el-form绑定 rules规则
        -->
        <el-form
          ref="loginFrom"
          :model="loginFrom"
          :rules="loginRules"
          @keyup.enter.native.prevent="login"
        >
          <!-- 数据校验-3 el-form-item配置prop，prop是校验的字段名(只写字段名)  -->
          <el-form-item prop="mobile">
            <el-input v-model="loginFrom.mobile" placeholder="请您输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="loginFrom.code" placeholder="请您输入验证码" style="width:73%"></el-input>
            <el-button style="float:right">发送验证码</el-button>
          </el-form-item>
          <el-form-item prop="agree">
            <el-checkbox v-model="loginFrom.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="login" style="width:100%">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // rule当前规则  value当前表单项的值  callback 回调函数
    let validator = (rule, value, callBack) =>
      value ? callBack() : callBack(new Error('请同意用户协议与隐私条款'))
    return {
      loginFrom: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      loginRules: {
        // 登录规则集合对象
        // 决定着校验规则  key(字段名):value(对象数组) => 一个对象就是一个校验规则
        // required 为true 就表示该字段必填 如果不填 就会提示消息
        // required只校验 null  '' undefined 和空字符串 ,但是不校验false/true
        mobile: [
          { required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '请输入合法的验证码' }
        ],
        agree: [{ validator }] // 自定义形式去校验
      }
    }
  },
  methods: {
    login () {
      // 校验整个表单的规则
      // validate 是一个方法 => 方法中传入的一个函数 两个校验参数  是否校验成功/未校验成功的字段
      this.$refs.loginFrom.validate(isOK => {
        if (isOK) {
          // 表单验证成功向服务端发送请求
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginFrom
          })
            .then(result => {
              // 请求成功后将返回数据中的token存入浏览器中
              window.localStorage.setItem('user_token', result.data.data.token)
              this.$message({
                message: '恭喜您，登陆成功',
                type: 'success'
              })
              this.$router.push('/')
            })
            .catch(() => {
              this.$message({
                message: '手机号或验证码不正确，请检验',
                type: 'warning'
              })
            })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 如果要在组件样式中写less 就要给一个lang属性 lang='less'
// 如果加了scoped属性 那么该style就会只对当前组件有效
.login {
  height: 100vh;
  background: url("../../assets/img/slogan.png") no-repeat center 30px,
    url("../../assets/img/logo.png") no-repeat 20px 10px,
    url("../../assets/img/login_bg.png");
  background-size: 680px, 100px, cover;

  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    padding-left: 20px;
    padding-top: 10px;
    img {
      height: 30px;
    }
  }
  .box-card {
    height: 350px;
    width: 500px;
    .header {
      text-align: center;
      font-size: 20px;
    }
  }
}
</style>
