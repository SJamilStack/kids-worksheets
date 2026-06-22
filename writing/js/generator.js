function pickStories(topic, count) {
  const source = STORIES[topic] || STORIES.pets;
  const pool = [...source];
  const picked = [];
  while (picked.length < count) {
    if (pool.length === 0) pool.push(...source);
    const idx = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

function applyName(sentences, name) {
  return sentences.map(s => s.replace(/\{name\}/g, name));
}

function buildLinesHTML(count) {
  return Array(count).fill(`
    <div class="writing-row">
      <div class="ln-top"></div>
      <div class="ln-mid"></div>
      <div class="ln-bot"></div>
    </div>`).join('');
}

function generateWorksheet(topic, name, pageCount, lineCount) {
  return pickStories(topic, pageCount)
    .map((sentences, i) => {
      const named = applyName(sentences, name);
      const paras = named.map(s => `<p class="story-para">${s}</p>`).join('');
      return `
        <div class="worksheet-page">
          <div class="page-num">Page ${i + 1}</div>
          <div class="story-block">${paras}</div>
          <div class="lines-block">${buildLinesHTML(lineCount)}</div>
        </div>`;
    }).join('');
}
