<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="header">
        <div style="text-algin:center">手机号登录/注册</div>
      </div>
      <div>
        <el-form ref="form">
          <el-form-item>
            <el-input v-model="loginFrom.mobile" placeholder="请您输入手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginFrom.code" placeholder="请您输入验证码" style="width:73%"></el-input>
            <el-button style="float:right">发送验证码</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="loginFrom.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" style="width:100%">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginFrom: {
        mobile: '',
        code: '',
        agree: false
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
