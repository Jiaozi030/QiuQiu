'use strict';
const db = uniCloud.database();
const collection = db.collection('profile');

exports.main = async (event, context) => {
    const { action } = event;

    if (action === 'getProfileById') {
        try {
            const res = await collection.doc(event.id).get();
            console.log('获取到的用户数据:', res.data[0]); // 打印数据，检查 birthDate
            return {
                code: 200,
                data: res.data[0]
            };
        } catch (err) {
            return {
                code: 500,
                message: '获取数据失败',
                error: err
            };
        }
    }

    if (action === 'updateProfile') {
        try {
            const { id, profile } = event;
            // 只更新必要的字段，排除 birthDate
            const updateData = { ...profile };
            delete updateData.birthDate;
            await collection.doc(id).update(updateData);
            return {
                code: 200,
                message: '用户信息更新成功',
            };
        } catch (err) {
            return {
                code: 500,
                message: '服务器错误',
                error: err,
            };
        }
    }

    // 其他操作保持不变...
    const { profile } = event;
    
}; 