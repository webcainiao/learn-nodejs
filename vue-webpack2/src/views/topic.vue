<template>
  <div>
    <h2 v-text="topic.title"></h2>
    <section class="author-info">
      <img :src="topic.author.avatar_url">
      <div>
        <p>
          <span>{{topic.author.loginname}}</span>
          <span v-text="getTabInfo(topic.good,topic.top,topic.tab,false)"></span>
        </p>
        <p>
          <span>
            <time>创建于：{{topic.create_at | formatDate}}</time>
          </span>
          <span>{{topic.visit_count}}次浏览</span>
        </p>
      </div>
    </section>
    <section class="markdown-body" v-html="topic.content">

    </section>
    <h3 class="topic-reply">
      <strong>{{topic.reply_count}}回复</strong>
    </h3>
    <section class="reply-list">
      <ul>
        <li v-for="(reply,index) in topic.replies">
          <div class="reply-user">
            <router-link :to="{name:'user',params:{username:reply.author.loginname}}">
              <img :src="reply.author.avatar_url">
            </router-link>
            <p>
              <span>{{reply.author.loginname}}</span>
              <span><time>{{reply.create_at | formatDate}}</time></span>
            </p>
          </div>
          <div class="reply-content" v-html="reply.content">

          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as utils from '../libs/utils'
  export default {
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.dispatch('getTopicDetail', vm.$route.params)
      })
    },
    // mounted () {
    //   this.$store.dispatch('getTopicDetail', this.$route.params)
    // },
    computed: {
      ...mapGetters({
        topic: 'getTopicDetail'
      })
    },
    methods: {
      getTabInfo (good, top, tab, isClass) {
        return utils.getTabInfo(good, top, tab, isClass)
      }
    }
  }
</script>

<style>

</style>
