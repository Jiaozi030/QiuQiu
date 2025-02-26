<template>
    <view class="post-page">
        <textarea
            v-model="postContent"
            placeholder="分享你的想法..."
            class="post-input"
        />
        <view class="image-upload" @click="handleImageUpload">
            <image src="/static/upload-picture.jpg" class="upload-icon" />
        </view>
        <button @click="handlePost" class="post-button">发布</button>
    </view>
</template>

<script>
export default {
    data() {
        return {
            postContent: '', // 帖子内容
            imageUrl: '', // 上传的图片 URL
        };
    },
    methods: {
        // 处理图片上传
        handleImageUpload() {
            uni.chooseImage({
                count: 1, // 最多选择 1 张图片
                sourceType: ['album', 'camera'], // 可以从相册或相机选择
                success: (res) => {
                    const tempFilePath = res.tempFilePaths[0]; // 获取选择的图片路径
                    this.imageUrl = tempFilePath; // 将图片路径赋值给 imageUrl
                },
                fail: (err) => {
                    uni.showToast({
                        title: '选择图片失败',
                        icon: 'none',
                    });
                    console.error('选择图片失败：', err);
                },
            });
        },
        // 处理发布
        handlePost() {
            if (!this.postContent && !this.imageUrl) {
                uni.showToast({
                    title: '请填写内容或上传图片',
                    icon: 'none',
                });
                return;
            }

            // 模拟发布逻辑
            const post = {
                content: this.postContent,
                image: this.imageUrl,
                timestamp: new Date().toLocaleString(),
            };
            console.log('发布内容：', post);

            // 清空输入
            this.postContent = '';
            this.imageUrl = '';

            uni.showToast({
                title: '发布成功',
                icon: 'success',
            });

            // 返回发现页面
            uni.navigateBack();
        },
    },
};
</script>

<style>
.post-page {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.post-input {
    width: 100%;
    height: 100px;
    padding: 3px;
    border: 3px solid #ccc;
    border-radius: 8px;
    font-size: 15px;
    box-sizing: border-box;
    margin: 0;
    white-space: normal; /* 确保文本换行正常 */
    overflow: auto; /* 允许滚动 */
}

.image-upload {
    display: flex;
    justify-content: center;
    align-items: center;
}

.upload-icon {
    width: 100px;
    height: 100px;
    cursor: pointer;
}

.post-button {
    width: 80%;
    height: 40px;
    background-color: #fff3cd; /* 淡黄色背景 */
    color: #856404; /* 深黄色文字，与背景形成对比 */
    border-radius: 8px;
    font-size: 14px;
    border: 1px solid #ffeeba; /* 浅黄色边框 */
    transition: background-color 0.3s ease; /* 添加过渡效果 */
    display: flex; /* 使用 flex 布局 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}

.post-button:hover {
    background-color: #ffeeba; /* 鼠标悬停时背景变亮 */
}
</style>