<template>
  <!-- No changes to template section -->
</template>

<script>
export default {
  data() {
    return {
      tabs: [{
        text: '首页',
        path: '/pages/index/index',
        icon: '/static/tab-home.png'
      }, {
        text: '发现',
        path: '/pages/discover/discover',
        icon: '/static/tab-discover.png'
      }, {
        text: '元宇宙',
        path: '/pages/metaverse/metaverse',
        icon: '/static/tab-metaverse.png'
      }, {
        text: '消息',
        path: '/pages/message/message',
        icon: '/static/tab-message.png'
      }, {
        text: '我的',
        path: '/pages/profile/profile',
        icon: '/static/tab-profile.png'
      }]
    };
  },
  methods: {
    navigateTo(path) {
      uni.switchTab({
        url: path
      });
    }
  }
};
</script>

<style>
  /* No changes to style section */
</style> 