/* ══════════════════════════════════════
   NADINE IBRAHIM — Portfolio Script v3
   ══════════════════════════════════════ */

/* ── LOADER ── */
(function () {
  var loader = document.getElementById('loader');
  var bar = document.getElementById('loaderBar');
  var status = document.getElementById('loaderStatus');
  if (!loader || !bar || !status) return;

  var steps = [
    [14, 'Initialisation...'],
    [33, 'Chargement des modules...'],
    [58, 'Configuration des effets...'],
    [79, 'Sécurisation de l’interface...'],
    [100, 'Prêt.']
  ];

  var i = 0;
  function nextStep() {
    if (i >= steps.length) {
      setTimeout(function () {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(function () { loader.remove(); }, 500);
      }, 180);
      return;
    }
    bar.style.width = steps[i][0] + '%';
    status.textContent = steps[i][1];
    i++;
    setTimeout(nextStep, 240);
  }
  nextStep();
})();

/* ── HEADER SCROLL ── */
(function () {
  var header = document.getElementById('site-header');
  if (!header) return;
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── BURGER MENU ── */
(function () {
  var btn = document.getElementById('burgerBtn');
  var menu = document.getElementById('navMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ── SCROLL PROGRESS ── */
(function () {
  var bar = document.getElementById('scroll-progress');
  if (!bar) return;
  function update() {
    var doc = document.documentElement;
    var total = doc.scrollHeight - doc.clientHeight;
    var pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
})();

/* ── CUSTOM CURSOR ── */
(function () {
  var outer = document.getElementById('cursor-outer');
  var inner = document.getElementById('cursor-inner');
  if (!outer || !inner || window.matchMedia('(pointer: coarse)').matches) return;

  var x = window.innerWidth / 2, y = window.innerHeight / 2;
  var ox = x, oy = y;

  window.addEventListener('mousemove', function (e) {
    x = e.clientX; y = e.clientY;
    inner.style.left = x + 'px';
    inner.style.top = y + 'px';
  });

  function follow() {
    ox += (x - ox) * 0.16;
    oy += (y - oy) * 0.16;
    outer.style.left = ox + 'px';
    outer.style.top = oy + 'px';
    requestAnimationFrame(follow);
  }
  follow();

  var hoverables = document.querySelectorAll('a, button, .tilt, .skill-tag, .project-card, .cert-card, .timeline-card');
  hoverables.forEach(function (el) {
    el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
  });
})();

/* ── REVEAL ON SCROLL ── */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  els.forEach(function (el) { io.observe(el); });
})();

/* ── ACTIVE NAV LINK ── */
(function () {
  var links = Array.from(document.querySelectorAll('.nav-link'));
  var sections = links.map(function (a) {
    var id = a.getAttribute('href');
    return id && id.startsWith('#') ? document.querySelector(id) : null;
  }).filter(Boolean);

  function setActive() {
    var scrollPos = window.scrollY + window.innerHeight * 0.28;
    var currentId = '#hero';
    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop) currentId = '#' + sec.id;
    });
    links.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === currentId);
    });
  }
  setActive();
  window.addEventListener('scroll', setActive, { passive: true });
})();

/* ── COUNT-UP NUMBERS ── */
(function () {
  var nums = document.querySelectorAll('.mini-num[data-target]');
  if (!nums.length) return;

  function animate(el) {
    var target = +el.getAttribute('data-target') || 0;
    var duration = 1100;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .65 });

  nums.forEach(function (n) { io.observe(n); });
})();

/* ── MAGNETIC BUTTONS ── */
(function () {
  document.querySelectorAll('.magnetic').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var x = e.clientX - r.left - r.width / 2;
      var y = e.clientY - r.top - r.height / 2;
      btn.style.transform = 'translate(' + (x * 0.12) + 'px,' + (y * 0.18) + 'px)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });
})();

