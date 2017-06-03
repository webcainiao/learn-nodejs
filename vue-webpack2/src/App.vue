<template>
  <div id="app" v-cloak>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {

}
</style>
