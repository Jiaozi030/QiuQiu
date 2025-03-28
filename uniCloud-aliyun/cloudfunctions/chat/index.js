'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
    const { userId } = event;

    if (!userId) {
        return {
            code: 400,
            message: '缺少 userId 参数'
        };
    }

    try {
        // 查询当前用户参与的聊天
        const chats = await db.collection('chat')
            .where({
                userIds: userId // 查询包含当前用户的聊天
            })
            .orderBy('createdAt', 'desc')
            .get();

        const chatData = chats.data;

        // 如果没有聊天记录，直接返回
        if (chatData.length === 0) {
            return {
                code: 200,
                message: '暂无聊天记录',
                data: []
            };
        }

        // 遍历聊天记录，查询聊天对象信息和最新消息
        const result = await Promise.all(chatData.map(async (chat) => {
            // 获取聊天对象的 ID
            const otherUserId = chat.userIds.find(id => id !== userId);

            if (!otherUserId) {
                return null; // 如果没有找到聊天对象，跳过该聊天
            }

            // 查询聊天对象的头像和昵称
            const otherUser = await db.collection('profile')
                .where({
                    _id: otherUserId
                })
                .get();

            const userInfo = otherUser.data[0] || {};

            // 查询该聊天的最新消息
            const latestMessage = await db.collection('message')
                .where({
                    chatId: chat._id
                })
                .orderBy('createdAt', 'desc') // 按消息发送时间降序排列
                .limit(1) // 只取最新的一条消息
                .get();

            const messageInfo = latestMessage.data[0] || {};

            // 返回聊天信息
            return {
                chatId: chat._id,
                avatar: userInfo.avatar || '/static/default/logo.png', // 默认头像
                username: userInfo.nickname || '未知用户', // 默认昵称
                latestMessage: messageInfo.content || '暂无消息', // 最新消息内容
                time: messageInfo.createdAt || chat.createdAt // 消息时间或聊天创建时间
            };
        }));

        // 过滤掉无效的聊天记录
        const filteredResult = result.filter(item => item !== null);

        return {
            code: 200,
            message: '获取聊天列表成功',
            data: filteredResult
        };
    } catch (error) {
        console.error('获取聊天列表失败:', error);
        return {
            code: 500,
            message: '获取聊天列表失败',
            error: error.message
        };
    }
};