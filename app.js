(function () {
  var search = document.getElementById('project-search');
  var filters = document.getElementById('tag-filters');
  var empty = document.getElementById('no-results');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.project'));
  var activeTag = 'all';

  function apply() {
    var q = ((search && search.value) || '').trim().toLowerCase();
    var shown = 0;
    cards.forEach(function (card) {
      var tags = (card.getAttribute('data-tags') || '').split(' ');
      var text = card.textContent.toLowerCase();
      var tagOk = activeTag === 'all' || tags.indexOf(activeTag) !== -1;
      var qOk = !q || text.indexOf(q) !== -1;
      var visible = tagOk && qOk;
      card.hidden = !visible;
      if (visible) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }

  if (search) {
    search.addEventListener('input', apply);
    search.addEventListener('clear', apply);
  }

  if (filters) {
    filters.addEventListener('click', function (e) {
      var chip = e.target.closest('[data-tag]');
      if (!chip) return;
      activeTag = chip.getAttribute('data-tag');
      filters.querySelectorAll('[data-tag]').forEach(function (c) {
        c.toggleAttribute('data-active', c === chip);
      });
      apply();
    });
  }

  var toggle = document.getElementById('theme-toggle');
  var root = document.documentElement;
  var mq = window.matchMedia('(prefers-color-scheme: dark)');

  function setDark(on) {
    root.style.colorScheme = on ? 'dark' : 'light';
    if (toggle) toggle.checked = on;
  }

  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (_) {}
  setDark(saved ? saved === 'dark' : mq.matches);

  if (toggle) {
    toggle.addEventListener('change', function () {
      var on = !!toggle.checked;
      setDark(on);
      try { localStorage.setItem('theme', on ? 'dark' : 'light'); } catch (_) {}
    });
  }
})();
