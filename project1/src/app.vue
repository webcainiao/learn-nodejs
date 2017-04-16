<template> <!-- template中必须设置一个包含元素，所有内容都在里面书写 -->
	<div id="app">
		<!-- <div>hello , 121asdff33  serwerdfsdvcvfdfgsdffgsdfgasdfsdffffffffffff</div> -->
		<!-- <img src="./assets/logo.png" alt="logo"> -->
		<!-- <router-link to="/">go home</router-link>
		<router-link :to="{path: '/user/12'}">go user</router-link> -->
		<router-view></router-view>	
	</div>
</template>

<style lang='scss'>
	body {
		color: red;
	}
	#abc {
		font-size: 12px;
	}
</style>

<script>
	console.log(process.env.NODE_ENV)
</script>