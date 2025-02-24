<template>
	<view class="recommendation-page">
		<view v-if="userList.length === 0" class="loading">
			<text>加载中...</text>
		</view>
		<view v-else>
			<UserCard 
				v-for="(user, index) in userList" 
				:key="index" 
				:user="user" 
			/>
		</view>
	</view>
</template>

<script>
import UserCard from '@/components/UserCard.vue';
import { sampleUsers } from '@/data/sampleUsers.js';

export default {
	components: { UserCard },
	data() {
		return {
			userList: sampleUsers
		}
	},
	methods: {
		fetchUserData() {
			// 预留后端接口调用
			// uni.request({
			//   url: '/api/recommendation',
			//   success: (res) => {
			//     this.currentUser = res.data;
			//   }
			// });
		}
	},
	// mounted() {
	// 	console.log('Sample Users:', sampleUsers);
	// 	console.log('User List:', this.userList);
	// }
	onLoad() {
		console.log('User List:', this.userList);
	}
}
</script>

<style>
.recommendation-page {
	padding: 20px;
}
.loading {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
</style> 