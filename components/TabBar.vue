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
        icon: '/static/default/tab-home.png'
      }, {
        text: '发现',
        path: '/pages/discover/discover',
        icon: '/static/default/tab-discover.png'
      }, {
        text: '元宇宙',
        path: '/pages/metaverse/metaverse',
        icon: '/static/default/tab-metaverse.png'
      }, {
        text: '消息',
        path: '/pages/message/message',
        icon: '/static/default/tab-message.png'
      }, {
        text: '我的',
        path: '/pages/profile/profile',
        icon: '/static/default/tab-profile.png'
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