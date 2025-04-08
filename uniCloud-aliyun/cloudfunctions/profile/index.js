'use strict';
const db = uniCloud.database();
const collection = db.collection('profile');

exports.main = async (event, context) => {
    const { action } = event;

    if (action === 'getProfilesByCity') {
        try {
            const { city } = event;
            console.log('查询城市:', city); // 打印传入的城市
            const res = await collection.where({
                city: city,
            }).get();
            console.log('查询结果:', res.data); // 打印查询结果
            return {
                code: 200,
                data: res.data,
            };
        } catch (err) {
            console.error('查询失败:', err); // 打印错误日志
            return {
                code: 500,
                message: '获取数据失败',
                error: err,
            };
        }
    }

    if (action === 'getProfileById') {
        try {
            const res = await collection.doc(event.id).get();
            console.log('获取到的用户数据:', res.data[0]); // 打印用户数据
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
            console.log('更新数据:', profile); // 打印更新数据
            const updateData = {
                ...profile,
            };
            const res = await collection.doc(id).update(updateData);
            console.log('更新结果:', res); // 打印更新结果
            return {
                code: 200,
                message: '用户信息更新成功',
            };
        } catch (err) {
            console.error('更新失败:', err); // 打印错误日志
            return {
                code: 500,
                message: '服务器错误',
                error: err,
            };
        }
    }

    if (action === 'getProfilesByGender') {
        try {
            const { gender } = event;
            const res = await collection.where({
                gender: gender, // 根据性别筛选
            }).get();
            return {
                code: 200,
                data: res.data,
            };
        } catch (err) {
            return {
                code: 500,
                message: '获取数据失败',
                error: err,
            };
        }
    }

    if (action === 'getProfilesByIds') {
        try {
            const { userIds } = event;
            const res = await db.collection('profile').where({
                _id: db.command.in(userIds),
            }).get();

            return {
                code: 200,
                data: res.data,
            };
        } catch (err) {
            return {
                code: 500,
                message: '获取用户信息失败',
                error: err,
            };
        }
    }

    // 其他操作保持不变...
    const { profile } = event;

};