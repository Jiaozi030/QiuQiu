<template>
  <view class="discover-page">
    <!-- 动态帖子列表 -->
    <view class="post-list">
      <view v-for="(post, index) in posts" :key="index" class="post-item">
        <view class="post-header">
          <image :src="post.avatar" class="avatar" />
          <view class="user-info">
            <text class="username">{{ post.username }}</text>
            <text class="user-details">{{ post.gender }}｜{{ post.age }}岁｜{{ post.city }}</text>
          </view>
        </view>
        <text class="post-content">{{ post.content }}</text>
        <image v-if="post.image" :src="post.image" class="post-image" />
        <text class="post-time">{{ post.time }}</text>
      </view>
    </view>

    <!-- 发布按钮 -->
    <view class="post-button" @click="navigateToPost">
      <text class="plus-icon">+</text>
    </view>
  </view>
</template>

<script>
import { samplePosts } from '@/data/samplePosts.js'; // 引入模拟帖子数据

export default {
  data() {
    return {
      title: '发现',
      posts: samplePosts, // 使用模拟帖子数据
    };
  },
  methods: {
    // 跳转到发布帖子页面
    navigateToPost() {
      uni.navigateTo({
        url: '/pages/discover/post', // 发布帖子页面的路径
      });
    },
  },
};
</script>

<style>
.discover-page {
  padding: 20px;
  position: relative;
  height: 100vh;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
}

.post-header {
  display: flex;
  align-items: flex-start; /* 头像和用户信息顶部对齐 */
  gap: 10px;
  margin-bottom: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 16px;
  font-weight: bold;
}

.user-details {
  font-size: 12px;
  color: #999; /* 灰色字体 */
  margin-top: 2px; /* 与用户名保持一定间距 */
}

.post-content {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
}

.post-image {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  object-fit: cover;
  /* object-fit: contain;  */
  margin-bottom: 10px;
}

.post-time {
  font-size: 12px;
  color: #999;
}

.post-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  background-color: #5cb6e0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.post-button .icon {
  font-size: 24px; 
  color: #fff; 
  line-height: 1; /* 确保图标垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.plus-icon {
  font-size: 24px;
  color: #fff;
}
</style> 