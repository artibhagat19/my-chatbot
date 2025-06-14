const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  if (req.method === 'POST') {
    const body = req.body;
    const filePath = path.join(process.cwd(), 'bot-logic', 'decision-tree.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const node = data[body.node];

    if (!node) {
      return res.status(400).json({ message: 'Invalid node', options: [] });
    }

    res.status(200).json({
      message: node.message,
      options: node.options || []
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
