<template>
  <div>
    <ul>
      <li :class="{'on':tabIndex===1}" @click="toTabIndex(1)">已读消息</li>
      <li :class="{'on':tabIndex===2}" @click="toTabIndex(2)">未读消息</li>
    </ul>
    <div class="msg-list">
      <ul>
        <li v-for="msg in currentData">
          <div class="reply-userinfo">
            <router-link :to="{name:'user',params:{username:msg.author.loginname}}">
              <img :src="msg.author.avatar_url">
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
  import api from '../fetch/api'
  export default {
    data () {
      return {
        currentData: [],
        tabIndex: 1,
        noData: false,
        message: {}
      }
    },
    // beforeRouteEnter (to, from, next) {
    //   next(vm => {
    //     vm.$store.dispatch('getMessagesData', JSON.parse(localStorage.getItem('user')).accesstoken)
    //   })
    // },
    computed: {
      // ...mapState({
      //   msgList: state => state.message.msgList
      // })
      ...mapGetters({
        getUserInfo: 'getUserInfo'
      })
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
    },
    mounted () {
      api.GetMessages(JSON.parse(localStorage.getItem('user')).accesstoken).then(d => {
        if (d && d.data) {
          this.message = d.data
          this.no_read_len = d.data.hasnot_read_messages.length
          if (d.data.hasnot_read_messages.length > 0) {
            this.currentData = d.data.hasnot_read_messages
          } else {
            this.currentData = d.data.has_read_messages
            this.tabIndex = 1
          }
          this.noData = this.currentData.length === 0
        } else {
          this.noData = true
        }
      })
      // console.log(JSON.parse(localStorage.getItem('user')))
      // this.$store.dispatch('getMessagesData', this.getUserInfo.accesstoken)
      // console.log(this.getUserInfo)
      // console.log(this.msgList)
      // console.log(this.$store.getters.getMsgList)
      // console.log(this.$store.getters)
      // console.log(this.$store.state)
      // console.log(this.$store.state.message.msgList)
      // this.toTabIndex(1)
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
        // console.log(this.currentMsgData)
        // console.log(this.msgList)
        this.tabIndex = index
        if (index === 1) {
          this.currentData = this.message.has_read_messages
          this.noData = this.currentData.length === 0
          // console.log(this.currentMsgData)
        } else {
          this.currentData = this.message.hasnot_read_messages
          this.noData = this.currentData.length === 0
        }
      }
    }
  }
</script>

<style>

</style>
