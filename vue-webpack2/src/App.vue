<template>
  <div id="app" v-cloak>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
    <nv-top></nv-top>
  </div>
</template>

<script>
  import nvTop from './components/backtoTop.vue'
  export default {
    name: 'app',
    components: {
      nvTop
    }
  }
</script>

<style>
#app {

}
</style>
