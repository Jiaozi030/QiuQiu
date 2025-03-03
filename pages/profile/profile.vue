<template>
  <view class="profile-page">
    <!-- 头像和相册 -->
    <view class="avatar-section">
      <image :src="user.avatar" class="avatar" />
      <view class="photo-album">
        <image v-for="(photo, index) in user.photoAlbum" :key="index" :src="photo" class="album-photo" />
      </view>
    </view>

    <!-- 基本资料 -->
    <view class="section">
      <text class="section-title">基本资料</text>
      <view class="info-item">
        <text class="info-label">昵称：</text>
        <text class="info-value">{{ user.nickname }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">性别：</text>
        <text class="info-value">{{ user.gender }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">出生日期：</text>
        <text class="info-value">{{ user.birthDate }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">身高：</text>
        <text class="info-value">{{ user.height }} cm</text>
      </view>
      <view class="info-item">
        <text class="info-label">体重：</text>
        <text class="info-value">{{ user.weight }} kg</text>
      </view>
      <view class="info-item">
        <text class="info-label">现居地：</text>
        <text class="info-value">{{ user.currentCity }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">家乡：</text>
        <text class="info-value">{{ user.hometown }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">婚姻状况：</text>
        <text class="info-value">{{ user.maritalStatus }}</text>
      </view>
    </view>

    <!-- 自我介绍 -->
    <view class="section">
      <text class="section-title">自我介绍</text>
      <text class="self-intro">{{ user.selfIntroduction }}</text>
    </view>

    <!-- 详细资料 -->
    <view class="section">
      <text class="section-title">详细资料</text>
      <view class="info-item">
        <text class="info-label">学历：</text>
        <text class="info-value">{{ user.education }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">年收入：</text>
        <text class="info-value">{{ user.annualIncome }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">职业：</text>
        <text class="info-value">{{ user.occupation }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">住房情况：</text>
        <text class="info-value">{{ user.housing }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">是否有车：</text>
        <text class="info-value">{{ user.hasCar ? '有' : '无' }}</text>
      </view>
    </view>

    <!-- 我的标签 -->
    <view class="section">
      <text class="section-title">我的标签</text>
      <view class="tags">
        <text v-for="(tag, index) in user.tags" :key="index" class="tag">{{ tag }}</text>
      </view>
    </view>

    <!-- 兴趣爱好 -->
    <view class="section">
      <text class="section-title">兴趣爱好</text>
      <view class="hobbies">
        <text v-for="(hobby, index) in user.hobbies" :key="index" class="hobby">{{ hobby }}</text>
      </view>
    </view>

    <!-- 期望对象 -->
    <view class="section">
      <text class="section-title">期望对象</text>
      <text class="expectation">{{ user.expectation }}</text>
    </view>

    <!-- 编辑按钮 -->
    <button class="edit-button" @click="navigateToEdit">编辑</button>
  </view>
</template>

<script>
import { sampleProfile } from '@/data/sampleProfile.js';

export default {
  data() {
    return {
      user: sampleProfile
    };
  },
  methods: {
  //   async fetchSampleTags() {
  //     const res = await uni.request({
  //       url: '/api/sampleTags', // 替换为实际接口
  //       method: 'GET',
  //     });
  //     this.user.tags = res.data.tags.slice(0, 10);
  //     this.user.hobbies = res.data.hobbies.slice(0, 10);
  //     this.user.expectation = res.data.expectations.slice(0, 10).join('、');
  //   },
  // 跳转到编辑页面
    navigateToEdit() {
      console.log('传递的个人资料:', this.user); // 调试日志
      uni.navigateTo({
        url: `/pages/profile/edit?profile=${encodeURIComponent(JSON.stringify(this.user))}`,
      });
    },
  },
  onShow() {
    const eventChannel = this.getOpenerEventChannel();
    if (eventChannel && eventChannel.on) {
      eventChannel.on('someEvent', (data) => {
        console.log('Received data:', data);
      });
    }
  },
}
</script>

<style>
.profile-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.photo-album {
  display: flex;
  gap: 10px;
}

.album-photo {
  width: 60px;
  height: 60px;
  border-radius: 8px;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.info-item {
  display: flex;
  gap: 10px;
}

.info-label {
  font-size: 14px;
  color: #666;
}

.info-value {
  font-size: 14px;
  color: #333;
}

.self-intro {
  font-size: 14px;
  color: #333;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  font-size: 12px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 20px;
}

.hobbies {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hobby {
  font-size: 12px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border-radius: 20px;
}

.expectation {
  font-size: 14px;
  color: #333;
}

.edit-button {
  height: 40px; 
  width: 80px;
  padding: 0;
  background-color: #479fc1; 
  color: #fff;
  border-radius: 6px; /* 圆角 */
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease; /* 平滑过渡 */
  line-height: 40px; /* 与高度一致，确保文字垂直居中 */
  text-align: center; /* 文字水平居中 */
  display: block; /* 确保居中生效 */
  margin: 0 auto;
}
</style> 