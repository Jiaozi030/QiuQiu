<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="header">
			<uni-segmented-control
				:current="current"
				:values="tabs"
				@clickItem="onClickItem"
				style-type="text"
				active-color="#ff6b81"
				class="nav-control"
			></uni-segmented-control>
			<image 
				class="filter-btn" 
				src="/static/filter-btn.jpg" 
				@click="onFilterClick"
			/>
		</view>

		<!-- 内容区域 -->
		<swiper
			class="swiper"
			:current="current"
			@change="onSwiperChange"
			:duration="300"
			:interval="3000"
		>
			<swiper-item>
				<view class="content">
					<UserCard :user="currentUser" />
				</view>
			</swiper-item>
			<swiper-item>
				<view class="content">
					<text class="title">附近内容</text>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="content">
					<text class="title">关注内容</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import uniSegmentedControl from '@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue';
import UserCard from '@/components/UserCard.vue';

export default {
	components: { uniSegmentedControl, UserCard },
	data() {
		return {
			current: 0, // 当前选中的分页索引
			tabs: ['推荐', '附近', '关注'], // 分页标签
			currentUser: {
				photo: '/static/logo.png',
				name: '张三',
				age: 28,
				location: '北京',
				height: 178,
				weight: 70,
				education: '本科',
				industry: '互联网'
			}
		}
	},
	onLoad() {

	},
	methods: {
		onClickItem(e) {
			this.current = e.currentIndex;
		},
		onSwiperChange(e) {
			this.current = e.detail.current;
		},
		onFilterClick() {
			uni.navigateTo({
				url: '/pages/index/filter'
			});
		}
	}
}
</script>

<style>
	.container {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100vh; /* 确保容器高度占满整个视口 */
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 15px;
	}

	.nav-control {
		flex: 1;
		margin-right: 15px; /* 为筛选按钮留出空间 */
	}

	.filter-btn {
		width: 24px;
		height: 24px;
		cursor: pointer;
	}

	/* 调整 uni-segmented-control 的样式 */
	.uni-segmented-control {
		display: flex;
		justify-content: center;
		padding: 10rpx 0;
		background-color: #fff;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
		max-width: 80%;
		margin: 0 auto;
		font-size: 28rpx;
	}

	.uni-segmented-control-item {
		margin: 0 10rpx; /* 调整分页标签之间的间距 */
	}

	/* 调整 swiper 的样式 */
	.swiper {
		flex: 1; /* 确保 swiper 占满剩余空间 */
	}

	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%; /* 确保内容区域占满 swiper-item */
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
