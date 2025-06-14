const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Serve decision tree JSON
app.get('/bot-logic/decision-tree.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'bot-logic', 'decision-tree.json'));
});

// Save chat history
app.post('/save-chat', (req, res) => {
  const chat = req.body;
  fs.writeFileSync('chat-history.json', JSON.stringify(chat, null, 2));
  res.json({ message: 'Chat saved' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