/* ── TILT CARDS ── */
(function () {
  var maxTilt = 7;
  document.querySelectorAll('.tilt').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      var rx = (0.5 - py) * maxTilt;
      var ry = (px - 0.5) * maxTilt;
      card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-2px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();

/* ── CONTACT FORM UX ── */
(function () {
  var form = document.getElementById('contactForm');
  var success = document.getElementById('cf-success');
  var resetBtn = document.getElementById('cf-reset');
  if (!form || !success) return;

  function markInvalid(input, invalid) {
    input.style.borderColor = invalid ? 'rgba(248,113,113,.65)' : '';
    input.style.boxShadow = invalid ? '0 0 0 5px rgba(248,113,113,.08)' : '';
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('cf-name');
    var email = document.getElementById('cf-email');
    var subject = document.getElementById('cf-subject');
    var message = document.getElementById('cf-message');
    var ok = true;

    [name, email, subject, message].forEach(function (el) { markInvalid(el, false); });

    if (!name.value.trim()) { markInvalid(name, true); ok = false; }
    if (!validEmail(email.value.trim())) { markInvalid(email, true); ok = false; }
    if (!subject.value.trim()) { markInvalid(subject, true); ok = false; }
    if (message.value.trim().length < 10) { markInvalid(message, true); ok = false; }
    if (!ok) return;

    success.style.display = 'flex';
    success.setAttribute('aria-hidden', 'false');
    form.setAttribute('aria-hidden', 'true');
    form.style.opacity = '0';
    form.style.pointerEvents = 'none';
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      form.style.opacity = '1';
      form.style.pointerEvents = 'auto';
      form.setAttribute('aria-hidden', 'false');
      success.style.display = 'none';
      success.setAttribute('aria-hidden', 'true');
    });
  }
})();

/* ── HACKER NEWS LIVE FEED ── */
(function () {
  var feedEl = document.getElementById('hn-feed');
  var refreshBtn = document.getElementById('hn-refresh');
  if (!feedEl) return;

  var PROXY = 'https://api.allorigins.win/raw?url=';
  var HN_TOP = 'https://hacker-news.firebaseio.com/v0/topstories.json';
  var HN_ITEM = 'https://hacker-news.firebaseio.com/v0/item/';

  function fetchJSON(url) {
    return fetch(PROXY + encodeURIComponent(url)).then(function(r){ return r.json(); });
  }

  function renderLoading() {
    feedEl.innerHTML = '<div class="hn-loading"><div class="hn-spinner"></div><span>Chargement du flux…</span></div>';
  }

  function renderError() {
    feedEl.innerHTML = '<p class="hn-error">Impossible de charger le flux. Vérifiez votre connexion.</p>';
  }

  function renderFeed(stories) {
    if (!stories || stories.length === 0) { renderError(); return; }
    var ul = document.createElement('ul');
    ul.className = 'hn-list';
    stories.forEach(function(s) {
      if (!s || !s.title) return;
      var li = document.createElement('li');
      li.className = 'hn-item';
      var score = document.createElement('span');
      score.className = 'hn-score';
      score.textContent = '▲ ' + (s.score || 0);
      var titleEl;
      if (s.url) {
        titleEl = document.createElement('a');
        titleEl.className = 'hn-title-link';
        titleEl.href = s.url;
        titleEl.target = '_blank';
        titleEl.rel = 'noopener noreferrer';
        titleEl.textContent = s.title;
      } else {
        titleEl = document.createElement('span');
        titleEl.className = 'hn-title-text';
        titleEl.textContent = s.title;
      }
      li.appendChild(score);
      li.appendChild(titleEl);
      ul.appendChild(li);
    });
    feedEl.innerHTML = '';
    feedEl.appendChild(ul);
  }

  function loadFeed() {
    renderLoading();
    if (refreshBtn) {
      refreshBtn.classList.add('spinning');
      setTimeout(function(){ refreshBtn.classList.remove('spinning'); }, 600);
    }
    fetchJSON(HN_TOP)
      .then(function(ids) {
        var top10 = ids.slice(0, 10);
        return Promise.all(top10.map(function(id) {
          return fetchJSON(HN_ITEM + id + '.json');
        }));
      })
      .then(function(stories) {
        renderFeed(stories.filter(function(s){ return s && s.title; }));
      })
      .catch(function() { renderError(); });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', loadFeed);
  }

  loadFeed();
})();
