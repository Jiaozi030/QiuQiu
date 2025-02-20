<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="top-bar">
			<!-- 分段器 -->
			<view class="segmented-control-container">
				<uni-segmented-control
					:current="current"
					:values="tabs"
					@clickItem="onClickItem"
					style-type="text"
				></uni-segmented-control>
			</view>
			<!-- 筛选按钮 -->
			<view class="filter-button" @click="onFilterClick">
				<text>筛选</text>
			</view>
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
		},
		// 点击筛选按钮时触发
		onFilterClick() {
			uni.showToast({
				title: '筛选功能待实现',
				icon: 'none'
			});
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

	/* 顶部导航栏布局 */
	.top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between; /* 使分段器和筛选按钮均匀分布 */
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
	}

	/* 分段器容器样式 */
	.segmented-control-container {
		flex: 1;  /*占据剩余空间 */
		/* display: flex; */
		/*justify-content: center;  使分段器居中 */
        /*text-align: center;  使内容居中 */
	}


	/* 筛选按钮样式 */
	.filter-button {
		padding: 10rpx 20rpx;
		background-color: #f8f8f8;
		border-radius: 20rpx;
		border: 1rpx solid #eee;
		font-size: 28rpx;
		color: #333;
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
