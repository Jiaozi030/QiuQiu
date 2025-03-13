<template>
	<view class="user-card" @click="navigateToProfile">
		<image :src="user.avatar || user.photo" class="avatar" />
		<view class="info">
			<text class="name">{{ user.nickname || user.name }}</text>
			<text class="details">{{ user.gender }} | {{ user.age }}岁 | {{ user.currentCity || user.location }}</text>
			<text class="details">职业: {{ user.occupation || user.industry }}</text>
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
	align-items: center;
	background-color: #fff;
	padding: 15px;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	cursor: pointer;
}

.avatar {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	margin-right: 15px;
}

.info {
	flex: 1;
}

.name {
	font-size: 16px;
	font-weight: bold;
	color: #333;
	margin-bottom: 4px;
}

.details {
	font-size: 14px;
	color: #666;
	margin-bottom: 4px;
	display: block;
}
</style>
