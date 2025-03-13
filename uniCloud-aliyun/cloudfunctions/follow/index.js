'use strict';
const db = uniCloud.database();
const collection = db.collection('follow');

exports.main = async (event, context) => {
    const { action, userId, followedUserId } = event;

    if (action === 'follow') {
        try {
            // 检查是否已经关注
            const res = await collection.where({
                userId: userId,
                followedUserId: followedUserId,
            }).get();

            if (res.data.length > 0) {
                return {
                    code: 400,
                    message: '已经关注过该用户',
                };
            }

            // 添加关注记录
            await collection.add({
                userId: userId,
                followedUserId: followedUserId,
            });

            return {
                code: 200,
                message: '关注成功',
            };
        } catch (err) {
            return {
                code: 500,
                message: '关注失败',
                error: err,
            };
        }
    }

    if (action === 'getFollowedUsers') {
        try {
            // 查询 follow 表，获取当前用户关注的用户 ID 列表
            const followRes = await collection.where({
                userId: userId,
            }).get();

            // 提取所有 followedUserId
            const followedUserIds = followRes.data.map(item => item.followedUserId);

            // 如果没有任何关注用户，直接返回空数组
            if (followedUserIds.length === 0) {
                return {
                    code: 200,
                    data: [],
                };
            }

            // 根据 followedUserId 查询 profile 表，获取用户信息
            const profileRes = await db.collection('profile').where({
                _id: db.command.in(followedUserIds),
            }).get();

            return {
                code: 200,
                data: profileRes.data,
            };
        } catch (err) {
            return {
                code: 500,
                message: '获取关注用户数据失败',
                error: err,
            };
        }
    }

    if (action === 'unfollow') {
        try {
            // 删除关注记录
            const res = await collection.where({
                userId: userId,
                followedUserId: followedUserId,
            }).remove();

            return {
                code: 200,
                message: '取消关注成功',
            };
        } catch (err) {
            return {
                code: 500,
                message: '取消关注失败',
                error: err,
            };
        }
    }

    if (action === 'checkFollow') {
        try {
            const res = await collection.where({
                userId: userId,
                followedUserId: followedUserId,
            }).get();

            return {
                code: 200,
                isFollowing: res.data.length > 0,
            };
        } catch (err) {
            return {
                code: 500,
                message: '检查关注状态失败',
                error: err,
            };
        }
    }

    return {
        code: 400,
        message: '无效的操作',
    };
};