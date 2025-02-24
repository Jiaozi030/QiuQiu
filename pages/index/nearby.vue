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
		console.log('Nearby Users:', this.nearbyUsers);
	}
}
</script>

<style>
.nearby-page {
	padding: 20px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	border: 1px solid red; /* 调试用 */
	background-color: #f0f0f0; /* 调试用 */
}

.loading {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
</style> 