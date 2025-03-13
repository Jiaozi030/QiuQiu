'use strict';
const db = uniCloud.database();
const collection = db.collection('post');

exports.main = async (event, context) => {
    const { action } = event;

    if (action === 'addPost') {
        try {
            const { userId, content, images } = event;
            const res = await collection.add({
                userId,
                content,
                images: images || [],
                createTime: Date.now(),
            });

            return {
                code: 200,
                message: '发帖成功',
                data: res.id,
            };
        } catch (err) {
            return {
                code: 500,
                message: '发帖失败',
                error: err,
            };
        }
    }

    if (action === 'getPosts') {
        try {
            const res = await collection.orderBy('createTime', 'desc').get();
            return {
                code: 200,
                data: res.data,
            };
        } catch (err) {
            return {
                code: 500,
                message: '获取帖子失败',
                error: err,
            };
        }
    }

    return {
        code: 400,
        message: '无效的操作',
    };
}; 