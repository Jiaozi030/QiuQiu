<template>
	<view class="recommendation-page">
		<view v-if="users.length === 0" class="loading">
			<text>加载中...</text>
		</view>
		<view v-else>
			<view v-for="(user, index) in users" :key="index" class="user-card-container">
				<UserCard :user="user" />
			</view>
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
		console.log('mounted 执行'); // 打印日志，检查 mounted 是否执行
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

				// console.log('当前用户数据:', res.result.data); // 打印当前用户数据
				if (res.result.code === 200) {
					return res.result.data.gender; // 返回当前用户的性别
				} else {
					return null;
				}
			} catch (err) {
				console.error('获取用户性别失败:', err);
				return null;
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

				// console.log('异性用户数据:', res.result.data); // 打印异性用户数据
				if (res.result.code === 200) {
					this.users = res.result.data.map(user => ({
						_id: user._id, // 确保包含 _id 字段
						photo: user.avatar,
						name: user.nickname,
						gender: user.gender,
						age: user.age,
						location: user.currentCity,
						height: user.height,
						weight: user.weight,
						education: user.education,
						industry: user.occupation,
					}));
				} else {
					uni.showToast({
						title: '获取用户数据失败',
						icon: 'none',
					});
				}
			} catch (err) {
				console.error('获取用户数据失败:', err);
				uni.showToast({
					title: '获取用户数据失败',
					icon: 'none',
				});
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

.user-card-container {
	margin-bottom: 20px;
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
