let activeTopic = 'pets';

// Topic selection
document.querySelectorAll('[data-topic]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-topic]').forEach(b => b.setAttribute('data-active', 'false'));
    btn.setAttribute('data-active', 'true');
    activeTopic = btn.dataset.topic;
  });
});
document.querySelector('[data-topic="pets"]').setAttribute('data-active', 'true');

// Generate
document.getElementById('btn-generate').addEventListener('click', handleGenerate);
document.getElementById('btn-print').addEventListener('click', () => window.print());

function handleGenerate() {
  const name      = document.getElementById('hero').value.trim() || 'Sam';
  const pageCount = parseInt(document.getElementById('pages').value);
  const lineCount = parseInt(document.getElementById('lines').value);
  const wrap      = document.getElementById('pages-wrap');

  wrap.innerHTML = generateWorksheet(activeTopic, name, pageCount, lineCount);

  // Stagger animation
  wrap.querySelectorAll('.worksheet-page').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(.34,1.56,.64,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 120);
  });

  document.getElementById('btn-print').classList.remove('hidden');
  document.getElementById('status').textContent = `✨ ${pageCount} pages ready for ${name}!`;

  if (typeof confetti === 'function') {
    const colors = ['#6366f1','#8b5cf6','#ec4899','#f59e0b','#10b981','#3b82f6'];
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 }, colors });
    setTimeout(() => {
      confetti({ particleCount: 40, spread: 60, angle: 60,  origin: { x: 0.1, y: 0.5 }, colors });
      confetti({ particleCount: 40, spread: 60, angle: 120, origin: { x: 0.9, y: 0.5 }, colors });
    }, 200);
  }

  setTimeout(() => wrap.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
}

handleGenerate();
