import axios from 'axios'

const Host = `https://cnodejs.org/api/v1`

const fetch = (url, method = 'GET') => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: Host + url
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default {
  /**
   * 验证用户登陆
   * @param {any} accesstoken
   * @returns
   */
  Login (accesstoken) {
    return fetch(`/accesstoken?accesstoken=${accesstoken}`, 'POST')
  },

  /**
   * 获取文章列表
   * @param {any} params
   * @returns
   */
  GetTopicsList (params) {
    return fetch(`/topics?${params}`)
  },

  /**
   * 获取文章详情
   * @param {any} id 参数id
   * @returns
   */
  GetTopicDetail (id) {
    return fetch(`/topic/${id}`)
  },

  /**
   * 获取用户信息
   * @param {any} name 用户名
   * @returns
   */
  GetUserInfo (username) {
    return fetch(`/user/${username}`)
  },

  /**
   * 获取已读和未读消息
   * @param {any} accesstoken
   * @returns
   */
  GetMessages (accesstoken) {
    return fetch(`/messages?mdrender=true&accesstoken=${accesstoken}`)
  },

  /**
   * 新建主题
   * @param {any} form
   * @returns
   */
  NewPost (form) {
    return fetch(`/topics?${form}`, 'POST')
  }
}
