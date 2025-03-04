<template>
	<view class="user-card" @click="navigateToProfile">
		<image class="user-photo" :src="user.photo" />
		<view class="user-info">
			<view class="name-gender">
				<text class="name">{{ user.name }}</text>
				<text class="gender" :class="user.gender">{{ user.gender === 'male' ? '♂' : '♀' }}</text>
			</view>
			<view class="tags-row">
				<view class="tag dark">{{ user.age }}岁</view>
				<view class="tag dark">{{ user.location }}</view>
				<view class="tag dark">{{ user.height }}cm</view>
				<view class="tag dark">{{ user.weight }}kg</view>
			</view>
			<view class="tags-row">
				<view class="tag">{{ user.education }}</view>
				<view class="tag">{{ user.industry }}</view>
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
				url: '/pages/profile/se_profile',
			});
		}
	}
}
</script>

<style>
.user-card {
	width: 100%;
	margin: 0;
	/* padding: 20px; */
	background: #fff;
}
.user-photo {
	width: 100%;
	height: 300px;
	object-fit: cover;
}
.user-info {
	margin-top: 15px;
	color: #333;
}
.name-gender {
	display: flex;
	align-items: center;
	margin-left: 30px;
	margin-bottom: 10px;
}
.name {
	font-size: 20px;
	font-weight: bold;
}
.gender {
	margin-left: 5px;
	font-size: 18px;
}
.gender.male {
	color: #87CEEB;
}
.gender.female {
	color: #FFB6C1;
}
.tags-row {
	display: flex;
	flex-wrap: wrap;
	padding-left: 20px;
	gap: 8px;
	margin-bottom: 12px;
}
.tag {
	padding: 6px 12px;
	background-color: #f0f0f0;
	border-radius: 15px;
	font-size: 14px;
	color: #333;
}
.tag.dark {
	background-color: #333;
	color: #fff;
}
</style>
