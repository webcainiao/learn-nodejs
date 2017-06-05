import types from '../types'

const state = {
  navMenuStatus: false
}
const getters = {}
const mutations = {
  [types.COM_NAV_STATUS] (state, status) {
    state.navMenuStatus = status
  }
}
const actions = {
  setNavStatus ({commit}, status) {
    commit(types.COM_NAV_STATUS, status)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
