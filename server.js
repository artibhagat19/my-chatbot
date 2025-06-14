const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve bot logic JSON
app.get('/bot-logic/decision-tree.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'bot-logic', 'decision-tree.json'));
});

// Chat history API (optional)
app.get('/chat-history.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat-history.json'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
