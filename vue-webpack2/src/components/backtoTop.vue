<template>
  <div class="back-top" @click="goTop" v-show="show">
    顶部
  </div>
</template>

<script>
  export default {
    data () {
      return {
        show: false
      }
    },
    mounted () {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
          this.show = true
        } else {
          this.show = false
        }
      }, false)
    },
    methods: {
      goTop () {
        window.scrollTo(0, 0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .back-top {
    position: fixed;
    right: 20px;
    bottom: 40px;
    width: 30px;
    height: 30px;
    background-color: blue;
    color: white;
  }
</style>
