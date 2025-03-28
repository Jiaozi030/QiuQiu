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
        <image :src="message.avatar || '/static/default/logo.png'" class="avatar" />
        <view class="message-content">
          <text class="username">{{ message.username || '未知用户' }}</text>
          <text class="latest-message">{{ message.latestMessage || '暂无消息' }}</text>
        </view>
        <text class="message-time">{{ message.time || '' }}</text>
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
          userId: '67d16f8ae0ec19c842704b02' // 替换为实际用户 ID
        }
      });

      console.log('云函数返回的数据:', res); // 检查云函数返回的数据

      if (res.result.code === 200) {
        this.messages = res.result.data.map(chat => {
          // 防御性检查
          if (!chat || !chat.avatar || !chat.username || !chat.latestMessage || !chat.time) {
            console.error('无效的聊天记录:', chat);
            return null;
          }

          return {
            avatar: chat.avatar, // 从云函数返回的数据中获取头像
            username: chat.username, // 从云函数返回的数据中获取昵称
            latestMessage: chat.latestMessage, // 从云函数返回的数据中获取最新消息
            time: new Date(chat.time).toLocaleString() // 格式化时间
          };
        }).filter(item => item !== null); // 过滤掉无效的聊天记录

        console.log('处理后的消息列表:', this.messages); // 检查处理后的数据
      } else {
        console.error('云函数返回错误:', res.result.message);
      }
    } catch (error) {
      console.error('获取聊天列表失败:', error);
    }
  },
  methods: {
    navigateToChat(message) {
      if (!message.chatId) {
        console.error('chatId 未定义:', message);
        return; // 防止跳转到不存在的页面
      }

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
  gap: 10px; /* 消息框之间的间距 */
}

.message-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fff;
  position: relative; /* 为了定位时间 */
  min-height: 110px; /* 设置消息框的最小高度，确保统一 */
  box-sizing: border-box; /* 包括内边距在内计算高度 */
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow: hidden; /* 防止内容超出 */
}

.username {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  white-space: nowrap; /* 防止用户名换行 */
  overflow: hidden;
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

.latest-message {
  font-size: 14px;
  color: #666;
  white-space: nowrap; /* 防止消息内容换行 */
  overflow: hidden;
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

.message-time {
  position: absolute; /* 绝对定位时间 */
  bottom: 10px; /* 距离底部 */
  right: 15px; /* 距离右侧 */
  font-size: 12px; /* 时间字体较小 */
  color: #999; /* 时间颜色较浅 */
  white-space: nowrap; /* 防止时间换行 */
}
</style>