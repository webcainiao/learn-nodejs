//使用组建模式，引入vue,vue-router,然后调用vue.use(vue-router)
import Vue from 'vue';
import VueRouter from 'vue-router';
//引入路由组件
import Index from  '../views/index/index';
import User from '../views/user/user';
// import NotFound from '../views/notfound';
const NotFound = function(r){
	return require.ensure([],function(){
			return r(require('../views/notfound.vue'));
		},'NotFoundChunk')
};

//调用
Vue.use(VueRouter);

//定义路由,每个路由映射一个组件
const routes = [
	{
		component: Index,
		path: '/'
	},
	{
		component: User,
		path: '/user/:id'
	},
	{
		component: NotFound,
		path: '*'
	}
]

//导出路由实例，传入routes。此路由实例可在入口文件里作为配置参数添加在vue实例中，并在vue实例上挂载根元素
export default new VueRouter({
	mode: 'history',
	routes:routes,//可简写routes
})