<template>
	<view class="user-card">
		<image class="user-photo" :src="user.photo" />
		<view class="user-info">
			<view class="user-name">{{ user.name }}</view>
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
	}
}
</script>

<style>
.user-card {
	width: 100%;
	margin: 0;
	padding: 20px;
	background: #fff;
}
.user-photo {
	width: 100%;
	height: 300px;
	object-fit: cover;
}
.user-info {
	margin-top: 15px;
}
.user-name {
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 12px;
}
.tags-row {
	display: flex;
	flex-wrap: wrap;
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

<script>
export default {
	props: {
		user: {
			type: Object,
			required: true
		}
	}
}
</script>

<script>
export default {
	mounted() {
		console.log('User Card Data:', this.user);
	}
}
</script> 