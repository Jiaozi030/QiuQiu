<template>
	<div class="user-card">
		<img class="user-photo" :src="user.photo" alt="用户照片">
		<div class="user-info">
			<div class="user-name">{{ user.name }}</div>
			<div class="tags-row">
				<div class="tag dark">{{ user.age }}岁</div>
				<div class="tag dark">{{ user.location }}</div>
				<div class="tag dark">{{ user.height }}cm</div>
				<div class="tag dark">{{ user.weight }}kg</div>
			</div>
			<div class="tags-row">
				<div class="tag">{{ user.education }}</div>
				<div class="tag">{{ user.industry }}</div>
			</div>
		</div>
	</div>
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