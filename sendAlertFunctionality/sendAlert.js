const WebSocket = require('ws');
const Friendship = require('./models/Friendship');

const organizations = {};

async function shouldAlert(senderId, receiverId) {
  const query = { user_id: senderId, friend_id: receiverId };
  const exists = await Friendship.findOne(query).lean();
  return !!exists;
}

function setupAlertHandlers(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    let userId;
    let orgId;

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);

        if (data.type === 'register') {
          userId = data.userId;
          orgId = data.orgId;

          if (!organizations[orgId]) organizations[orgId] = {};
          organizations[orgId][userId] = ws;

          console.log(`User ${userId} connected in org ${orgId}`);
        }

        if (data.type === 'sendAlert') {
          const senderId = data.userId;
          const senderOrg = data.orgId;

          if (!organizations[senderOrg]) return;

          console.log(`User ${senderId} sent an alert in org ${senderOrg}`);

          for (const [friendId, friendSocket] of Object.entries(organizations[senderOrg])) {
            if (friendId !== senderId && await shouldAlert(senderId, friendId)) {
              try {
                friendSocket.send(JSON.stringify({
                  type: 'alert',
                  from: senderId,
                  message: 'You have a new alert from your colleague!'
                }));
              } catch (err) {
                console.error(`Failed to alert ${friendId}:`, err);
              }
            }
          }
        }
      } catch (err) {
        console.error('Invalid message received:', err);
      }
    });

    ws.on('close', () => {
      if (userId && orgId && organizations[orgId]) {
        delete organizations[orgId][userId];
        console.log(`User ${userId} disconnected from org ${orgId}`);
        if (Object.keys(organizations[orgId]).length === 0) {
          delete organizations[orgId];
        }
      }
    });
  });
}

module.exports = setupAlertHandlers;
