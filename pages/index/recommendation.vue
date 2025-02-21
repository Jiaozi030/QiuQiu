<template>
	<view class="recommendation-page">
		<UserCard :user="currentUser" />
	</view>
</template>

<script>
import UserCard from '@/components/UserCard.vue';

export default {
	components: { UserCard },
	data() {
		return {
			currentUser: {
				photo: '/static/logo.png',
				name: '张三',
				age: 28,
				location: '北京',
				height: 178,
				weight: 70,
				education: '本科',
				industry: '互联网'
			}
		}
	}
}
</script>

<style>
.recommendation-page {
	padding: 20px;
}
</style> 