<template>
    <view class="post-page">
        <view class="post-input">
            <textarea v-model="postContent" placeholder="分享你的想法..." />
            <button @click="addPost">发帖</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            postContent: '', // 发帖内容
        };
    },
    methods: {
        // 发帖
        async addPost() {
            try {
                const res = await uniCloud.callFunction({
                    name: 'post',
                    data: {
                        action: 'addPost',
                        userId: '67d16f8ae0ec19c842704b02', // 当前用户的 _id
                        content: this.postContent,
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
}

.post-input {
    margin-bottom: 15px;
}

.post-input textarea {
    width: 100%;
    height: 200px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}

.post-input button {
    padding: 10px 20px;
    background-color: #ff6b81;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
</style>