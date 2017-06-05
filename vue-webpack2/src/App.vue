<template>
  <div id="app" v-cloak>
    <nv-header :show="menuShow"></nv-header>
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
    data () {
      return {
        menuShow: false
      }
    },
    watch: {
      '$route' (to, from) {
        this.menuShow = false
      }
    }
  }
</script>

<style>
#app {

}
</style>
