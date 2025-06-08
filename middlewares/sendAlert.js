const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const db = require('./db');  // check

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users = new Map();

async function shouldAlert(senderId, receiverId) {
  
  const [rows] = await db.execute(
    'SELECT 1 FROM friendships WHERE user_id = ? AND friend_id = ? LIMIT 1',
    [senderId, receiverId]
  );
  return rows.length > 0;
}

wss.on('connection', (ws) => {
  let userId;

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'register') {
        userId = data.userId;
        users.set(userId, ws);
        console.log(`${userId} connected`);
      }

      if (data.type === 'sendAlert') {
        const senderId = data.userId;
        console.log(`${senderId} sent an alert`);

        for (const [friendId, friendSocket] of users.entries()) {
          if (friendId !== senderId && await shouldAlert(senderId, friendId)) {
            friendSocket.send(JSON.stringify({
              type: 'alert',
              from: senderId,
              message: 'You have a new alert from your friend!'
            }));
          }
        }
      }
    } catch (err) {
      console.error('Invalid message received:', err);
    }
  });

  ws.on('close', () => {
    if (userId) {
      users.delete(userId);
      console.log(`${userId} disconnected`);
    }
  });
});

server.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
