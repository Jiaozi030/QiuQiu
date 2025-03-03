<template>
    <view class="following-page">
        <view class="header">
            <text class="title">我的关注</text>
        </view>

        <view class="user-list">
            <view v-for="(user, index) in followingList" :key="index" class="user-item">
                <image :src="user.avatar" class="avatar" />
                <view class="user-info">
                    <text class="nickname">{{ user.nickname }}</text>
                    <view class="details">
                        <text class="gender" :class="user.gender === '男' ? 'male' : 'female">
                            {{ user.gender === '男' ? '♂' : '♀' }}
                        </text>
                        <text class="age">{{ user.age }}岁</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { sampleFollowings } from '@/data/sampleFollowings.js';
export default {
    data() {
        return {
            followingList: sampleFollowings, 
        };
    },
    mounted() {
        console.log('关注列表数据：', this.followingList);
    }
    // methods: {
    //     // 跳转到用户详情页面
    //     navigateToUserDetail(user) {
    //         uni.navigateTo({
    //             url: `/pages/user/detail?id=${user.id}`, // 假设用户详情页面的路径为 /pages/user/detail
    //         });
    //     },
    // },
};
</script>

<style>
.following-page {
    padding: 20px;
    background-color: #f8f8f8;
}

.header {
    margin-bottom: 20px;
}

.title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
}

.user-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.user-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
}

.user-item:last-child {
    border-bottom: none;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
}

.user-info {
    display: flex;
    flex-direction: column;
}

.nickname {
    font-size: 14px;
    color: #333;
}

.details {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 4px;
}

.gender {
    font-size: 14px;
}

.gender.male {
    color: #87CEEB;
}

.gender.female {
    color: #FFB6C1;
}

.age {
    font-size: 12px;
    color: #666;
}
</style>
