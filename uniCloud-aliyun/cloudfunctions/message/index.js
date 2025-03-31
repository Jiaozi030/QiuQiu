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

        // 查询发送者的头像
        const userIds = [...new Set(messages.data.map(msg => msg.senderId))];
        const users = await db.collection('profile')
            .where({
                _id: db.command.in(userIds)
            })
            .get();

        const userMap = users.data.reduce((map, user) => {
            map[user._id] = user.avatar || '/static/default/logo.png';
            return map;
        }, {});

        const enrichedMessages = messages.data.map(msg => ({
            ...msg,
            avatar: userMap[msg.senderId] || '/static/default/logo.png'
        }));

        return {
            code: 200,
            message: '获取消息成功',
            data: enrichedMessages
        };
    } catch (error) {
        return {
            code: 500,
            message: '获取消息失败',
            error: error.message
        };
    }
};