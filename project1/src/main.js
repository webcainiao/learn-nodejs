import Vue from 'vue';
import router from './router/index';//引入路由配置
import App from './app.vue';
Vue.config.debug = true;//开启错误提示

//创建vue实例，并挂载到'#abb'html元素上，添加路由设置，并
const app = new Vue({
	el: '#abb',
	router: router,
	render: h=> h(App)
})