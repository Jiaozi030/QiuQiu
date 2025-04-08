<template>
	<view class="nearby-page">
		<view v-if="loading" class="loading">
			<text>加载中...</text>
		</view>
		<view v-else-if="nearbyUsers.length === 0" class="loading">
			<text>暂无用户数据</text>
		</view>
		<view v-else class="user-grid">
			<UserCardNearby v-for="(user, index) in nearbyUsers" :key="index" :user="user" />
		</view>
	</view>
</template>

<script>
import UserCardNearby from '@/components/UserCardNearby.vue';

export default {
	components: { UserCardNearby },
	data() {
		return {
			nearbyUsers: [], // 初始化为空数组
			loading: true, // 加载状态
		};
	},
	methods: {
		async fetchUserDataByCity(city) {
			try {
				const res = await uniCloud.callFunction({
					name: 'profile',
					data: {
						action: 'getProfilesByCity',
						city: '杭州', // 替换为当前用户的城市
					},
					timeout: 10000,
				});
				console.log('云函数返回:', res.result);
				if (res.result && res.result.code === 200) {
					this.nearbyUsers = res.result.data; // 更新用户数据
				} else {
					console.error('获取用户数据失败:', res.result.message || '未知错误');
				}
			} catch (error) {
				console.error('云函数调用失败:', error);
			} finally {
				this.loading = false;
			}
		},
	},
	onShow() {
		// 每次页面显示时调用 fetchUserDataByCity 方法
		this.fetchUserDataByCity('杭州'); // 替换为实际的城市
	},
};
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
	grid-template-columns: repeat(2, 1fr);
	/* 每行显示两个卡片 */
	gap: 2px;
	/* 调整卡片之间的间距 */
	padding: 0;
	/* 移除内边距 */
	margin: 0;
	/* 移除外边距 */
}
</style>