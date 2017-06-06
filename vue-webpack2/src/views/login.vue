<template>
  <div>
    <section class="login-page">
      <div class="input-token">
        <input class="token" type="text" placeholder="请输入正确的token" maxlength="36" v-model="accesstoken">
      </div>
      <div class="login-btn">
        <button class="btn" @click="login">登录</button>
      </div>
    </section>
  </div>
</template>

<script>
  import api from '../fetch/api'
  import {mapActions} from 'vuex'
  export default {
    data () {
      return {
        accesstoken: ''
      }
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
            this.$router.go(-1) // 这里是$router，不是$route
          }
        }).catch(error => {
          console.log(error)
          console.log(error.responseText)
          console.log(JSON.parse(error.responseText))
        })
      }
    }
  }
</script>

<style>

</style>
