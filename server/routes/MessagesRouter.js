const messagesRouter = require('express').Router();
const controller = require('../controllers/messages.js');

messagesRouter.post('/', controller.postMessage);

messagesRouter.get('/converstaions/id/:tradeId', controller.getConversationId)

messagesRouter.get('/conversations/:conversationId', controller.getConversation);

messagesRouter.post('/conversations', controller.createConversation);

module.exports = messagesRouter;
