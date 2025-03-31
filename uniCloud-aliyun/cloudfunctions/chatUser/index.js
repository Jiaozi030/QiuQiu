'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
    const { chatId } = event;

    if (!chatId) {
        return {
            code: 400,
            message: '缺少 chatId 参数'
        };
    }

    try {
        // 查询聊天记录，获取聊天双方的 userIds
        const chat = await db.collection('chat')
            .doc(chatId)
            .get();

        if (chat.data.length === 0) {
            return {
                code: 404,
                message: '未找到聊天记录'
            };
        }

        const userIds = chat.data[0].userIds;

        const currentUserId = "67d16f8ae0ec19c842704b02";
        const otherUserId = userIds.find(id => id !== currentUserId);

        if (!otherUserId) {
            return {
                code: 404,
                message: '未找到聊天对象'
            };
        }

        // 查询聊天对象的用户信息
        const otherUser = await db.collection('profile')
            .doc(otherUserId)
            .get();

        if (otherUser.data.length === 0) {
            return {
                code: 404,
                message: '未找到聊天对象的用户信息'
            };
        }

        const userInfo = otherUser.data[0];

        return {
            code: 200,
            message: '获取聊天对象信息成功',
            data: {
                userId: userInfo._id,
                username: userInfo.nickname,
                avatar: userInfo.avatar
            }
        };
    } catch (error) {
        return {
            code: 500,
            message: '获取聊天对象信息失败',
            error: error.message
        };
    }
};