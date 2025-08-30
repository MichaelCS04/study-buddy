
// quotes.js — Drop-in "Random Quote/Fact" widget (no dependencies)
(function(){
  // ---- Config ----
  const ITEMS = [
    { text: 'Small steps every day add up to big results.', source: 'Unknown', type: 'quote' },
    { text: 'Learning is a treasure that will follow its owner everywhere.', source: 'Chinese Proverb', type: 'quote' },
    { text: 'The secret of getting ahead is getting started.', source: 'Mark Twain', type: 'quote' },
    { text: 'Practice makes progress, not perfection.', source: 'Unknown', type: 'quote' },
    { text: 'Success is the sum of small efforts repeated day in and day out.', source: 'R. Collier', type: 'quote' },
    { text: 'Your limitation—it’s only your imagination.', source: 'Unknown', type: 'quote' },
    { text: 'Dream big and dare to fail.', source: 'Norman Vaughan', type: 'quote' },
    { text: 'Feedback is a gift; reflect and improve.', source: 'Unknown', type: 'quote' },
    // Facts
    { text: 'Short study breaks (5–10 min per hour) can boost focus and retention.', source: 'Learning science', type: 'fact' },
    { text: 'Active recall beats rereading: quiz yourself to learn faster.', source: 'Learning science', type: 'fact' },
    { text: 'Spaced repetition helps move knowledge into long‑term memory.', source: 'Learning science', type: 'fact' },
    { text: 'Writing by hand can improve concept recall vs. typing for some learners.', source: 'Learning science', type: 'fact' }
  ];

  // Optional: choose what to show: 'all' | 'quote' | 'fact'
  const MODE = 'all';

  // ---- Utility ----
  function pick(list, lastIndex){
    if(list.length <= 1) return 0;
    let i = Math.floor(Math.random() * list.length);
    while(i === lastIndex) i = Math.floor(Math.random() * list.length);
    return i;
  }

  function filterItems(mode){
    if(mode === 'all') return ITEMS;
    return ITEMS.filter(x => x.type === mode);
  }

  // ---- Render ----
  function mount(){
    const data = filterItems(MODE);
    if(!data.length) return;

    const box = document.createElement('section');
    box.setAttribute('data-widget', 'sb-quote');
    box.style.maxWidth = '720px';
    box.style.margin = '1.25rem auto';
    box.style.padding = '1rem 1.25rem';
    box.style.border = '1px solid rgba(0,0,0,.08)';
    box.style.borderRadius = '12px';
    box.style.background = 'rgba(255,255,255,.9)';
    box.style.boxShadow = '0 6px 20px rgba(0,0,0,.06)';

    const title = document.createElement('div');
    title.textContent = '💡 Quick Boost';
    title.style.fontWeight = '700';
    title.style.margin = '0 0 .5rem';
    title.style.opacity = '.9';

    const textEl = document.createElement('blockquote');
    textEl.style.margin = '0';
    textEl.style.fontSize = '1.05rem';
    textEl.style.lineHeight = '1.5';

    const cite = document.createElement('cite');
    cite.style.display = 'block';
    cite.style.marginTop = '.5rem';
    cite.style.opacity = '.75';

    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.gap = '.5rem';
    row.style.alignItems = 'center';
    row.style.marginTop = '.75rem';

    const pill = document.createElement('span');
    pill.style.fontSize = '.75rem';
    pill.style.padding = '.25rem .6rem';
    pill.style.borderRadius = '999px';
    pill.style.background = '#D4EAC8';
    pill.style.color = '#384845';
    pill.style.userSelect = 'none';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Show another';
    btn.style.marginLeft = 'auto';
    btn.style.border = 'none';
    btn.style.padding = '.55rem .85rem';
    btn.style.borderRadius = '8px';
    btn.style.cursor = 'pointer';
    btn.style.background = '#56A3A6';
    btn.style.color = 'white';

    row.append(pill, btn);
    box.append(title, textEl, cite, row);

    // Insert right after <nav> if present, else at top of <body>
    const anchor = document.querySelector('nav') || document.body;
    anchor.insertAdjacentElement(anchor.tagName.toLowerCase() === 'nav' ? 'afterend' : 'afterbegin', box);

    // Logic
    let last = -1;
    function render(){
      const i = pick(data, last);
      last = i;
      const item = data[i];
      textEl.textContent = item.text;
      cite.textContent = item.source ? '— ' + item.source : '';
      pill.textContent = item.type === 'fact' ? 'FACT' : 'QUOTE';
    }
    btn.addEventListener('click', render);
    render();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
