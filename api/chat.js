import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { node } = req.body;

    const filePath = path.resolve('./bot-logic/decision-tree.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const decisionTree = JSON.parse(fileData);

    const responseNode = decisionTree[node];

    if (!responseNode) {
      return res.status(404).json({ message: "Node not found", options: [] });
    }

    res.status(200).json({
      message: responseNode.message,
      options: responseNode.options || []
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
