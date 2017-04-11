import VueRouter from 'vue-router';
import Index from  '../views/index/index';
import User from '../views/user/user';

const routes = [
	{
		component: Index,
		path: '/'
	},
	{
		component: User,
		path: '/user'
	}
]

export default new VueRouter({
	modle: 'history',
	routes:routes
})