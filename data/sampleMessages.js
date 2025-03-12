// 生成递增的 id 和用户名，以及不同的消息内容
export const sampleMessages = Array.from({ length: 10 }, (_, index) => {
    const id = index + 1; // id 从 1 开始递增
    const username = `用户${id}`; // 用户名从 "用户1" 开始递增
    const messages = [
        { text: '你好！', time: '10:00', isMe: false },
        { text: '最近怎么样？', time: '10:01', isMe: true },
        { text: '还不错，你呢？', time: '10:02', isMe: false },
        { text: '我也很好，谢谢！', time: '10:03', isMe: true },
    ];
    const latestMessage = messages[messages.length - 1].text; // 最新一条消息
    const time = messages[messages.length - 1].time; // 最新消息时间

    return {
        userId: id.toString(),
        username,
        avatar: '/static/default/logo.png',
        latestMessage,
        time,
        messages, // 完整的聊天记录
    };
});