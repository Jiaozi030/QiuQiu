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
                    {{ profile.currentCity || '请选择当前城市' }}
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
            <view class="tag-container">
                <view
                    v-for="(tag, index) in tagsOptions"
                    :key="index"
                    class="tag"
                    :class="{ active: profile.tags.includes(tag) }"
                    @click="toggleTag(tag)"
                >
                    {{ tag }}
                </view>
            </view>
        </view>

        <!-- 兴趣爱好 -->
        <view class="edit-item">
            <text class="label">兴趣爱好</text>
            <view class="tag-container">
                <view
                    v-for="(hobby, index) in hobbiesOptions"
                    :key="index"
                    class="tag"
                    :class="{ active: profile.hobbies.includes(hobby) }"
                    @click="toggleHobby(hobby)"
                >
                    {{ hobby }}
                </view>
            </view>
        </view>

        <!-- 期望对象 -->
        <view class="edit-item">
            <text class="label">期望对象</text>
            <view class="tag-container">
                <view
                    v-for="(expectation, index) in expectationOptions"
                    :key="index"
                    class="tag"
                    :class="{ active: profile.expectation.includes(expectation) }"
                    @click="toggleExpectation(expectation)"
                >
                    {{ expectation }}
                </view>
            </view>
        </view>

        <!-- 保存按钮 -->
        <button class="save-button" @click="handleComplete">保存</button>
    </view>
</template>

<script>
import { sampleTags } from '@/data/sampleTags';
import MultiSelectTags from '@/components/MultiSelectTags.vue';

export default {
    components: {
        MultiSelectTags,
    },
    data() {
        return {
            profile: {
                avatar: '/static/default/logo.png',
                nickname: '',
                gender: '',
                age: 0,
                birthDate: '',
                height: 170,
                weight: 60,
                currentCity: '',
                maritalStatus: '',
                selfIntroduction: '',
                education: '',
                annualIncome: '',
                occupation: '',
                housing: '',
                hasCar: false,
                tags: [],
                hobbies: [],
                expectation: [],
            },
            genders: ['男', '女', '保密'],
            maritalStatusOptions: ['未婚', '已婚', '离异', '丧偶'],
            educationOptions: ['初中', '高中', '本科', '硕士', '博士'],
            incomeOptions: ['10万以下', '10-20万', '20-30万', '30-50万', '50万以上'],
            housingOptions: ['租房', '自有住房', '与父母同住'],
            tagsOptions: [],
            hobbiesOptions: [],
            expectationOptions: [],
            userId: ''
        };
    },
    watch: {
        'profile.gender': {
            handler(newGender) {
                this.updateOptionsByGender(newGender);
            },
            immediate: true,
        },
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
                const profileData = res.result.data;
                // 根据年龄计算出生日
                if (profileData.age) {
                    const currentYear = new Date().getFullYear();
                    const birthYear = currentYear - profileData.age;
                    profileData.birthDate = `${birthYear}-01-01`; // 默认生日为 1 月 1 日
                }
                this.profile = profileData; // 更新用户资料
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
        updateOptionsByGender(gender) {
            if (gender === '男') {
                this.tagsOptions = sampleTags.tags2;
                this.hobbiesOptions = sampleTags.hobbies2;
                this.expectationOptions = sampleTags.expectations2;
            } else if (gender === '女') {
                this.tagsOptions = sampleTags.tags;
                this.hobbiesOptions = sampleTags.hobbies;
                this.expectationOptions = sampleTags.expectations;
            } else {
                this.tagsOptions = [];
                this.hobbiesOptions = [];
                this.expectationOptions = [];
            }
        },
        toggleTag(tag) {
            if (this.profile.tags.includes(tag)) {
                this.profile.tags = this.profile.tags.filter(t => t !== tag);
            } else {
                this.profile.tags.push(tag);
            }
        },
        toggleHobby(hobby) {
            if (this.profile.hobbies.includes(hobby)) {
                this.profile.hobbies = this.profile.hobbies.filter(h => h !== hobby);
            } else {
                this.profile.hobbies.push(hobby);
            }
        },
        toggleExpectation(expectation) {
            if (this.profile.expectation.includes(expectation)) {
                this.profile.expectation = this.profile.expectation.filter(e => e !== expectation);
            } else {
                this.profile.expectation.push(expectation);
            }
        },
        uploadAvatar() {
            uni.chooseImage({
                count: 1,
                sourceType: ['album', 'camera'],
                success: (res) => {
                    this.profile.avatar = res.tempFilePaths[0];
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
            // 根据生日计算年龄
            const birthYear = new Date(this.profile.birthDate).getFullYear();
            const currentYear = new Date().getFullYear();
            this.profile.age = currentYear - birthYear;
        },
        onCurrentCityChange(e) {
			this.profile.currentCity = e.detail.value;
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
        async handleComplete() {
            if (!this.profile._id) {
                uni.showToast({
                    title: '用户ID不存在',
                    icon: 'none',
                });
                return;
            }

            try {
                const res = await uniCloud.callFunction({
                    name: 'profile',
                    data: {
                        action: 'updateProfile',
                        id: this.profile._id,
                        profile: {
                            ...this.profile,
                        },
                    },
                    timeout: 10000, // 设置超时时间
                });

                if (res.result.code === 200) {
                    uni.showToast({
                        title: '保存成功',
                        icon: 'success',
                    });
                    uni.navigateBack();
                } else {
                    uni.showToast({
                        title: '保存失败，请重试',
                        icon: 'none',
                    });
                }
            } catch (err) {
                console.error('保存失败:', err); // 打印错误日志
                uni.showToast({
                    title: '保存失败，请重试',
                    icon: 'none',
                });
            }
        },
        handleCityChange(e) {
            const [province, city, district] = e.detail.value;
            this.profile.currentCity = city;
        },
    },
};
</script>

<style>
.edit-page {
    padding: 20px;
    background-color: #f8f9fa;
}

.edit-item {
    margin-bottom: 20px;
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.label {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
    display: block;
}

.input, .textarea, .picker {
    width: 100%;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 14px;
    color: #333;
    background-color: #fff;
    box-sizing: border-box;
    margin-top: 8px;
}

.input {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 14px;
    color: #333;
    background-color: #fff;
    box-sizing: border-box;
    line-height: 20px;
    display: flex;
    align-items: center;
}

.textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 14px;
    color: #333;
    background-color: #fff;
    box-sizing: border-box;
    line-height: 1.5;
    resize: none;
}

.picker {
    color: #333;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 auto 10px;
    display: block;
    border: 2px solid #e0e0e0;
}

.upload-button {
    padding: 0;
    background-color: #6096b7;
    color: #fff;
    border-radius: 6px;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: block;
    margin: 0 auto;
}

.upload-button:hover {
    background-color: #7190b0;
}

.save-button {
    width: 100px;
    height: 40px;
    padding: 0;
    background-color: #479fc1;
    color: #fff;
    border-radius: 6px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    line-height: 40px;
    text-align: center;
    display: block;
    margin: 0 auto;   
}

.save-button:hover {
    background-color: #009ab5;
}

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
    align-items: center;
}

.label {
    font-size: 14px;
    color: #666;
    margin-right: 10px;
}

.car-icon {
    height: 24px;
    width: 36px;
    margin-right: 10px;
}

.slider-value {
    font-size: 14px;
    color: #333;
    margin-top: 8px;
    text-align: center;
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
    cursor: pointer;
}

.tag.active {
    background-color: #6096b7;
    color: #fff;
    border-color: #6096b7;
}
</style>