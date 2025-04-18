<template>
	<view class="recommendation-page">
		<view v-if="users.length === 0" class="loading">
			<text>加载中...</text>
		</view>
		<view v-else class="user-list">
			<UserCard v-for="user in users" :key="user._id" :user="user" />
		</view>
	</view>
</template>

<script>
import UserCard from '@/components/UserCard.vue';

export default {
	components: { UserCard },
	data() {
		return {
			users: [], // 存储异性用户数据
		};
	},
	async mounted() {
		try {
			// 获取当前用户的性别
			const currentUserGender = await this.getCurrentUserGender();
			if (!currentUserGender) {
				uni.showToast({
					title: '获取用户性别失败',
					icon: 'none',
				});
				return;
			}

			// 获取异性用户数据
			await this.loadOppositeGenderUsers(currentUserGender);
		} catch (error) {
			console.error('初始化失败:', error);
		}
	},
	methods: {
		// 获取当前用户的性别
		async getCurrentUserGender() {
			try {
				const res = await uniCloud.callFunction({
					name: 'profile',
					data: {
						action: 'getProfileById',
						id: '67d16f8ae0ec19c842704b02', // 确保 _id 正确
					},
				});

				if (res.result.code === 200) {
					return res.result.data.gender; // 返回当前用户的性别
				} else {
					throw new Error('获取用户性别失败');
				}
			} catch (err) {
				console.error('获取用户性别失败:', err);
				throw err;
			}
		},
		// 获取异性用户数据
		async loadOppositeGenderUsers(currentUserGender) {
			try {
				const oppositeGender = currentUserGender === '男' ? '女' : '男'; // 确定异性性别
				const res = await uniCloud.callFunction({
					name: 'profile',
					data: {
						action: 'getProfilesByGender',
						gender: oppositeGender, // 传递异性性别
					},
					timeout: 10000, // 设置超时时间
				});

				if (res.result.code === 200) {
					this.users = res.result.data.map(user => ({
						_id: user._id, // 确保包含 _id 字段
						avatar: user.avatar,
						nickname: user.nickname,
						gender: user.gender,
						age: user.age,
						currentCity: user.currentCity,
						height: user.height,
						weight: user.weight,
						education: user.education,
						occupation: user.occupation,
					}));
				} else {
					throw new Error('获取用户数据失败');
				}
			} catch (err) {
				console.error('获取用户数据失败:', err);
				throw err;
			}
		},
	}
}
</script>

<style>
.recommendation-page {
	padding: 20px;
	background-color: #f8f9fa;
}

.user-list {
	display: flex;
	flex-direction: column; /* 垂直排列用户卡片 */
	gap: 20rpx; /* 卡片之间的间距 */
}

.loading {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	font-size: 16px;
	color: #666;
}
</style> 
