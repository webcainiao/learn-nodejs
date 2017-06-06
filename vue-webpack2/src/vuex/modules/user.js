import types from '../types'

const state = {
  loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
  userInfo: JSON.parse(localStorage.getItem('user')) || {}
}
const getters = {}
const mutations = {
  [types.SET_USER_INFO] (state, res) {
    state.userInfo = res
  },
  [types.SET_LOGIN_STATUS] (state, status) {
    state.loginStatus = status
  }
}
const actions = {
  setUserInfo ({commit}, res) {
    // 浏览器存储用户信息，保存json字符串信息
    localStorage.setItem(user, JSON.stringify(res)) // 将res解析为json字符串
    localStorage.setItem(loginStatus, true) // loginStatus: 'true'字符串
    // 将用户信息存入状态管理中，供其他路由组件使用
    commit(types.SET_USER_INFO, res)
    commit(types.SET_LOGIN_STATUS, true)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
