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
      // 通过mapState和mapGetters获取的表示message状态的计算属性msgList,只能在html结构中直接使用才有数据，或者msgList通过mounted钩子，直接调用api方法才可取到msgList的值.如果是通过当前组件的钩子发送‘getMessagesData’的actions，来获取状态中存储的msgList,则msgList取不到相关数据，不能给当前组件的currentData赋值.如果在入口文件main.js中加入判断登录状态来发送'getMessagesData'的actions,则msgList状态可以获取到数据，但是在mounted钩子中this.msgList还是没有数据，导致进入message路由后，页面没有数据来驱动，但是刷新页面后可以获取到数据。所以最后，直接在mounted钩子中，使用api来获取数据。
      ...mapGetters({
        getUserInfo: 'getUserInfo' // 但是这个状态却可以取到，并且在mounted钩子中正常使用
      })
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
