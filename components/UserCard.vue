<template>
	<view class="user-card" @click="navigateToProfile">
		<image :src="user.avatar" class="avatar" />
		<view class="user-info">
			<view class="user-name">
				{{ user.nickname }} 
				<text :class="user.gender === '男' ? 'male-symbol' : 'female-symbol'">
					{{ user.gender === '男' ? '♂' : '♀' }}
				</text></view>
			<view class="tags-row">
				<view class="tag dark">{{ user.age }}岁</view>
				<view class="tag dark">{{ user.currentCity }}</view>
				<view class="tag dark">{{ user.height }}cm</view>
				<view class="tag dark">{{ user.weight }}kg</view>
			</view>
			<view class="tags-row">
				<view class="tag">{{ user.education }}</view>
				<view class="tag">{{ user.occupation }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		user: {
			type: Object,
			required: true
		}
	},
	methods: {
		navigateToProfile() {
			uni.navigateTo({
				url: `/pages/profile/se_profile?id=${this.user._id}`,
			});
		}
	}
}
</script>

<style>
.user-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #fff;
	padding: 20rpx;
	border-radius: 10rpx;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	cursor: pointer;
}

.avatar {
	width: 500rpx;
	height: 500rpx;
	border-radius: 10rpx;
	margin-bottom: 20rpx;
}

.user-info {
	width: 100%;
	text-align: center;
}

.user-name {
	font-size: 32rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10rpx;
}
.male-symbol {
	color: #3ad3ee;
	font-weight: bold;
}

.female-symbol {
	color: #ed7e9a;
	font-weight: bold;
}
.tags-row {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 10rpx;
	margin-bottom: 20rpx;
}

.tag {
	padding: 10rpx 20rpx;
	background-color: #f0f0f0;
	border-radius: 15rpx;
	font-size: 24rpx;
	color: #333;
}

.tag.dark {
	background-color: #333;
	color: #fff;
}
</style>