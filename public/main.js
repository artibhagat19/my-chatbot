const botui = new BotUI('bot');
let decisionTree = {};
let history = [];

fetch('/bot-logic/decision-tree.json')
  .then(res => res.json())
  .then(data => {
    decisionTree = data;
    showNode('start');
  });

function showNode(nodeKey) {
  const node = decisionTree[nodeKey];
  if (!node) return;

  if (nodeKey !== 'back') {
    history.push(nodeKey);
  }

  botui.message.add({ content: node.message }).then(() => {
    const buttons = node.options.map(opt => ({
      text: opt.label,
      value: opt.next
    }));

    if (history.length > 1) {
      buttons.push({ text: '🔙 Back', value: 'back' });
    }

    return botui.action.button({ action: buttons });
  }).then(res => {
    if (res.value === 'back') {
      history.pop();
      const previous = history.pop();
      showNode(previous);
    } else {
      showNode(res.value);
    }
  });
}
