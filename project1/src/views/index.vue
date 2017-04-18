<template>
	<div class="homepage">
		<p v-bind:id="'list' + msg1">{{message}} </p>
		<input type="text" name="" v-model='msg'>
		<div v-once>{{msg1}}</div>
		<button v-bind:disabled='cans'>{{ok ?'yes' : 'no'}}</button>
		<a v-on:click.prevent href="http://baidu.com">baidu</a>
		<router-link to="/">go home</router-link>
		<router-link :to="{path: '/user/12'}">go user</router-link>
	</div>
</template>

<script >
	export default {
		data () {
			return {
				message: 'this is hage',
				msg: 'nih',
				msg1: 'aaabb',
				ok: true,
				cans: true
			}
		}
	}
</script>