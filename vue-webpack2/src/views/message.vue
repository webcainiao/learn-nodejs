<template>
  <div>
    <ul>
      <li :class="{'on':tabIndex===1}" @click="toTabIndex(1)">已读消息</li>
      <li :class="{'on':tabIndex===2}" @click="toTabIndex(2)">未读消息</li>
    </ul>
    <div class="msg-list">
      <ul>
        <li v-for="msg in currentMsgData">
          <div class="reply-userinfo">
            <router-link :to="{name:'user',params:{username:msg.author.loginname}}">
              <img src="msg.author.avatar_url">
            </router-link>
            <div>
              <div class="replyer-name">
                {{msg.author.loginname}}
                <time>{{msg.create_at | formatDate}}</time>
              </div>
              <div class="reply-title">
                <span v-if="msg.type == 'at'">在回复中@了您</span>
                <span v-if="msg.type == 'reply'">回复了您的话题</span>
                <router-link :to="{name:'topic',params:{id:msg.topic.id}}">{{msg.topic.title}}</router-link>
              </div>
            </div>
          </div>
          <div class="markdown-body reply-content" v-html="msg.reply.content">

          </div>
        </li>
      </ul>
    </div>
    <div class="no-data" v-show="noData">没有消息</div>
  </div>
</template>

<script>
  // import {mapState} from 'vuex'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        currentMsgData: [],
        tabIndex: 1,
        noData: false
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.dispatch('getMessagesData')
      })
    },
    computed: {
      // ...mapState({
      //   msgList: state => state.message.msgList
      // })
      ...mapGetters({
        msgList: 'getMsgList'
      }),
    //   currentMsgData: () => {
    //     let hasRead = this.msgList.has_read_messages
    //     let hasNotread = this.msgList.hasnot_read_messages
    //     if (this.tabIndex === 1) {
    //       this.noData = hasRead.length === 0
    //       return hasRead
    //     } else {
    //       this.noData = hasNotread.length === 0
    //       return hasNotread
    //     }
    //   }
    // },
    mounted () {
      // 不知道为什么获取到的计算属性this.msgList是空的，好纠结
      // 这里面应该不能执行条件判断
      // let hasRead = this.msgList.has_read_messages
      // let hasNotread = this.msgList.hasnot_read_messages
      // if (this.tabIndex === 1) {
      //   this.currentMsgData = hasRead
      //   this.noData = hasRead.length === 0
      // } else {
      //   this.currentMsgData = hasNotread
      //   this.noData = hasNotread.length === 0
      // }
    },
    methods: {
      toTabIndex (index) {
        this.tabIndex = index
        if (index === 1) {
          this.currentMsgData = this.msgList.has_read_messages
          this.noData = this.currentMsgData === 0
        } else {
          this.currentMsgData = this.msgList.hasnot_read_messages
          this.noData = this.currentMsgData === 0
        }
      }
    }
  }
</script>

<style>

</style>
