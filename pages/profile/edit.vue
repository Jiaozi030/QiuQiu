<template>
    <view class="edit-page">
        <!-- 头像 -->
        <view class="edit-item">
            <text class="label">头像</text>
            <image :src="profile.avatar" class="avatar" />
            <button class="upload-button" @click="uploadAvatar">上传新头像</button>
        </view>

        <!-- 昵称 -->
        <view class="edit-item">
            <text class="label">昵称</text>
            <input v-model="profile.nickname" class="input" />
        </view>

        <!-- 性别 -->
        <view class="edit-item">
            <text class="label">性别</text>
            <picker :range="genders" @change="onGenderChange">
                <view class="picker">{{ profile.gender || '请选择性别' }}</view>
            </picker>
        </view>

        <!-- 生日 -->
        <view class="edit-item">
            <text class="label">生日</text>
            <picker mode="date" @change="onBirthDateChange">
                <view class="picker">{{ profile.birthDate || '请选择生日' }}</view>
            </picker>
        </view>

        <!-- 身高 -->
        <view class="edit-item">
            <text class="label">身高 (cm)</text>
            <slider
                :value="profile.height"
                min="100"
                max="250"
                step="1"
                @change="onHeightChange"
            />
            <text class="slider-value">{{ profile.height }} cm</text>
        </view>

        <!-- 体重 -->
        <view class="edit-item">
            <text class="label">体重 (kg)</text>
            <slider
                :value="profile.weight"
                min="30"
                max="150"
                step="1"
                @change="onWeightChange"
            />
            <text class="slider-value">{{ profile.weight }} kg</text>
        </view>

        <!-- 当前城市 -->
        <view class="edit-item">
            <text class="label">当前城市</text>
            <picker mode="region" @change="handleCityChange">
                <view class="picker">
                    {{ profile.currentCity.join(' ') || '请选择当前城市' }}
                </view>
            </picker>
        </view>

        <!-- 家乡 -->
        <view class="edit-item">
            <text class="label">家乡</text>
            <picker mode="region" @change="handleHomeTownChange">
                <view class="picker">
                    {{ profile.homeTown.join(' ') || '请选择家乡' }}
                </view>
            </picker>
        </view>

        <!-- 婚姻状况 -->
        <view class="edit-item">
            <text class="label">婚姻状况</text>
            <picker :range="maritalStatusOptions" @change="onMaritalStatusChange">
                <view class="picker">{{ profile.maritalStatus || '请选择婚姻状况' }}</view>
            </picker>
        </view>

        <!-- 自我介绍 -->
        <view class="edit-item">
            <text class="label">自我介绍</text>
            <textarea v-model="profile.selfIntroduction" class="textarea" />
        </view>

        <!-- 学历 -->
        <view class="edit-item">
            <text class="label">学历</text>
            <picker :range="educationOptions" @change="onEducationChange">
                <view class="picker">{{ profile.education || '请选择学历' }}</view>
            </picker>
        </view>

        <!-- 年收入 -->
        <view class="edit-item">
            <text class="label">年收入</text>
            <picker :range="incomeOptions" @change="handleIncomeChange">
                <view class="picker">
                    {{ profile.annualIncome || '请选择年收入' }}
                </view>
            </picker>
        </view>

        <!-- 职业 -->
        <view class="edit-item">
            <text class="label">职业</text>
            <input v-model="profile.occupation" class="input" />
        </view>

        <!-- 住房状况 -->
        <view class="edit-item">
            <text class="label">住房状况</text>
            <picker :range="housingOptions" @change="onHousingChange">
                <view class="picker">{{ profile.housing || '请选择住房状况' }}</view>
            </picker>
        </view>

        <!-- 是否有车 -->
        <view class="edit-item">
            <view class="has-car-container">
                <text class="label">是否有车</text>
                <image src="/static/default/car.jpg" class="car-icon" />
                <switch :checked="profile.hasCar" @change="onHasCarChange" />
            </view>
        </view>

        <!-- 标签 -->
        <view class="edit-item">
            <text class="label">标签</text>
            <MultiSelectTags
                :tags="tags"
                :selectedTags="profile.tags"
                @update:selectedTags="toggleTag"
            />
        </view>

        <!-- 兴趣爱好 -->
        <view class="edit-item">
            <text class="label">兴趣爱好</text>
            <MultiSelectTags
                :tags="hobbies"
                :selectedTags="profile.hobbies"
                @update:selectedTags="toggleHobby"
            />
        </view>

        <!-- 期望对象 -->
        <view class="edit-item">
            <text class="label">期望对象</text>
            <MultiSelectTags
                :tags="expectations"
                :selectedTags="profile.expectation"
                @update:selectedTags="toggleExpectation"
            />
        </view>

        <!-- 保存按钮 -->
        <button class="save-button" @click="handleComplete">保存</button>
    </view>
