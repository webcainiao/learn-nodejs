import Vue from 'vue'
import Router from 'vue-router'

// 按需异步加载组件
const List = resolve => {
  require.ensure(['../views/list.vue'], () => {
    resolve(require('../views/list.vue'))
  })
}
const Topic = resolve => {
  require.ensure(['../views/topic.vue'], () => {
    resolve(require('../views/topic.vue'))
  })
}
const NewPost = resolve => {
  require.ensure(['../views/newPost.vue'], () => {
    resolve(require('../views/newPost.vue'))
  })
}
const Message = resolve => {
  require.ensure(['../views/message.vue'], () => {
    resolve(require('../views/message.vue'))
  })
}
const User = resolve => {
  require.ensure(['../views/user.vue'], () => {
    resolve(require('../views/user.vue'))
  })
}
const Login = resolve => {
  require.ensure(['../views/login.vue'], () => {
    resolve(require('../views/login.vue'))
  })
}
const About = resolve => {
  require.ensure(['../views/about.vue'], () => {
    resolve(require('../views/about.vue'))
  })
}
// Vue使用路由插件
Vue.use(Router)

const routes = [
  {
    path: '/',
    component: List,
    name: 'list'
  }, {
    path: '/topic/:id',
    component: Topic,
    name: 'topic'
  }, {
    path: '/add',
    component: NewPost,
    name: 'add',
    meta: {requiresAuth: true}
  }, {
    path: '/message',
    component: Message,
    name: 'message',
    meta: {requiresAuth: true}
  }, {
    path: '/user/:username',
    component: User,
    name: 'user'
  }, {
    path: '/login',
    component: Login,
    name: 'login'
  }, {
    path: '/about',
    component: About,
    name: 'about'
  }, {
    path: '*',
    component: List
  }
]

// 声明路由实例
const router = new Router({
  routes,
  mode: 'history'
})

// 设置全局钩子
router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user'))
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user && user.id) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 这里设置redirect，是为了进入消息，发布模块后，登录成功，在返回次模块
      })
    }
  } else {
    next()
  }
})

export default router
