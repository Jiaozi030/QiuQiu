import { sampleTags } from './sampleTags.js';

export const sampleProfile = {
    avatar: '/static/default/logo.png',
    photoAlbum: ['/static/default/logo.png', '/static/default/logo.png', '/static/default/logo.png'],
    nickname: '饺子',
    gender: '女',
    birthDate: '2004-01-01',
    height: 172,
    weight: 63,
    currentCity: '杭州',
    hometown: '武汉',
    maritalStatus: '未婚',
    selfIntroduction: '我是一个热爱生活、积极向上的人，喜欢旅行和摄影。',
    education: '本科',
    annualIncome: '20万',
    occupation: '程序员',
    housing: '自有住房',
    hasCar: true,
    tags: sampleTags.tags.slice(0, 10), // 取前 10 个标签
    hobbies: sampleTags.hobbies.slice(0, 10), // 取前 10 个兴趣
    expectation: sampleTags.expectations.slice(0, 10).join('、'), // 取前 10 个期望对象
}
