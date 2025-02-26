<template>
    <view class="post-page">
        <textarea
            v-model="postContent"
            placeholder="分享你的想法..."
            class="post-input"
        />
        <view class="image-upload">
            <text>上传图片：</text>
            <input type="file" @change="handleImageUpload" accept="image/*" />
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
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imageUrl = e.target.result; // 将图片转换为 base64
                };
                reader.readAsDataURL(file);
            }
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
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
}

.image-upload {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
}

.post-button {
    background-color: #007aff;
    color: #fff;
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
    text-align: center;
}
</style>