</template>

<script>
import { sampleTags } from '@/data/sampleTags';
import MultiSelectTags from '@/components/MultiSelectTags.vue';

const { tags, hobbies, expectations } = sampleTags;

export default {
    components: {
        MultiSelectTags,
    },
    data() {
        return {
            profile: {}, // 初始化用户资料
            genders: ['男', '女', '保密'],
            maritalStatusOptions: ['未婚', '已婚', '离异', '丧偶'],
            educationOptions: ['高中', '大专', '本科', '硕士', '博士'],
            housingOptions: ['自有住房', '租房', '无房'],
            tags, // 使用解构的 tags
            hobbies, // 使用解构的 hobbies
            expectations, // 使用解构的 expectations
            incomeOptions: ['10万以下', '10-20万', '20-30万', '30-50万', '50万以上'], // 年收入选项
            userId: ''
        };
    },
    async onLoad(options) {
        if (options.id) {
            // 调用云函数获取用户数据
            const res = await uniCloud.callFunction({
                name: 'profile',
                data: {
                    action: 'getProfileById',
                    id: options.id
                }
            });

            if (res.result.code === 200) {
                this.profile = res.result.data; // 更新用户资料
            } else {
                uni.showToast({
                    title: '获取数据失败',
                    icon: 'none'
                });
            }
        }
        if (options.userId) {
            this.userId = options.userId;
        }
    },
    methods: {
        // 切换标签
        toggleTag(tag) {
            if (this.profile.tags.includes(tag)) {
                this.profile.tags = this.profile.tags.filter(t => t !== tag);
            } else {
                this.profile.tags.push(tag);
            }
        },
        // 切换兴趣爱好
        toggleHobby(hobby) {
            if (this.profile.hobbies.includes(hobby)) {
                this.profile.hobbies = this.profile.hobbies.filter(h => h !== hobby);
            } else {
                this.profile.hobbies.push(hobby);
            }
        },
        // 切换期望对象
        toggleExpectation(expectation) {
            if (this.profile.expectation.includes(expectation)) {
                this.profile.expectation = this.profile.expectation.filter(e => e !== expectation);
            } else {
                this.profile.expectation.push(expectation);
            }
        },
        // 上传头像
        uploadAvatar() {
            uni.chooseImage({
                count: 1, // 只能选择一张图片
                sourceType: ['album', 'camera'], // 从相册或相机选择
                success: (res) => {
                    this.profile.avatar = res.tempFilePaths[0]; // 更新头像
                },
                fail: (err) => {
                    uni.showToast({
                        title: '上传失败，请重试',
                        icon: 'none',
                    });
                },
            });
        },
        onGenderChange(e) {
            if (typeof this.profile === 'string') {
                console.error('profile 是字符串，而不是对象');
                return;
            }
            this.profile.gender = this.genders[e.detail.value];
        },
        onBirthDateChange(e) {
            this.profile.birthDate = e.detail.value;
        },
        onCurrentCityChange(e) {
			this.profile.currentCity = e.detail.value;
		},
        onHomeTownChange(e) {
			this.profile.homeTown = e.detail.value;
		},
        onMaritalStatusChange(e) {
            this.profile.maritalStatus = this.maritalStatusOptions[e.detail.value];
        },
        onEducationChange(e) {
            this.profile.education = this.educationOptions[e.detail.value];
        },
        onHousingChange(e) {
            this.profile.housing = this.housingOptions[e.detail.value];
        },
        onHasCarChange(e) {
            this.profile.hasCar = e.detail.value;
        },
        onHeightChange(e) {
            this.profile.height = e.detail.value;
        },
        onWeightChange(e) {
            this.profile.weight = e.detail.value;
        },
        handleIncomeChange(e) {
            this.profile.annualIncome = this.incomeOptions[e.detail.value];
        },
        handleComplete: async function() {
            const userId = this.userId; // 当前用户的 ID
            const profile = this.profile; // 编辑后的 profile 信息

            // 调用云函数更新用户信息
            const res = await uniCloud.callFunction({
                name: 'update_profile',
                data: {
                    profile,
                    userId
                }
            });

            if (res.result.code === 200) {
                uni.showToast({
                    title: '保存成功',
                    icon: 'success'
                });
                uni.navigateBack(); // 返回上一页
            } else {
                uni.showToast({
                    title: '保存失败，请重试',
                    icon: 'none'
                });
            }
        },
        // 处理当前城市选择
        handleCityChange(e) {
            this.profile.currentCity = e.detail.value;
        },
        // 处理家乡选择
        handleHomeTownChange(e) {
            this.profile.homeTown = e.detail.value;
        },
    },
};
</script>

