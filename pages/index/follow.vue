<template>
  <view class="follow-page">
    <view v-if="users.length === 0" class="loading">
      <text>暂无关注用户</text>
    </view>
    <view v-else>
      <view v-for="(user, index) in users" :key="index" class="user-card-container">
        <UserCard :user="user" />
      </view>
    </view>
  </view>
</template>

<script>
import UserCard from '@/components/UserCard.vue';

export default {
  components: { UserCard },
  data() {
    return {
      users: [], // 存储关注的用户数据
    };
  },
  async onLoad() {
    // 获取当前用户关注的用户数据
    await this.loadFollowedUsers();
  },
  methods: {
    // 获取当前用户关注的用户数据
    async loadFollowedUsers() {
      try {
        const res = await uniCloud.callFunction({
          name: 'follow',
          data: {
            action: 'getFollowedUsers',
            userId: '67d16f8ae0ec19c842704b02', // 当前用户的 _id
          },
        });

        console.log('获取到的关注用户数据:', res.result.data); // 打印关注用户数据
        if (res.result.code === 200) {
          this.users = res.result.data;
        } else {
          uni.showToast({
            title: '获取关注用户数据失败',
            icon: 'none',
          });
        }
      } catch (err) {
        console.error('获取关注用户数据失败:', err);
        uni.showToast({
          title: '获取关注用户数据失败',
          icon: 'none',
        });
      }
    },
  },
  mounted() {
    // 监听关注状态更新
    uni.$on('followUpdated', this.loadFollowedUsers);
  },
  beforeDestroy() {
    // 移除监听
    uni.$off('followUpdated', this.loadFollowedUsers);
  },
};
</script>

<style>
.follow-page {
  padding: 20px;
  background-color: #f8f9fa;
}

.user-card-container {
  margin-bottom: 20px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: #666;
}
</style> 