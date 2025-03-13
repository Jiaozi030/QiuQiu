<template>
    <view class="se-profile-page">
        <!-- 头部 -->
        <view class="header">
            <image :src="profile.avatar" class="avatar" />
            <view class="user-info">
                <text class="nickname">{{ profile.nickname }}</text>
                <view class="basic-info">
                    <text class="info-item">{{ profile.gender }}</text>
                    <text class="info-item">{{ profile.age }}岁</text>
                    <text class="info-item">{{ profile.currentCity }}</text>
                </view>
            </view>
            <text class="bio">{{ profile.selfIntroduction }}</text>
        </view>

        <!-- 操作按钮 -->
        <view class="actions">
            <view class="action-item" @click="handleFollow">
                <image :src="isFollowing ? '/static/default/followed.jpg' : '/static/default/follow.jpg'" class="action-icon" />
                <text class="action-text">{{ isFollowing ? '已关注' : '关注' }}</text>
            </view>
            <view class="action-item" @click="handleChat">
                <image src="/static/default/chat.jpg" class="action-icon" />
                <text class="action-text">聊天</text>
            </view>
        </view>

        <!-- 标签展示 -->
        <view class="section">
            <text class="section-title">标签</text>
            <view class="tags">
                <view v-for="(tag, index) in profile.tags" :key="index" class="tag">
                    <text>{{ tag }}</text>
                </view>
            </view>
        </view>

        <!-- 兴趣爱好展示 -->
        <view class="section">
            <text class="section-title">兴趣爱好</text>
            <view class="tags">
                <view v-for="(hobby, index) in profile.hobbies" :key="index" class="tag">
                    <text>{{ hobby }}</text>
                </view>
            </view>
        </view>

        <!-- 期望对象展示 -->
        <view class="section">
            <text class="section-title">期望对象</text>
            <view class="tags">
                <view v-for="(expect, index) in profile.expectation" :key="index" class="tag">
                    <text>{{ expect }}</text>
                </view>
            </view>
        </view>

        <!-- 关于ta -->
        <view class="section">
            <text class="section-title">关于ta</text>
            <view class="details">
                <view class="detail-item">
                    <text class="label">身高</text>
                    <text class="value">{{ profile.height }}cm</text>
                </view>
                <view class="detail-item">
                    <text class="label">体重</text>
                    <text class="value">{{ profile.weight }}kg</text>
                </view>
                <view class="detail-item">
                    <text class="label">学历</text>
                    <text class="value">{{ profile.education }}</text>
                </view>
                <view class="detail-item">
                    <view class="label">
                        <image src="/static/default/house.jpg" class="icon" />
                    </view>
                    <text class="value">{{ profile.housing }}</text>
                </view>
                <view class="detail-item">
                    <view class="label">
                        <image src="/static/default/car.jpg" class="icon" />
                    </view>
                    <text class="value">{{ profile.hasCar }}</text>
                </view>
                <view class="detail-item">
                    <text class="label">年收入</text>
                    <text class="value">{{ profile.annualIncome }}</text>
                </view>
                <view class="detail-item">
                    <text class="label">职业</text>
                    <text class="value">{{ profile.occupation }}</text>
                </view>
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
                nickname: '三明治',
                gender: '男',
                age: 22,
                currentCity: '杭州',
                tags: [], // 确保 tags 字段存在
                hobbies: [], // 确保 hobbies 字段存在
                expectation: [], // 确保 expectation 字段存在
                height: 178,
                weight: 69,
                education: '硕士',
                housing: '自住有房',
                hasCar: '无车', 
                annualIncome: '20万',
                occupation: '程序员',
                selfIntroduction: '我是一个热爱生活、积极向上的人，喜欢旅行和摄影。',
            },
            isFollowing: false, // 是否已关注
        };
    },
    async onLoad(options) {
        if (options.id) {
            // 根据传递的 _id 获取用户数据
            await this.loadProfileData(options.id);
            // 检查是否已关注
            await this.checkFollowStatus();
        }
    },
    methods: {
        // 根据 _id 获取用户数据
        async loadProfileData(id) {
            try {
                const res = await uniCloud.callFunction({
                    name: 'profile',
                    data: {
                        action: 'getProfileById',
                        id: id, // 传递用户 _id
                    },
                });

                console.log('获取到的用户数据:', res.result.data); // 打印用户数据
                if (res.result.code === 200) {
                    this.profile = res.result.data; // 更新用户数据
                } else {
                    uni.showToast({
                        title: '获取用户数据失败',
                        icon: 'none',
                    });
                }
            } catch (err) {
                console.error('获取用户数据失败:', err);
                uni.showToast({
                    title: '获取用户数据失败',
                    icon: 'none',
                });
            }
        },
        // 检查是否已关注
        async checkFollowStatus() {
            try {
                const res = await uniCloud.callFunction({
                    name: 'follow',
                    data: {
                        action: 'checkFollow',
                        userId: '67d16f8ae0ec19c842704b02', // 当前用户的 _id
                        followedUserId: this.profile._id, // 被关注用户的 _id
                    },
                });

                if (res.result.code === 200) {
                    this.isFollowing = res.result.isFollowing;
                }
            } catch (err) {
                console.error('检查关注状态失败:', err);
            }
        },
        // 处理关注按钮点击
        async handleFollow() {
            try {
                const action = this.isFollowing ? 'unfollow' : 'follow';
                const res = await uniCloud.callFunction({
                    name: 'follow',
                    data: {
                        action: action,
                        userId: '67d16f8ae0ec19c842704b02', // 当前用户的 _id
                        followedUserId: this.profile._id, // 被关注用户的 _id
                    },
                });

                if (res.result.code === 200) {
                    this.isFollowing = !this.isFollowing;
                    uni.showToast({
                        title: this.isFollowing ? '关注成功' : '取消关注成功',
                        icon: 'none',
                    });
                    // 更新关注页的数据
                    uni.$emit('followUpdated');
                } else {
                    uni.showToast({
                        title: res.result.message,
                        icon: 'none',
                    });
                }
            } catch (err) {
                console.error('操作失败:', err);
                uni.showToast({
                    title: '操作失败',
                    icon: 'none',
                });
            }
        },
        // 处理聊天按钮点击
        handleChat() {
            uni.navigateTo({
                url: '/pages/chat/chat', // 跳转到聊天页面
            });
        },
    },
};
</script>

<style>
.se-profile-page {
    padding: 20px;
    background-color: #f8f8f8;
}

.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-bottom: 12px;
}

.user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.nickname {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
}

.basic-info {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
}

.info-item {
    font-size: 14px;
    color: #666;
}

.bio {
    font-size: 14px;
    color: #666;
    text-align: center;
}

.actions {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 20px;
}

.action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.action-icon {
    height: 40px; /* 固定高度 */
    width: 50px; /* 根据原有尺寸比例调整宽度 */
    margin-bottom: 8px;
    border: 2px solid #ffdb78; /* 描边  */
    border-radius: 10px; /* 圆滑效果 */
}

.action-text {
    font-size: 14px;
    color: #333;
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

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tag {
    background-color: #f0f0f0;
    border-radius: 16px;
    padding: 6px 12px;
    font-size: 12px;
    color: #333;
}

.details {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.detail-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
}

.detail-item:last-child {
    border-bottom: none;
}

.label {
    font-size: 14px;
    color: #333;
}

.value {
    font-size: 14px;
    color: #666;
}

.icon {
    width: 25px;
    height: 20px;
    margin-right: 8px;
}
</style> 