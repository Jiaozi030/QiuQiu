<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<uni-segmented-control
			:current="current"
			:values="tabs"
			@clickItem="onClickItem"
			style-type="text"
		></uni-segmented-control>

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
					<text class="title">推荐内容</text>
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

export default {
	components: { uniSegmentedControl },
	data() {
		return {
			current: 0, // 当前选中的分页索引
			tabs: ['推荐', '附近', '关注'] // 分页标签
		}
	},
	onLoad() {

	},
	methods: {
		// 点击分页标签时触发
		onClickItem(e) {
			this.current = e.currentIndex;
		},
		// 滑动 swiper 时触发
		onSwiperChange(e) {
			this.current = e.detail.current;
		}
	}
}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		justify-content: flex-start; /* 确保顶部对齐 */
		align-items: center; /* 确保水平居中 */
		width: 100%; /* 确保父容器宽度占满 */
	}

	/* 调整 uni-segmented-control 的样式 */
	.uni-segmented-control {
		display: flex !important;
		justify-content: center !important;
		padding: 20rpx 0; /* 增加 padding */
		background-color: #f8f8f8; /* 修改 background-color */
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1); /* 增加 box-shadow */
		max-width: 100%; /* 增加 max-width */
		margin: 0 20rpx !important; /* 增加 margin */
		font-size: 36rpx !important;
		border-radius: 20rpx !important;
		border: 1rpx solid #eee !important;
		height: 100rpx !important;
		line-height: 100rpx !important;
		text-align: center !important;
		white-space: nowrap !important;
	}

	.uni-segmented-control-item {
		margin: 0 30rpx !important; /* 确保间距生效 */
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

	.uni-segmented-control {
		border-radius: 20rpx; /* 增加 border-radius */
		border: 1rpx solid #eee; /* 增加 border */
		height: 100rpx; /* 增加 height */
		line-height: 100rpx; /* 增加 line-height */
		text-align: center; /* 确保 text-align 为 center */
		white-space: nowrap; /* 确保 white-space 为 nowrap */
	}
</style>
