<template>
  <view class="metaverse-page">
    <web-view :src="webViewUrl" @message="handleMessage" style="width: 100vw; height: 100vh;"></web-view>
  </view>
</template>

<script>  
export default {
  data() {
    return {
      webViewUrl: 'https://readyplayer.me/avatar?frameApi', // Ready Player Me 嵌入页面 URL
    };
  },
  methods: {
    handleMessage(event) {
      const message = event.detail.data[0];
      if (message.type === 'avatarUrl') {
        const avatarUrl = message.url;
        console.log('Received Avatar URL:', avatarUrl);
        // 在这里处理 Avatar URL，例如保存到本地或上传到服务器
      }
    },
    navigateBack() {
      uni.navigateBack();
    },
  },
};
</script>

<style>
.metaverse-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style> 