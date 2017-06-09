<template>
  <div class="publish">
    <div class="title">
      <label>标题</label>
      <input type="text" placeholder="请输入标题..." v-model="topic.title">
    </div>
    <div class="select">
      <label>分类</label>
      <select v-model="topic.tab">
        <option value="share">分享</option>
        <option value="ask">问答</option>
        <option value="job">招聘</option>
        <option value="dev">客户端测试</option>
      </select>
    </div>
    <div class="content">
      <label>内容</label>
      <textarea v-model="topic.content" placeholder="回复支持Markdown语法,请注意标记代码"></textarea>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import api from '../fetch/api'
  export default {
    data () {
      return {
        topic: {
          title: '',
          tab: 'ask',
          content: '',
          err: ''
        }
      }
    },
    computed: {
      ...mapState({
        accesstoken: state => state.user.userInfo.accesstoken
      })
    },
    methods: {
      publish () {
        if (!this.topic.title) {
          this.err = 'title'
          return
        }
        if (!this.topic.content) {
          this.err = 'content'
          return
        }
        let params = `accesstoken=${this.accesstoken}&title=${this.title}&tab=${this.tab}&content=${this.content}`
        api.Post(params).then(res => {
          if (res.success) {
            this.$router.push({path: `/topic/${res.topic_id}`})
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .publish {
    .content {
      textarea {
        width: 100%;
        min-height: 400px;
      }
    }
  }
</style>
