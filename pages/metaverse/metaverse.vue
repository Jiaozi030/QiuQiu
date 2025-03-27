<template>
  <view class="metaverse-page">
    <web-view 
      v-if="!avatarUrl" 
      :src="webViewUrl" 
      @message="handleMessage" 
      :style="webViewStyle"
      @load="handleWebViewLoad"
    ></web-view>
    <avatar-viewer v-else :avatar-url="avatarUrl" />
    <view v-if="isLoading" class="loading-overlay">加载中...</view>
  </view>
</template>

<script>
import AvatarViewer from '@/components/AvatarViewer.vue';
import io from 'socket.io-client';

export default {
  components: {
    AvatarViewer,
  },
  data() {
    return {
      webViewUrl: 'https://readyplayer.me/avatar?frameApi', // Ready Player Me 嵌入页面 URL
      webViewStyle: {
        width: '100vw',
        height: '100vh', // 默认高度
      },
      avatarUrl: null,
      users: {}, // 存储其他用户的信息
      isLoading: true,
    };
  },
  created() {
    // 将 socket 存储为实例属性，而不是响应式数据
    this.socket = io('https://your-socket-server-url');

    // 监听其他用户加入
    this.socket.on('userJoined', (userId, avatarUrl) => {
      this.$set(this.users, userId, { avatarUrl, position: { x: 0, y: 0, z: 0 } });
    });

    // 监听其他用户离开
    this.socket.on('userLeft', (userId) => {
      this.$delete(this.users, userId);
    });

    // 监听其他用户的位置更新
    this.socket.on('positionUpdate', (userId, position) => {
      if (this.users[userId]) {
        this.users[userId].position = position;
      }
    });

    const savedAvatarUrl = uni.getStorageSync('avatarUrl');
    if (savedAvatarUrl) {
      this.avatarUrl = savedAvatarUrl;
    }
  },
  onLoad() {
    // 获取系统信息，计算可用高度
    const systemInfo = uni.getSystemInfoSync();
    const windowHeight = systemInfo.windowHeight;
    const tabBarHeight = 50; // 适当调整

    // this.webViewStyle.height = `${windowHeight - tabBarHeight}px`;
    this.webViewStyle.height = `${systemInfo.screenHeight}px`;

  },
  beforeDestroy() {
    this.socket.off('userJoined');
    this.socket.off('userLeft');
    this.socket.off('positionUpdate');
    this.socket.disconnect();
  },
  methods: {
    handleMessage(event) {
      const message = event.detail.data[0];
      if (message.type === 'avatarUrl') {
        this.avatarUrl = message.url;
        console.log('Received Avatar URL:', this.avatarUrl);
        uni.setStorageSync('avatarUrl', this.avatarUrl); // 保存到本地存储
        // 可以将 avatarUrl 保存到用户信息中
      }
    },
    // 在用户移动时发送位置更新
    updatePosition(position) {
      this.socket.emit('positionUpdate', position);
    },
    handleWebViewLoad() {
      this.isLoading = false;
    },
  },
};
</script>

<style>
.metaverse-page {
  width: 100%;
  height: 100vh;
}
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>