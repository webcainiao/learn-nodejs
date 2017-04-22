<template>
	<div class="homepage">
		<p v-bind:id="'list' + msg1">{{message}}  {{reverseMsg}}</p>
		<input type="text" name="" v-model='msg'>
		<div v-once>{{msg1}}</div>
		<button v-bind:disabled='cans'>{{ok ?'yes' : 'no'}}</button>
		<a v-on:click.prevent href="http://baidu.com">baidu</a>
		<router-link to="/">go home</router-link>
		<router-link :to="{path: '/user/12'}">go user</router-link>
		<!-- <TodoItem></TodoItem> -->
		<input placeholder="add todo" v-model="newTodoText" v-on:keyup.enter="addTodos">
		<li is='TodoItem' v-bind:title='item' v-for='(item,index) in todos' v-on:remove='todos.splice(index,1)'></li>
		<button v-on:click="counter += 1">add 1</button>
		<span>按钮被点击了{{counter}}此</span>
		<span>multiline is :</span>
		<p sytle="white-space:pre">{{msg2}}</p>
		<textarea v-model="msg2" placeholder="insert context"></textarea>
		<input type="checkbox" id="box" v-model="checked">
		<label for="box">{{checked}}</label>
		<input type="checkbox" id="jack" value="JJack" v-model="checkArray">
		<label for="jack">Jack</label>
		<input type="checkbox" id="tom" value="TTom" v-model="checkArray">
		<label for="tom">tom</label>
		<input type="checkbox" id="jerry" value="JJerry" v-model="checkArray">
		<label for="jerry">jerry</label>
		<span>{{checkArray}}</span>
		<input type="radio" id="one" value="One" v-model="picked">
		<label for="one">One</label>
		<input type="radio" id="two" value="Two" v-model="picked">
		<label for="two">Two</label>
		<span>{{picked}}</span>
		<select  v-model="selected">
			<option >a</option>
			<option >b</option>
			<option >c</option>
		</select>
		<label>{{selected}}</label>
		<select  v-model="selected1" multiple>
			<option >a</option>
			<option >b</option>
			<option >c</option>
		</select>
		<label>{{selected1}}</label>
		<select  v-model="selected2">
			<option v-for="item in items" :value="item.value">{{item.text}}</option>
		</select>
		<label>{{selected2}}</label>
		<input type="checkbox" v-model="toggle" v-bind:true-value="a" v-bind:false-value="b" ><label>{{toggle}}</label>
		<input type="number" v-model.number="age">
		<input v-model.trim="msg3">
		<input type="" v-model.lazy="msg4"><span>{{msg4}}</span>
	</div>
</template>

<script >
	import TodoItem from './todo-item';
	export default {
		components: {TodoItem},
		data () {
			return {
				selected: '',
				selected1: [],
				picked: '',
				checkArray: [],
				checked:false,
				counter: 0,
				message: 'this is hage',
				msg: 'nih',
				msg1: 'aaabb',
				msg2: '',
				msg3: '     sdfdsf   ',
				msg4: 'asdfsdf',
				ok: true,
				cans: true,
				newTodoText: '',
				todos: [
					'javascript',
					'css',
					'nodejs'
				],
				items: [
					{value:'A',text: 'One'},
					{value:'B',text: 'Two'},
					{value:'D',text: 'Three'},
				],
				selected2:'dd',
				toggle: 'nonchecked',
				a: 'checked',
				b: 'nonchecked',
				age:''
			}
		},
		computed: {//定义计算属性
			reverseMsg: function(){//reverseMsg可被vue实例调用,不加括号，相当于属性
				return this.message.split('').reverse().join('')
			}
		},
		methods: {
			addTodos: function(){
				this.todos.push(this.newTodoText);
				this.newTodoText = ''
			}
		}
	}
</script>