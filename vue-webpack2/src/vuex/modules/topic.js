import types from '../types'
import api from '../../fetch/api'

const state = {
  topic: {}
}
const getters = {
  getTopicDetail: state => state.topic
}
const mutations = {
  [types.GET_TOPICS_DETAIL] (state, param) {
    state.topic = param
  }
}
const actions = {
  getTopicDetail ({commit}, params) {
    api.GetTopicDetail(params.id).then(res => {
      commit(types.GET_TOPICS_DETAIL, res.data)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
