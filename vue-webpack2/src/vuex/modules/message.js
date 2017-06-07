import types from '../types'

const state = {
  msgList: {}
}
const getters = {}
const mutations = {
  [types.GET_MSG_LIST] (state, data) {
    state.msgList = data
  }
}
const actions = {
  getMessagesData ({commit, rootState}) {
    let accesstoken = rootState.user.userInfo.accesstoken
    api.GetMessages(accesstoken).then(res => {
      commit(types.GET_MSG_LIST, res.data)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
