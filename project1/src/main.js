import Vue from 'vue';
import router from './router/index';
import VueRouter from 'vue-router';
import App from './app.vue';

Vue.config.debug = true;
Vue.use(VueRouter);

const app = new Vue({
	el: '#abb',
	router: router,
	render: h=> h(App)
})