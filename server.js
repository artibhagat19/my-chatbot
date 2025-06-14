const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Load chatbot tree
const treePath = path.join(__dirname, 'bot-logic', 'decision-tree.json');
const decisionTree = JSON.parse(fs.readFileSync(treePath, 'utf8'));

// File to store chat history
const historyPath = path.join(__dirname, 'chat-history.json');

// Ensure the chat-history.json file exists
if (!fs.existsSync(historyPath)) {
  fs.writeFileSync(historyPath, JSON.stringify([]));
}

// Save chat history
function saveChat(userNode, botResponse) {
  const history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
  history.push({
    timestamp: new Date().toISOString(),
    userSelected: userNode,
    botMessage: botResponse.message,
    options: botResponse.options
  });
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));
}

// Chat endpoint
app.post('/api/chat', (req, res) => {
  const node = req.body.node;
  if (decisionTree[node]) {
    const response = {
      message: decisionTree[node].message,
      options: decisionTree[node].options
    };
    saveChat(node, response); // Save this interaction
    res.json(response);
  } else {
    res.status(404).json({ message: "Invalid node", options: [] });
  }
});

// (Optional) View saved chat history in browser
app.get('/api/history', (req, res) => {
  const history = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
  res.json(history);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
