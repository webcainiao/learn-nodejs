import Vue from 'vue'
import Vuex from 'vuex'

// 引入不同状态模块
import com from './modules/com'
import list from './modules/list'
import topics from './modules/topics'
import newPost from './modules/newPost'
import message from './modules/message'
import user from './modules/user'

// Vue启用Vuex插件
Vue.use(Vuex)

export default new Vuex.store({
  modules: {
    com,
    list,
    topics,
    newPost,
    message,
    user,
  },
  strict: process.env.NODE_ENV !== 'production'
})
