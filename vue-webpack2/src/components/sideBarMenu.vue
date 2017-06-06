<template>
  <div class="menu">
    <div class="slide" :class="{'slide-in':show}">
      <router-link to="/">首页</router-link>
      <router-link to="/add">发布</router-link>
      <router-link to="/message">消息</router-link>
      <router-link to="/about">关于</router-link>
      <router-link v-if="loginStatus" to="/login">登录</router-link>
      <router-link v-if="!loginStatus" @click="loginOut">退出</router-link>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'
  export default {
    props: ['show'],
    computed: {
      ...mapState({
        loginStatus: state => state.user.loginStatus
      })
    },
    methods: {
      ...mapActions({
        setLoginOut: 'setLoginOut'
      }),
      loginOut () {
        this.setLoginOut()
        this.$router.push({name: 'list'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 200px;
    left: -200px;
    z-index: 10;
    .slide {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #444;
      transition: all 0.3s ease;
      color: #fff;
    }
    .slide-in {
      transform: translateX(200px)
    }
  }
</style>
