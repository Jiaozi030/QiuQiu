<template>
  <view class="avatar-view">
    <web-view :src="webViewUrl"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      webViewUrl: '/static/web/avatar.html', // 确保路径正确
    };
  },
};
</script>

<style>
.avatar-view {
  width: 100%;
  height: 100vh;
}
</style>