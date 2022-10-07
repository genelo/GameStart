const db = require('../connection.js');

module.exports.getConversation = async (conversationId) => {
  let client = await db.connect();
  let res = await client.query(`SELECT * FROM messages WHERE conversationID=${conversationId} order by created_at desc`);
  client.release();
  return res.rows;
};

module.exports.getConversationId = async (tradeId) => {
  let client = await db.connect();
  let res = await client.query(`SELECT id FROM messages WHERE tradeId=${tradeId}`);
  client.release();
  return res.rows;
};

module.exports.postMessage = async (message) => {
  let client = await db.connect();
  let res = await client.query('INSERT INTO messages (body, username, conversationID) VALUES ($1, $2, $3) RETURNING id', [message.body, message.username, message.conversationId]);
  client.release();
  return res.rows;
};

module.exports.createConversation = async (tradeId) => {
  let client = await db.connect();
  let res = await client.query('INSERT INTO conversations (tradeId) VALUES ($1) RETURNING id', [tradeId]);
  client.release();
  return res.rows;
}

