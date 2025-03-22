'use strict';
const ws = require('ws');

exports.main = async (event, context) => {
  const wss = new ws.Server({ noServer: true });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      // 广播消息给所有客户端
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === ws.OPEN) {
          client.send(message);
        }
      });
    });
  });

  return {
    code: 200,
    message: 'WebSocket 服务已启动',
  };
};