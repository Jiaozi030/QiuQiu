<template>
  <view class="profile-page">
    <!-- 编辑按钮 -->
    <view class="edit-button" @click="navigateToEdit">
      <text>编辑</text>
    </view>

    <!-- 头像和基本信息 -->
    <view class="profile-header">
      <view class="avatar-container">
        <image :src="profile.avatar" class="avatar" />
      </view>
      <view class="basic-info">
        <text class="nickname">{{ profile.nickname }}</text>
        <text class="gender">{{ profile.gender }} | {{ profile.age }}岁</text>
        <text class="location">{{ profile.currentCity }}</text>
      </view>
    </view>

    <!-- 标签 -->
    <view class="section">
      <text class="section-title">标签</text>
      <view class="tag-container">
        <view v-for="(tag, index) in profile.tags" :key="index" class="tag">
          {{ tag }}
        </view>
      </view>
    </view>

    <!-- 兴趣爱好 -->
    <view class="section">
      <text class="section-title">兴趣爱好</text>
      <view class="tag-container">
        <view v-for="(hobby, index) in profile.hobbies" :key="index" class="tag">
          {{ hobby }}
        </view>
      </view>
    </view>

    <!-- 期望对象 -->
    <view class="section">
      <text class="section-title">期望对象</text>
      <view class="tag-container">
        <view v-for="(expectation, index) in profile.expectation" :key="index" class="tag">
          {{ expectation }}
        </view>
      </view>
    </view>

    <!-- 其他信息 -->
    <view class="section">
      <text class="section-title">关于我</text>
      <view class="info-item">
        <text class="info-label">身高</text>
        <text class="info-value">{{ profile.height }} cm</text>
      </view>
      <view class="info-item">
        <text class="info-label">体重</text>
        <text class="info-value">{{ profile.weight }} kg</text>
      </view>
      <view class="info-item">
        <text class="info-label">学历</text>
        <text class="info-value">{{ profile.education }}</text>
      </view>
      <view class="info-item">
        <view class="info-label">
          <image src="/static/default/house.jpg" class="icon" />
        </view>
        <text class="info-value">{{ profile.housing }}</text>
      </view>
      <view class="info-item">
        <view class="info-label">
          <image src="/static/default/car.jpg" class="icon" />
        </view>
        <text class="info-value">{{ profile.hasCar ? '有车' : '无车' }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">年收入</text>
        <text class="info-value">{{ profile.annualIncome }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">职业</text>
        <text class="info-value">{{ profile.occupation }}</text>
      </view>
    </view>

    <!-- 自我介绍 -->
    <view class="section">
      <text class="section-title">自我介绍</text>
      <view class="self-introduction">
        <p>{{ profile.selfIntroduction }}</p>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      profile: {
        avatar: '/static/default/logo.png',
        nickname: '饺子',
        gender: '女',
        age: 21,
        currentCity: '杭州',
        tags: ['无法描述的好姑娘', '肤白貌美', '古灵精怪'],
        hobbies: ['旅行', '王者', '美食达人'],
        expectation: ['三观一致', '有趣', '有钱', '帅必须帅'],
        height: 172,
        weight: 63,
        education: '本科',
        housing: '自住有房',
        hasCar: '有车', 
        annualIncome: '20万',
        occupation: '程序员',
        selfIntroduction: '我是一个热爱生活、积极向上的人，喜欢旅行和摄影。',
      },
    };
  },
  methods: {
    // 跳转到编辑页面
    navigateToEdit() {
      uni.navigateTo({
        url: '/pages/profile/edit',
      });
    },
  },
};
</script>

<style>
.profile-page {
  padding: 20px;
  background-color: #f8f8f8;
  position: relative;
}

.edit-button {
  position: absolute;
  top: 40px;
  right: 50px;
  padding: 8px 16px;
  border: 1px solid #6096b7;
  border-radius: 16px;
  font-size: 14px;
  color: #6096b7;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-button:hover {
  background-color: #6096b7;
  color: #fff;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar-container {
  margin-left: 20px;
  margin-right: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.basic-info {
  display: flex;
  flex-direction: column;
}

.nickname {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.gender {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.location {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
}

.section {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
  display: block;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  font-size: 12px;
  color: #666;
  background-color: #fff;
}

.info-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 60px 8px 50px;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 14px;
  color: #666;
  flex-shrink: 0;
}

.info-value {
  font-size: 14px;
  color: #333;
  text-align: right;
}

.self-introduction {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

.self-introduction p {
  text-indent: 2em; /* 首行缩进 2 个字符宽度 */
  margin: 0; /* 去除默认的段落间距 */
}

.icon {
    width: 25px;
    height: 20px;
    margin-right: 8px;
}
</style> 