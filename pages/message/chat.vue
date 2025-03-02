<template>
    <view class="chat-page">
        <!-- 聊天头部 -->
        <view class="chat-header">
            <image :src="user.avatar" class="avatar" />
            <text class="username">{{ user.username }}</text>
        </view>

        <!-- 聊天内容 -->
        <view class="chat-content">
            <view
                v-for="(message, index) in chatMessages"
                :key="index"
                :class="['chat-message', message.isMe ? 'me' : 'other']"
            >
                <text class="message-text">{{ message.text }}</text>
                <text class="message-time">{{ message.time }}</text>
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
import { sampleMessages } from '@/data/sampleMessages.js';

export default {
    data() {
        return {
            user: {
                userId: '',
                username: '',
                avatar: '',
            },
            inputMessage: '', // 输入的消息
            chatMessages: [], // 聊天记录
        };
    },
    onLoad(options) {
        // 接收传递的用户信息
        this.user.userId = options.userId;
        this.user.username = decodeURIComponent(options.username); // 解码用户名
        this.user.avatar = decodeURIComponent(options.avatar); // 解码头像路径

        // 加载聊天记录
        const message = sampleMessages.find((msg) => msg.userId === options.userId);
        if (message) {
            this.chatMessages = message.messages; // 加载完整的聊天记录
        }
    },
    methods: {
        // 发送消息
        sendMessage() {
            if (this.inputMessage.trim()) {
                this.chatMessages.push({
                    text: this.inputMessage,
                    time: new Date().toLocaleTimeString(),
                    isMe: true, // 标记为当前用户发送的消息
                });
                this.inputMessage = ''; // 清空输入框
            }
        },
    },
};
</script>

<style>
.chat-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.chat-header {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.username {
    font-size: 16px;
    font-weight: bold;
    margin-left: 10px;
}

.chat-content {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.chat-message {
    margin-bottom: 10px;
    max-width: 70%;
    padding: 10px;
    border-radius: 8px;
    position: relative;
}

.chat-message.me {
    background-color: #007aff;
    color: #fff;
    align-self: flex-end;
}

.chat-message.other {
    background-color: #f0f0f0;
    color: #333;
    align-self: flex-start;
}

.message-text {
    font-size: 14px;
}

.message-time {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
}

.chat-input {
    display: flex;
    align-items: flex-end;
    padding: 10px;
    border-top: 1px solid #eee;
    background-color: #fff;
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
    background-color: #007aff;
    color: #fff;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
    height: 40px;
    flex-shrink: 0;
}
</style>
