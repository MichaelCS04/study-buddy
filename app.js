const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});
// ===== Random Facts / Quotes (always run for testing) =====
document.addEventListener('DOMContentLoaded', () => {
  // Quotes/facts list
  const QUOTES = [
    { text: 'Small steps every day add up to big results.', author: '— Unknown' },
    { text: 'Learning is a treasure that will follow its owner everywhere.', author: '— Chinese Proverb' },
    { text: 'The secret of getting ahead is getting started.', author: '— Mark Twain' },
    { text: 'Practice makes progress, not perfection.', author: '— Unknown' },
    { text: 'Success is the sum of small efforts repeated day in and day out.', author: '— R. Collier' },
    { text: 'Your limitation—it’s only your imagination.', author: '— Unknown' },
    { text: 'Dream big and dare to fail.', author: '— Norman Vaughan' },
    { text: 'Feedback is a gift; reflect and improve.', author: '— Unknown' },
  ];

  // Create elements dynamically
  const box = document.createElement('section');
  box.style.maxWidth = '680px';
  box.style.margin = '2rem auto';
  box.style.padding = '1rem 1.25rem';
  box.style.border = '1px solid rgba(0,0,0,.1)';
  box.style.borderRadius = '12px';
  box.style.background = 'rgba(0,0,0,.03)';

  const h2 = document.createElement('h2');
  h2.textContent = 'Quote of the Moment';
  h2.style.margin = '0 0 .5rem';

  const quoteEl = document.createElement('blockquote');
  quoteEl.style.fontStyle = 'italic';
  quoteEl.style.fontSize = '1.05rem';
  quoteEl.style.lineHeight = '1.5';

  const authorEl = document.createElement('cite');
  authorEl.style.display = 'block';
  authorEl.style.marginTop = '.5rem';
  authorEl.style.opacity = '0.8';

  const btn = document.createElement('button');
  btn.textContent = 'Show another';
  btn.style.marginTop = '1rem';
  btn.style.border = 'none';
  btn.style.padding = '.6rem .9rem';
  btn.style.borderRadius = '8px';
  btn.style.cursor = 'pointer';

  box.append(h2, quoteEl, authorEl, btn);

  // Place right after the navbar so it’s visible immediately
  const anchor = document.querySelector('nav') || document.body;
  anchor.insertAdjacentElement('afterend', box);

  // Quote logic
  let lastIdx = -1;
  function pickRandomIndex(except = -1) {
    if (QUOTES.length <= 1) return 0;
    let idx = Math.floor(Math.random() * QUOTES.length);
    while (idx === except) idx = Math.floor(Math.random() * QUOTES.length);
    return idx;
  }

  function renderQuote() {
    const idx = pickRandomIndex(lastIdx);
    lastIdx = idx;
    quoteEl.textContent = QUOTES[idx].text;
    authorEl.textContent = QUOTES[idx].author;
  }

  renderQuote();
  btn.addEventListener('click', renderQuote);
});