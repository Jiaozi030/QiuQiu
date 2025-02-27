<template>
  <view class="message-page">
    <!-- 按钮区域 -->
    <view class="button-group">
      <view class="button-item" @click="navigateToFollowers">
        <image src="/static/red-heart.jpg" class="button-icon" />
        <text class="button-text">谁关注我</text>
      </view>
      <view class="button-item" @click="navigateToViewers">
        <image src="/static/white-heart.jpg" class="button-icon" />
        <text class="button-text">谁看过我</text>
      </view>
    </view>

    <!-- 消息内容 -->
    <view class="content">
      <text class="title">消息</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '消息'
    }
  },
  methods: {
    // 跳转到"谁关注我"页面
    navigateToFollowers() {
      uni.navigateTo({
        url: '/pages/message/followers', // 跳转路径
      });
    },
    // 跳转到"谁看过我"页面
    navigateToViewers() {
      uni.navigateTo({
        url: '/pages/message/viewers', // 跳转路径
      });
    },
  }
}
</script>

<style>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.button-group {
  display: flex;
  justify-content: space-around; /* 按钮均匀分布 */
  margin-bottom: 20px;
}

.button-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 80%; /* 设置按钮宽度 */
  padding: 1px;
  border: 3px solid rgb(233, 231, 169); /* 可选：添加边框 */
  border-radius: 8px; /* 可选：圆角 */
  background-color: 0; /* 可选：背景色 */
}

.button-icon {
  width: 50px; /* 图标大小 */
  height: 50px;
  margin-bottom: 5px;
}

.button-text {
  font-size: 14px;
  color: #333;
}
</style> 