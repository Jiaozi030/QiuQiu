<template>
	<view class="nearby-page">
		<view v-if="nearbyUsers.length === 0" class="loading">
			<text>加载中...</text>
		</view>
		<view v-else class="user-grid">
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
import { sampleUsersNearby } from '@/data/sampleUsersNearby.js';

export default {
	components: { UserCardNearby },
	data() {
		return {
			nearbyUsers: sampleUsersNearby
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
	mounted() {
		// console.log('Nearby Users:', this.nearbyUsers);
		// this.fetchUserData();
	}
}
</script>

<style>
.nearby-page {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.loading {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}

.user-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr); /* 每行显示两个卡片 */
	gap: 2px; /* 调整卡片之间的间距 */
	padding: 0; /* 移除内边距 */
	margin: 0; /* 移除外边距 */
}
</style> 