<template>
  <div>
    <header class="head-box">
      <span class="head-btn menu-btn" @click="showSideMenu">菜单</span>
      <span class="head-btn goback-btn" @click="goBack">返回</span>
    </header>
    <div class="mask" v-show="show" @click="hideSideMenu"></div>
    <nv-menu :show="show"></nv-menu>
  </div>
</template>

<script>
  import nvMenu from './sideBarMenu.vue'
  export default {
    data () {
      retrun {
        show: false
      }
    },
    components: {
      nvMenu
    },
    methods: {
      showSideMenu () {
        this.show = true
      },
      hideSideMenu () {
        this.show = false
      },
      goBack () {
        this.$route.go(-1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mask {
    position: fixed;
    right: 0px;
    top: 0px;
    left: 0px;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 9;
  }
</style>
