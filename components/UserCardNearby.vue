<template>
	<view class="user-card-nearby">
		<image class="user-photo" :src="user.photo" />
		<view class="user-info">
			<view class="name-gender">
				<text class="name">{{ user.name }}</text>
				<text class="gender" :class="user.gender">{{ user.gender === 'male' ? '♂' : '♀' }}</text>
			</view>
			<text class="age">{{ user.age }}岁</text>
			<text class="distance">{{ user.distance }}km</text>
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
	mounted() {
		console.log('User Card Nearby Data:', this.user);
	}
}
</script>

<style>
.user-card-nearby {
	width: calc(50% - 5px);
	aspect-ratio: 4/3;
	margin-bottom: 10px;
	position: relative;
	border-radius: 8px;
	overflow: hidden;
	border: 1px solid red; /* 调试用 */
	background-color: #f0f0f0; /* 调试用 */
}
.user-photo {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.user-info {
	position: absolute;
	left: 10px;
	bottom: 10px;
	color: #fff;
	text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
.name-gender {
	display: flex;
	align-items: center;
}
.name {
	font-size: 16px;
	font-weight: bold;
}
.gender {
	margin-left: 5px;
	font-size: 14px;
}
.gender.male {
	color: #87CEEB;
}
.gender.female {
	color: #FFB6C1;
}
.age {
	display: block;
	font-size: 14px;
}
.distance {
	display: block;
	font-size: 12px;
}
</style> 