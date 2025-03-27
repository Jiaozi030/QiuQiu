<template>
  <view class="message-page">
    <!-- 按钮区域 -->
    <view class="button-group">
      <view class="button-item" @click="navigateToFollowers">
        <image src="/static/default/red-heart.jpg" class="button-icon" />
        <text class="button-text">谁关注我</text>
      </view>
      <view class="button-item" @click="navigateToViewers">
        <image src="/static/default/white-heart.jpg" class="button-icon" />
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
      messages: []
    };
  },
  async created() {
    try {
      const res = await uniCloud.callFunction({
        name: 'chat',
        data: {
          userId: '当前用户ID' // 替换为实际用户 ID
        }
      });

      if (res.result.code === 200) {
        this.messages = res.result.data.map(chat => ({
          avatar: '/static/default/logo.png', // 默认头像
          username: `用户 ${chat.userIds.join(', ')}`, // 示例用户名
          latestMessage: '最新消息内容', // 可通过额外查询获取
          time: chat.createdAt
        }));
      } else {
        console.error(res.result.message);
      }
    } catch (error) {
      console.error('获取聊天列表失败:', error);
    }
  },
  methods: {
    navigateToChat(message) {
      uni.navigateTo({
        url: `/pages/chat/chat?chatId=${message.chatId}`
      });
    }
  }
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
  border: 1px solid rgb(233, 231, 169); /* 可选：添加边框 */
  border-radius: 8px; /* 可选：圆角 */
  background-color: 0; /* 可选：背景色 */
}

.button-icon {
  width: 50px; /* 图标大小 */
  height: 50px;
  margin-bottom: 2px;
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