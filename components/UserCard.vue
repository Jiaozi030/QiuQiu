<template>
	<view class="user-card">
		<image :src="user.photo" class="avatar" />
		<view class="info">
			<text class="name">{{ user.name }}</text>
			<text class="details">{{ user.gender }} | {{ user.age }}岁 | {{ user.location }}</text>
			<text class="details">{{ user.height }}cm | {{ user.weight }}kg | {{ user.education }}</text>
			<text class="details">职业: {{ user.industry }}</text>
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
				url: '/pages/profile/se_profile',
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
