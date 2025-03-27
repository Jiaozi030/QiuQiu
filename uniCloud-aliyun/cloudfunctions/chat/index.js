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
        const chats = await db.collection('chat')
        .where({ userIds: userId })
        .orderBy('createdAt', 'desc')
        .get();

        return {
            code: 200,
            message: '获取聊天列表成功',
            data: chats.data
        };
    } catch (error) {
        return {
            code: 500,
            message: '获取聊天列表失败',
            error: error.message
        };
    }
};