import types from '../types'
import api from '../../fetch/api'

const state = {
  msgList: {}
}
const getters = {
  getMsgList: state => state.msgList
}
const mutations = {
  [types.GET_MSG_LIST] (state, data) {
    state.msgList = data
  }
}
const actions = {
  getMessagesData ({commit}, accesstoken) {
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
