<template>
    <view class="main-page">
      <text>欢迎来到 Main 页面！</text>
    </view>
  </template>
  
  <script>
  export default {
    async onLoad() {
      uni.setStorageSync('userId', "67d16f8ae0ec19c842704b02"); // 示例：设置用户 ID
      // 假设你已经获取当前用户 id（可从 storage、vuex 或登录信息中拿到）
      let userId = uni.getStorageSync('userId') || ''; // 示例：从本地获取用户 ID
      // let userId = "67d16fa58a5c78c37fceb383";
      if (!userId) {
        uni.showToast({ title: '未登录', icon: 'none' });
        return;
      }
  
      try {
        const res = await uniCloud.callFunction({
          name: 'profile', // 你的云函数名
          data: {
            action: 'getAvatarById',
            id: userId
          }
        });
  
        if (res.result.code === 200) {
          const avatarUrl = res.result.data.avatarUrl;
          
          // ✅ 根据是否有头像跳转
          if (avatarUrl) {
            // 已设置头像 → 跳转 background.vue
            uni.setStorageSync('avatarUrl', avatarUrl); // 缓存头像 URL
            uni.redirectTo({
              url: '/pages/metaverse/background'
            });
          } else {
            // 未设置头像 → 跳转 metaverse.vue
            uni.redirectTo({
              url: '/pages/metaverse/metaverse'
            });
          }
  
        } else {
          uni.showToast({
            title: res.result.message || '获取失败',
            icon: 'none'
          });
        }
  
      } catch (error) {
        console.error('调用失败:', error);
        uni.showToast({
          title: '云函数调用失败',
          icon: 'none'
        });
      }
    }
  }
  </script>
  
  <style>
  .main-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 18px;
  }
  </style>
  