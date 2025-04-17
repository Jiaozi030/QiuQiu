'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
    const { userId, avatarUrl } = event;

    // 检查参数是否完整
    if (!userId || !avatarUrl) {
        return {
            code: 400,
            message: '缺少必要参数 userId 或 avatarUrl'
        };
    }

    try {
        // 更新 profile 表中对应用户的 avatarUrl 字段
        const res = await db.collection('profile')
            .doc(userId) // 根据用户 ID 定位文档
            .update({
                avatarUrl // 更新 avatarUrl 字段
            });

        // 检查更新结果
        if (res.updated === 1) {
            return {
                code: 200,
                message: '头像更新成功',
                data: {
                    userId,
                    avatarUrl
                }
            };
        } else {
            return {
                code: 404,
                message: '未找到对应的用户记录'
            };
        }
    } catch (error) {
        console.error('更新头像失败:', error);
        return {
            code: 500,
            message: '更新头像失败',
            error: error.message
        };
    }
};