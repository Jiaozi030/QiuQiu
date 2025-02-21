<template>
	<view class="nearby-page">
		<view class="user-grid">
			<UserCardNearby 
				v-for="(user, index) in nearbyUsers" 
				:key="index" 
				:user="user" 
			/>
		</view>
	</view>
</template>

<script>
import UserCardNearby from '@/components/UserCardNearby.vue';

export default {
	components: { UserCardNearby },
	data() {
		return {
			nearbyUsers: [
				{
					photo: '/static/user1.jpg',
					name: '李四',
					age: 25,
					gender: 'female',
					distance: 1.5,
					location: '北京'
				},
				{
					photo: '/static/user2.jpg',
					name: '王五',
					age: 30,
					gender: 'male',
					distance: 2.3,
					location: '北京'
				},
				// 添加更多用户数据
			]
		}
	}
}
</script>

<style>
.nearby-page {
	padding: 10px;
}
.user-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
</style> 