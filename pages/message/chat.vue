<template>
    <view class="chat-page">
        <!-- 聊天头部 -->
        <view class="chat-header">
            <image :src="user.avatar" class="avatar" />
            <text class="username">{{ user.username }}</text>
        </view>

        <!-- 聊天内容 -->
        <view class="message-list">
            <view
                v-for="(message, index) in messages"
                :key="index"
                :class="['message-item', message.senderId === currentUserId ? 'message-right' : 'message-left']"
            >
                <image :src="message.avatar" class="avatar" />
                <view class="message-content">
                    <text class="message-text">{{ message.content }}</text>
                    <text class="message-time">{{ message.time }}</text>
                </view>
            </view>
        </view>

        <!-- 输入框 -->
        <view class="chat-input">
            <textarea
                v-model="inputMessage"
                placeholder="输入消息..."
                class="input-box"
                @confirm="sendMessage"
            />
            <button @click="sendMessage" class="send-button">发送</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            currentUserId: '67d16f8ae0ec19c842704b02', // 当前用户 ID
            user: {
                userId: '',
                username: '',
                avatar: ''
            },
            messages: [], // 聊天记录
            inputMessage: '' // 输入框内容
        };
    },
    onLoad(options) {
        const chatId = options.chatId; // 获取传递的 chatId 参数
        this.fetchChatUser(chatId); // 查询聊天对象信息
        this.fetchMessages(chatId); // 查询聊天记录
    },
    methods: {
        async fetchChatUser(chatId) {
            try {
                const res = await uniCloud.callFunction({
                    name: 'chatUser', // 云函数名称
                    data: { chatId }
                });

                if (res.result.code === 200) {
                    console.log('获取聊天对象信息成功:', res.result.data); // 添加日志检查返回数据
                    this.user = {
                        userId: res.result.data.userId,
                        username: res.result.data.username || '未知用户',
                        avatar: res.result.data.avatar || '/static/default/logo.png'
                    };
                } else {
                    console.error('获取聊天对象信息失败:', res.result.message);
                }
            } catch (error) {
                console.error('获取聊天对象信息失败:', error);
            }
        }, 
        async fetchMessages(chatId) {
            try {
                const res = await uniCloud.callFunction({
                    name: 'message', // 云函数名称
                    data: { chatId }
                });

                if (res.result.code === 200) {
                    this.messages = res.result.data.map(message => ({
                        senderId: message.senderId,
                        content: message.content,
                        avatar: message.avatar || '/static/default/logo.png', // 设置默认头像
                        time: new Date(message.createdAt).toLocaleString()
                    }));
                } else {
                    console.error('云函数返回错误:', res.result.message);
                }
            } catch (error) {
                console.error('获取消息失败:', error);
            }
        },
        async sendMessage() {
            // 发送消息逻辑
        }
    }
};
</script>

<style>
.chat-page {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100vh;
}

.chat-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.username {
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
}

.message-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
}

.message-item {
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 70%; /* 限制消息框的最大宽度 */
}

.message-left {
    flex-direction: row; /* 左侧消息 */
}

.message-right {
    flex-direction: row-reverse; /* 右侧消息 */
    align-self: flex-end; /* 右对齐 */
}

.message-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.message-right .message-content {
    background-color: #d1e7ff; /* 右侧消息的背景色 */
}

.message-text {
    font-size: 14px;
    color: #333;
}

.message-time {
    font-size: 12px;
    color: #999;
}

.chat-input {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #eee;
    background-color: #fff;
    position: sticky; /* 确保输入框固定在底部 */
    bottom: 0; /* 定位到页面底部 */
}

.input-box {
    flex: 1;
    padding: 8px;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-right: 10px;
    font-size: 14px;
    line-height: 1.5;
    min-height: 10px;
    max-height: 120px;
    overflow-y: auto;
    resize: none;
    box-sizing: border-box;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.send-button {
    padding: 6px 12px;
    background-color: #1973d3;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    line-height: 28px;
    height: 40px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
