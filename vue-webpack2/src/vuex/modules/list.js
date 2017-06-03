import types from '../types'
import api from '../../fetch/api'

const state = {
  topicsList: [],
  scroll: true, //  每次加载新的主题列表前，为true,防止加载期间再次触发
  //  列表加载,每次只加载一页的内容
  searchKey: { // 设定每次请求的参数
    page: 0,
    limit: 20,
    tab: 'all'
  }
}
const getters = {
  getTopicslist: state => state.topicsList
}
const mutations = {
  [types.GET_PAGE_NUM] (state) {
    state.searchKey.page += 1
  },
  [types.GET_SCROLL_STATUS] (state, status) {
    state.scroll = status
  },
  [types.GET_TOPICS_LIST] (state, res) {
    if (state.searchKey.page <= 1) { // 初始加载的第一页数据
      state.topicsList = res.data
    } else { // 每加载一页，就和前面的数据数组拼接
      state.topicsList = state.topicsList.concat(res.data)
    }
  },
  [types.GET_SEARCH_KEY] (state, params) {
    state.searchKey = params
  }
}
const actions = {
  getTopicslist ({commit}, params) {
    if (state.scroll) {
      commit(types.GET_PAGE_NUM) //  每次只加载增加一页内容
      commit(types.GET_SCROLL_STATUS, false) // 每次触发加载后，完成前，设为false
      api.GetTopicsList(`page=${state.searchKey.page}&tab=${state.searchKey.tab}&limit=20`)
          .then(res => {
            commit(types.GET_SCROLL_STATUS, true)
            commit(types.GET_TOPICS_LIST, res)
          })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
