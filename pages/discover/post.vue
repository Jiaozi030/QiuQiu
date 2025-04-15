<template>
    <view class="post-page">
        <view class="post-input">
            <textarea v-model="postContent" placeholder="分享你的想法..." />
        </view>
        <view class="post-images">
            <view v-for="(image, index) in postImages" :key="index" class="image-preview">
                <image :src="image" mode="aspectFill" />
                <button @click="removeImage(index)">删除</button>
            </view>
            <button @click="chooseImage">上传图片</button>
        </view>
        <button @click="addPost">发帖</button>
    </view>
</template>

<script>
export default {
    data() {
        return {
            postContent: '', // 发帖内容
            postImages: [], // 上传的图片路径
        };
    },
    methods: {
        // 选择图片
        async chooseImage() {
            try {
                const res = await uni.chooseImage({
                    count: 3, // 最多选择3张图片
                    sizeType: ['compressed'], // 压缩图
                    sourceType: ['album', 'camera'], // 从相册或拍照
                });
                this.postImages = this.postImages.concat(res.tempFilePaths); // 添加到图片数组
            } catch (err) {
                console.error('选择图片失败:', err);
            }
        },
        // 删除图片
        removeImage(index) {
            this.postImages.splice(index, 1); // 删除指定图片
        },
        // 发帖
        async addPost() {
            try {
                const res = await uniCloud.callFunction({
                    name: 'post',
                    data: {
                        action: 'addPost',
                        userId: '67d16f8ae0ec19c842704b02', // 当前用户的 _id
                        content: this.postContent,
                        images: this.postImages, // 上传的图片路径
                    },
                });

                if (res.result.code === 200) {
                    uni.showToast({
                        title: '发帖成功',
                        icon: 'none',
                    });
                    uni.navigateBack(); // 返回上一页
                } else {
                    uni.showToast({
                        title: '发帖失败',
                        icon: 'none',
                    });
                }
            } catch (err) {
                console.error('发帖失败:', err);
                uni.showToast({
                    title: '发帖失败',
                    icon: 'none',
                });
            }
        },
    },
};
</script>

<style>
.post-page {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center; /* 居中对齐 */
}

.post-input {
    margin-bottom: 15px;
    width: 85%; /* 设置宽度为 85% */
}

.post-input textarea {
    width: 100%; /* 占满父容器宽度 */
    height: 200px;
    border: 1px solid #12836b;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}

.post-images {
    margin-bottom: 15px;
    width: 85%; /* 设置宽度为 85% */
    display: flex;
    flex-wrap: wrap; /* 图片换行显示 */
    justify-content: center; /* 居中对齐 */
}

.image-preview {
    position: relative;
    margin: 5px;
}

.image-preview image {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin-right: 10px;
}

.image-preview button {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: #fb93a2;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
}

.post-input button,
.post-images button {
    padding: 8px 16px; /* 调整按钮大小 */
    background-color: #64b9c1; /* 蓝色背景 */
    color: #ffffff; /* 白色文字 */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px; /* 增加按钮间距 */
    width: auto; /* 按钮宽度自适应内容 */
}

.post-input button:hover,
.post-images button:hover {
    background-color: #65a1d3; /* 鼠标悬停时的深蓝色 */
}

</style>