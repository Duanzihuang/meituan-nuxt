<template>
  <div class="page-login">
    <div class="login-header">
      <a href="" class="logo"></a>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" alt="" width="480"
          height="370">
      </div>
      <div class="form">
        <h4 v-if="error" class="tips">
          <i/>{{error}}
        </h4>
        <p><span>账号登录</span></p>
        <el-input v-model="username" prefix-icon="profile"></el-input>
        <el-input v-model="password" prefix-icon="password" type="password"></el-input>
        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b>忘记密码?</b>
        </div>
        <el-button class="btn-login" type="success" size="mini" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
  export default {
    layout:'blank',
    data(){
      return {
        username:'',
        password:'',
        checked:true,
        error:''
      }
    },
    methods:{
      async login(){
        const {status,data} = await this.$axios.post('/users/signin',{
          username:this.username,
          password:CryptoJS.MD5(this.password).toString()
        })

        if (status === 200) {
          if (data && data.code ===0) {
            location.href = '/'
          } else {
            this.error = data.msg
          }
        } else {
          this.error = "服务器出错"
        }

        setTimeout(() => {
          this.error = ''
        }, 2000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "@/assets/css/login/index.scss";
</style>

