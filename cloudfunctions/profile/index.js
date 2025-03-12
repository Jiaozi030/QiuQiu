'use strict';
const db = uniCloud.database();
const collection = db.collection('profile');

export default async function main(event, context) {
    const { profile } = event;
    
    try {
        // 检查是否已存在该用户
        const res = await collection.where({
            nickname: profile.nickname
        }).get();
        
        if (res.data.length > 0) {
            // 如果存在则更新
            await collection.doc(res.data[0]._id).update(profile);
            return {
                code: 200,
                message: '用户信息更新成功'
            };
        } else {
            // 如果不存在则新增
            await collection.add(profile);
            return {
                code: 200,
                message: '用户信息添加成功'
            };
        }
    } catch (err) {
        return {
            code: 500,
            message: '服务器错误',
            error: err
        };
    }
} 