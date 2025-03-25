const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Add message
router.post('/', async (req, res) => {
  const message = await Message.create(req.body);
  res.json({ message: 'Message received', messageData: message });
});

// Get all messages
router.get('/', async (req, res) => {
  const messages = await Message.findAll();
  res.json(messages);
});

module.exports = router;
