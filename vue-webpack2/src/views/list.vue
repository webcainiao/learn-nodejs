<template>
  <div>
    <div class="tab-list">
      <router-link class="topic-tab" :class="{'current-tab':!this.$route.query.tab}" to="/">全部</router-link>
      <router-link class="topic-tab" :class="{'current-tab':this.$route.query.tab == 'good'}" to="/?tab=good">精华</router-link>
      <router-link class="topic-tab" :class="{'current-tab':this.$route.query.tab == 'share'}" to="/?tab=share">分享</router-link>
      <router-link class="topic-tab" :class="{'current-tab':this.$route.query.tab == 'ask'}" to="/?tab=ask">问答</router-link>
      <router-link class="topic-tab" :class="{'current-tab':this.$route.query.tab == 'job'}" to="/?tab=job">招聘</router-link>
      <router-link class="topic-tab" :class="{'current-tab':this.$route.query.tab == 'dev'}" to="/?tab=dev">客户端测试</router-link>
    </div>
    <section class="content-page">
      <ul class="topic-list">
        <li v-for="item in topics" :key="item.id">
          <router-link :to="{name:'topic',params:{id:item.id}}">
            <h3 v-text="item.title" :title="getTabInfo(item.good,item.top,item.tab,true)" :class="getTabInfo(item.good,item.top,item.tab,false)">
            </h3>
            <div class="content">
              <img :src="item.author.avatar_url">
              <div>
                <p>
                  <span class="name">
                    {{item.author}}
                  </span>
                  <span class="status">
                    <b>{{item.reply_count}}</b>
                    /{{item.visit_count}}
                  </span>
                </p>
                <p>
                  <span>
                    创建于：<time>{{item.create_at | formatDate}}</time>
                  </span>
                  <span>
                    最新回复于：<time>{{item.last_reply_at | formatDate}}</time>
                  </span>
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import nvHead from '../components/header.vue'
  import nvTop from '../components/backtoTop.vue'
  import * as utils from '../libs/utils'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      nvHead,
      nvTop
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        window.addEventListener('scroll', vm.scrollAddList, false)
      })
    },
    mounted () {
      if (this.topics.length === 0) {
        this.$store.dispatch('getTopicslist')
      }
    },
    computed: {
      ...mapGetters({
        topics: 'getTopicslist'
      })
    },
    methods: {
      getTabInfo (good, top, tab, isClass) {
        return utils.getTabInfo(good, top, tab, isClass)
      }
    }

  }
</script>

<style lang="scss" scoped>
  .topic-tab {
    margin: 0 10px;
    color: #80bd01;
    .current-tab {
      padding: 3px 4px;
      border-radius: 3px;
      background-color: #80bd01;
      color: #fff;
    }
  }
  .topic-list {
    h3 {
      &:hover {
        content: attr(title);
      }
    }
    .content {
      display: flex;

    }
  }
</style>
