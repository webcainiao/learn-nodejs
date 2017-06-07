<template>
  <div>
    <section class="login-page">
      <div class="need-login" v-if="!loginStatus">
        <div class="input-token">
          <input class="token" type="text" placeholder="请输入正确的token" maxlength="36" v-model="accesstoken">
        </div>
        <div class="login-btn">
          <button class="btn" @click="login">登录</button>
        </div>
      </div>
      <div class="logined" v-if="loginStatus">
        <span>已经登陆了</span>
      </div>
    </section>
  </div>
</template>

<script>
  import api from '../fetch/api'
  import {mapActions, mapState} from 'vuex'
  export default {
    data () {
      return {
        accesstoken: ''
      }
    },
    computed: {
      ...mapState({
        loginStatus: state => state.user.loginStatus
      })
    },
    methods: {
      ...mapActions({
        setUserInfo: 'setUserInfo'
      }),
      login () {
        if (!this.accesstoken) {
          return console.log('请输入正确的token')
        }
        api.Login(this.accesstoken).then(res => { // res是对象
          if (res.success) {
            let userInfo = Object.assign({accesstoken: this.accesstoken}, res)
            // 将返回的信息存入状态管理中,进而存储用户信息
            this.setUserInfo(userInfo)
            this.accesstoken = ''
            // redirect 针对进入需要验证登录状态的模块使用
            this.$router.push({
              path: this.$route.query.redirect || '/'
            }) // 注意这里的$router,$route
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>

<style>

</style>
