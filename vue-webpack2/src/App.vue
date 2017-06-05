<template>
  <div id="app" v-cloak>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <nv-header></nv-header>
    <nv-top></nv-top>
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
    }
  }
</script>

<style>
#app {

}
</style>
