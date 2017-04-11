import Vue from 'vue';
import router from './router/index';//引入路由配置
import VueRouter from 'vue-router';
import App from './app.vue';

Vue.config.debug = true;//开启错误提示
Vue.use(VueRouter);

const app = new Vue({
	el: '#abb',
	router: router,
	render: h=> h(App)
})