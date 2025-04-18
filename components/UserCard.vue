<template>
	<view class="user-card" @click="navigateToProfile">
		<image :src="user.avatar || user.photo" class="avatar" />
		<view class="info">
			<text class="name">{{ user.nickname || user.name }}</text>
			<text class="details">
				<text :class="user.gender === '男' ? 'male-symbol' : 'female-symbol'">
					{{ user.gender === '男' ? '♂' : '♀' }}
				</text> | {{ user.age }}岁 | {{ user.currentCity }}</text>
			<text class="details">职业: {{ user.occupation }}</text>
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
	padding: 15px;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	cursor: pointer;
}

.avatar {
	width: 500rpx;
	height: 500rpx;
	border-radius: 10rpx;
	margin-bottom: 10rpx;
}

.info {
	flex: 1;
}

.name {
	font-size: 20px;
	font-weight: bold;
	color: #333;
	margin-bottom: 4px;
}

.details {
	font-size: 18px;
	color: #666;
	margin-bottom: 4px;
	display: block;
}

.male-symbol {
	color: #5bb8eb;
	/* 蓝色 */
	font-weight: bold;
	margin-right: 5rpx;
	/* 符号和文字之间的间距 */
}

.female-symbol {
	color: #f19ec2;
	/* 粉色 */
	font-weight: bold;
	margin-right: 5rpx;
	/* 符号和文字之间的间距 */
}
</style>
