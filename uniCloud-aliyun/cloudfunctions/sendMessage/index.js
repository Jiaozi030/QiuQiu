'use strict';
const db = uniCloud.database();
const collection = db.collection('message');

exports.main = async (event, context) => {
    const { chatId, senderId, content } = event;

    if (!chatId || !senderId || !content) {
        return {
            code: 400,
            message: '参数缺失'
        };
    }

    try {
        // 插入消息到数据库
        const res = await collection.add({
            chatId, // 聊天会话 ID
            senderId, // 发送者 ID
            content, // 消息内容
            createdAt: new Date() // 消息发送时间
        });

        return {
            code: 200,
            message: '消息发送成功',
            data: res.id // 返回新消息的 ID
        };
    } catch (err) {
        return {
            code: 500,
            message: '消息发送失败',
            error: err
        };
    }
};