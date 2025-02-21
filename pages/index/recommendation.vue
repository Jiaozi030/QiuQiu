<template>
	<view class="recommendation-page">
		<UserCard :user="currentUser" />
	</view>
</template>

<script>
import UserCard from '@/components/UserCard.vue';
import { sampleUser } from '@/data/sampleUsers.js';

export default {
	components: { UserCard },
	data() {
		return {
			currentUser: sampleUser
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
	onLoad() {
		// this.fetchUserData(); // 后期启用
	}
}
</script>

<style>
.recommendation-page {
	padding: 20px;
}
</style> 