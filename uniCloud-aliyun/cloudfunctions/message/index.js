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
        const messages = await db.collection('message')
        .where({ chatId })
        .orderBy('createdAt', 'asc')
        .get();

        return {
            code: 200,
            message: '获取消息成功',
            data: messages.data
        };
    } catch (error) {
        return {
            code: 500,
            message: '获取消息失败',
            error: error.message
        };
    }
};