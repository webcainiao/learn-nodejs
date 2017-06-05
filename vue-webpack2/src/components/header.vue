<template>
  <div>
    <header class="head-box">
      <span class="head-btn menu-btn" @click="showSideMenu">菜单</span>
      <span class="head-btn goback-btn" @click="goBack">返回</span>
    </header>
    <div class="mask" v-show="navMenuStatus" @click="hideSideMenu"></div>
    <nv-menu :show="navMenuStatus"></nv-menu>
  </div>
</template>

<script>
  import nvMenu from './sideBarMenu.vue'
  import {mapState} from 'vuex'
  export default {
    // data () {
    //   return {
    //     show: false
    //   }
    // },
    // props: ['show'],
    // 不能操作props属性，只可作为父子传递信息的变量
    components: {
      nvMenu
    },
    computed: {
      ...mapState({
        navMenuStatus: state => state.com.navMenuStatus
      })
    },
    methods: {
      showSideMenu () {
        this.$store.dispatch('setNavStatus', true)
      },
      hideSideMenu () {
        this.$store.dispatch('setNavStatus', false)
      },
      goBack () {
        this.$router.go(-1)
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
