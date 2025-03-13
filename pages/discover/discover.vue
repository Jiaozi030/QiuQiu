<template>
  <view class="discover-page">
    <!-- 帖子列表 -->
    <view class="post-list">
      <view v-for="(post, index) in posts" :key="index" class="post-item">
        <view class="post-header">
          <image :src="post.profile.avatar" class="avatar" />
          <view class="user-info">
            <text class="username">{{ post.profile.nickname }}</text>
            <text class="user-details">{{ post.profile.gender }}｜{{ post.profile.age }}岁｜{{ post.profile.currentCity }}</text>
          </view>
        </view>
        <view class="post-content">
          <text>{{ post.content }}</text>
          <view v-if="(post.images || []).length > 0" class="post-images">
            <image v-for="(image, i) in post.images" :key="i" :src="image" class="post-image" />
          </view>
        </view>
        <view class="post-footer">
          <text>{{ formatTime(post.createTime) }}</text>
        </view>
      </view>
    </view>

    <!-- 发布按钮 -->
    <view class="post-button" @click="navigateToPost">
      <text class="plus-icon">+</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      posts: [], // 存储帖子数据
    };
  },
  async onLoad() {
    // 获取帖子列表
    await this.loadPosts();
  },
  methods: {
    // 获取帖子列表
    async loadPosts() {
      try {
        const res = await uniCloud.callFunction({
          name: 'post',
          data: {
            action: 'getPosts',
          },
        });

        if (res.result.code === 200) {
          // 获取所有帖子的用户信息
          const userIds = res.result.data.map(post => post.userId);
          const profileRes = await uniCloud.callFunction({
            name: 'profile',
            data: {
              action: 'getProfilesByIds',
              userIds,
            },
          });

          if (profileRes.result.code === 200) {
            const profiles = profileRes.result.data;
            this.posts = res.result.data.map(post => ({
              ...post,
              images: post.images || [], // 确保 images 是数组
              profile: profiles.find(profile => profile._id === post.userId) || {}, // 关联用户信息
            }));
          } else {
            uni.showToast({
              title: '获取用户信息失败',
              icon: 'none',
            });
          }
        } else {
          uni.showToast({
            title: '获取帖子失败',
            icon: 'none',
          });
        }
      } catch (err) {
        console.error('获取帖子失败:', err);
        uni.showToast({
          title: '获取帖子失败',
          icon: 'none',
        });
      }
    },
    // 跳转到发帖页面
    navigateToPost() {
      uni.navigateTo({
        url: '/pages/discover/post', // 发帖页面的路径
      });
    },
    // 格式化时间
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
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

.post-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.post-image {
  width: 100%;
  height: 300px;
  border-radius: 8px;
  object-fit: cover;
  margin-bottom: 10px;
}

.post-footer {
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