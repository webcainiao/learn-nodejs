<template>
	<div class="homepage">
		<p>this is home page </p>
		<router-link to="/">go home</router-link>
		<router-link :to="{path: '/user/12'}">go user</router-link>
	</div>
</template>