<style>
.edit-page {
    padding: 20px;
    background-color: #f8f9fa; /* 背景色 */
}

.edit-item {
    margin-bottom: 20px;
    background-color: #fff; /* 白色背景 */
    padding: 15px;
    border-radius: 8px; /* 圆角 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* 轻微阴影 */
}

.label {
    font-size: 14px;
    color: #666; /* 灰色文字 */
    margin-bottom: 8px;
    display: block;
}

.input, .textarea, .picker {
    width: 100%;
    padding: 12px; /* 增加内边距 */
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 14px;
    color: #333;
    background-color: #fff;
    box-sizing: border-box;
    margin-top: 8px; /* 增加上边距 */
}

.input {
    height: 33px; /* 固定输入框高度 */
}

.textarea {
    height: 50px; /* 固定文本域高度 */
    resize: none; /* 禁止手动调整大小 */
}

.picker {
    color: #333; /* 深灰色文字 */
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 auto 10px; /* 头像居中 */
    display: block; /* 确保居中生效 */
    border: 2px solid #e0e0e0;
}

.upload-button {
    padding: 0; /* 移除 padding */
    background-color: #6096b7;
    color: #fff;
    border-radius: 6px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100px; /* 按钮宽度 */
    height: 40px; /* 按钮高度 */
    line-height: 40px; /* 与高度一致，确保文字垂直居中 */
    text-align: center; /* 文字水平居中 */
    display: block; /* 确保居中生效 */
    margin: 0 auto; /* 按钮居中 */
}

.upload-button:hover {
    background-color: #7190b0; /* 深蓝色悬停效果 */
}

.save-button {
    width: 100px; /* 按钮宽度 */
    height: 40px;
    padding: 0;
    background-color: #479fc1; /* 蓝色按钮 */
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

.save-button:hover {
    background-color: #009ab5; /* 深蓝色悬停效果 */
}

/* 选择器样式 */
picker-view {
    background-color: #fff;
    border-radius: 6px;
    border: 1px solid #e0e0e0;
}

picker-view-column {
    padding: 10px;
}

picker-view-column-item {
    font-size: 14px;
    color: #333;
    padding: 10px 0;
    text-align: center;
}

.has-car-container {
    display: flex;
    align-items: center; /* 垂直居中 */
}

.label {
    font-size: 14px;
    color: #666;
    margin-right: 10px; /* 文字和图片之间的间距 */
}

.car-icon {
    height: 24px; /* 固定高度 */
    width: 36px; /* 宽度根据比例自动调整 */
    margin-right: 10px; /* 图片和选择器之间的间距 */
}

.slider-value {
    font-size: 14px;
    color: #333;
    margin-top: 8px;
    text-align: center;
    display: block;
}
</style>