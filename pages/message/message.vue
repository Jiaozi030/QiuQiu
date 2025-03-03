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

    <!-- 消息列表 -->
    <view class="message-list">
      <view
        v-for="(message, index) in messages"
        :key="index"
        class="message-item"
        @click="navigateToChat(message)"
      >
        <image :src="message.avatar" class="avatar" />
        <view class="message-content">
          <text class="username">{{ message.username }}</text>
          <text class="latest-message">{{ message.latestMessage }}</text>
        </view>
        <text class="message-time">{{ message.time }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { sampleMessages } from '@/data/sampleMessages.js';

export default {
  data() {
		return {
			messages: sampleMessages
		};
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
    // 跳转到聊天界面
    navigateToChat(message) {
      uni.navigateTo({
        url: `/pages/message/chat?userId=${message.userId}&username=${encodeURIComponent(message.username)}&avatar=${encodeURIComponent(message.avatar)}`,
      });
    },
  //   async fetchMessages() {
  //     const res = await uni.request({
  //       url: '/api/messages', // 替换为实际接口
  //       method: 'GET',
  //     });
  //     this.messages = res.data;
  //   },
  },
  // mounted() {
  //   this.fetchMessages();
  // }
};
</script>

<style>
.message-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
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
  justify-content: space-around;
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
.message-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fff;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.username {
  font-size: 16px;
  font-weight: bold;
}

.latest-message {
  font-size: 14px;
  color: #666;
}

.message-time {
  font-size: 12px;
  color: #999;
}
</style> 