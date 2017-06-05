<template>
  <div id="app" v-cloak>
    <nv-header></nv-header>
    <nv-top></nv-top>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import nvTop from './components/backtoTop.vue'
  import nvHeader from './components/header.vue'
  export default {
    name: 'app',
    components: {
      nvTop,
      nvHeader
    },
    watch: {
      '$route' (to, from) { // 点击菜单列表项时，引起路由变化时，设置侧边栏菜单的状态navMenuStatus:false,隐藏菜单
        this.$store.dispatch('setNavStatus', false)
      }
    }
  }
</script>

<style>
#app {

}
</style>
