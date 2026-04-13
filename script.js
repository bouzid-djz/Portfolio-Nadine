/* ══════════════════════════════════════
   NADINE IBRAHIM — Portfolio Script
   ══════════════════════════════════════ */

/* ── SLIDER : exposé AVANT DOMContentLoaded pour que onclick="..." marche ── */
var _slider = {
  slides: [],
  dots:   [],
  current: 0,
  init: function () {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.dots   = Array.from(document.querySelectorAll('.dot'));
    /* s'assurer que seul le premier slide est visible */
    this.slides.forEach(function (s, i) {
      s.style.display = i === 0 ? '' : 'none';
      if (i === 0) s.classList.add('active');
      else         s.classList.remove('active');
    });
    /* Générer les dots si le conteneur est vide */
    var dotsWrap = document.getElementById('sliderDots');
    if (dotsWrap && dotsWrap.children.length === 0) {
      this.slides.forEach(function (s, i) {
        var d = document.createElement('button');
        d.className = 'dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Projet ' + (i + 1));
        (function(idx){ d.addEventListener('click', function () { _slider.goTo(idx); }); })(i);
        dotsWrap.appendChild(d);
      });
      this.dots = Array.from(dotsWrap.querySelectorAll('.dot'));
    }
    if (this.dots[0]) this.dots[0].classList.add('active');
  },
  goTo: function (index) {
    if (!this.slides.length) return;
    var prev = this.current;
    this.current = ((index % this.slides.length) + this.slides.length) % this.slides.length;
    this.slides[prev].classList.remove('active');
    this.slides[prev].style.display = 'none';
    if (this.dots[prev]) this.dots[prev].classList.remove('active');
    this.slides[this.current].classList.add('active');
    this.slides[this.current].style.display = '';
    if (this.dots[this.current]) this.dots[this.current].classList.add('active');
  }
};

window.prevProject  = function () { _slider.goTo(_slider.current - 1); };
window.nextProject  = function () { _slider.goTo(_slider.current + 1); };
window.goToProject  = function (i) { _slider.goTo(i); };

/* ── ALIAS moveSlide (utilisé dans index.html via onclick="moveSlide(...)") ── */
window.moveSlide = function (dir) { _slider.goTo(_slider.current + dir); };

/* ── BTS SIO : DÉBOUCHÉS ── */
window.toggleDebouche = function (id) {
  var panel = document.getElementById('deb-' + id);
  var btn   = document.getElementById('btn-' + id);
  if (!panel) return;
  var open = panel.classList.toggle('open');
  if (btn) btn.textContent = 'Voir les débouchés ' + (open ? '▲' : '▼');
};

/* ── ALIAS toggleDeboucles (utilisé dans index.html via onclick="toggleDeboucles(...)") ── */
window.toggleDeboucles = function (btn, id) {
  var panel = document.getElementById('deb-' + id);
  if (!panel) return;
  var open = panel.classList.toggle('open');
  var arrow = open
    ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>'
    : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>';
  btn.innerHTML = arrow + ' Débouchés &amp; compétences';
};

/* ── LIGHTBOX ── */
window.openLightbox = function (src, caption) {
  var lb  = document.getElementById('lightbox');
  var img = document.getElementById('lightbox-img');
  var cap = document.getElementById('lightbox-caption');
  if (!lb || !img) return;
  img.src = src;
  if (cap) cap.textContent = caption || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
};
window.closeLightbox = function () {
  var lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
};

/* ══════════════════════════════════════
   INITIALISATION AU CHARGEMENT
   ══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  /* ── LOADER ── */
  (function () {
    var loader = document.getElementById('loader');
    var bar    = document.getElementById('loaderBar');
    var status = document.getElementById('loaderStatus');
    if (!loader || !bar || !status) return;
    var steps = [
      [15,  'Initialisation...'],
      [35,  'Chargement des modules...'],
      [60,  'Configuration des effets...'],
      [82,  'Sécurisation de l\'interface...'],
      [100, 'Prêt.']
    ];
    var i = 0;
    function nextStep() {
      if (i >= steps.length) {
        setTimeout(function () {
          loader.style.transition = 'opacity .5s';
          loader.style.opacity = '0';
          loader.style.pointerEvents = 'none';
          setTimeout(function () { loader.remove(); }, 520);
        }, 200);
        return;
      }
      bar.style.width = steps[i][0] + '%';
      status.textContent = steps[i][1];
      i++;
      setTimeout(nextStep, 260);
    }
    nextStep();
  })();

  /* ── SLIDER INIT ── */
  _slider.init();

  /* Swipe tactile */
  var startX = 0;
  var wrap   = document.querySelector('.slider-wrap');
  if (wrap) {
    wrap.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend',   function (e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 45) _slider.goTo(diff > 0 ? _slider.current + 1 : _slider.current - 1);
    }, { passive: true });
  }

  /* Touches clavier ←→ */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  _slider.goTo(_slider.current - 1);
    if (e.key === 'ArrowRight') _slider.goTo(_slider.current + 1);
    if (e.key === 'Escape') window.closeLightbox();
  });

  /* ── NAVBAR SCROLL ── */
  (function () {
    var nav = document.querySelector('.navbar');
    if (!nav) return;
    function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 30); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ── BURGER MENU ── */
  (function () {
    var btn  = document.getElementById('burger');
    var menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      btn.classList.toggle('open', open);
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        btn.classList.remove('open');
      });
    });
  })();

  /* ── SCROLL PROGRESS ── */
  (function () {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    function update() {
      var doc   = document.documentElement;
      var total = doc.scrollHeight - doc.clientHeight;
      bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  })();

  /* ── SCROLL TOP ── */
  (function () {
    var btn = document.getElementById('scrollTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  /* ── CUSTOM CURSOR ── */
  (function () {
    var outer = document.getElementById('cursor-outer');
    var inner = document.getElementById('cursor-inner');
    if (!outer || !inner || window.matchMedia('(pointer:coarse)').matches) return;
    var x = window.innerWidth / 2, y = window.innerHeight / 2;
    var ox = x, oy = y;
    window.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      inner.style.left = x + 'px';
      inner.style.top  = y + 'px';
    });
    (function follow() {
      ox += (x - ox) * 0.16;
      oy += (y - oy) * 0.16;
      outer.style.left = ox + 'px';
      outer.style.top  = oy + 'px';
      requestAnimationFrame(follow);
    })();
  })();

  /* ── MATRIX CANVAS ── */
  (function () {
    var canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var W, H, cols, drops;
    var chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    function init() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols  = Math.floor(W / 18);
      drops = Array.from({ length: cols }, function () { return Math.random() * -50; });
    }
    init();
    window.addEventListener('resize', init);
    setInterval(function () {
      ctx.fillStyle = 'rgba(11,14,17,0.06)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#10B981';
      ctx.font = '13px monospace';
      drops.forEach(function (y, i) {
        var ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 18, y * 18);
        if (y * 18 > H && Math.random() > 0.975) drops[i] = 0;
        else drops[i] += 1;
      });
    }, 55);
  })();

  /* ── TYPED NAME ── */
  (function () {
    var el     = document.getElementById('typed-name');
    var cursor = document.getElementById('type-cursor');
    if (!el) return;
    var name = 'Nadine Ibrahim';
    var idx  = 0;
    function type() {
      el.textContent = name.slice(0, idx);
      idx++;
      if (idx <= name.length) setTimeout(type, 95);
      else if (cursor) setTimeout(function () { cursor.style.display = 'none'; }, 800);
    }
    setTimeout(type, 1400);
  })();

  /* ── REVEAL ON SCROLL ── */
  (function () {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
      });
    }, { threshold: .08 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ── ACTIVE NAV LINK ── */
  (function () {
    var links = Array.from(document.querySelectorAll('.nav-link'));
    var sections = links.map(function (a) {
      var href = a.getAttribute('href') || '';
      var id   = href.startsWith('#') ? href.slice(1) : href;
      return id ? document.getElementById(id) : null;
    }).filter(Boolean);

    function setActive() {
      var pos = window.scrollY + window.innerHeight * 0.3;
      var cur = sections.length ? sections[0].id : '';
      sections.forEach(function (sec) { if (pos >= sec.offsetTop) cur = sec.id; });
      links.forEach(function (a) {
        var href = (a.getAttribute('href') || '').replace('#', '');
        a.classList.toggle('active', href === cur);
      });
    }
    setActive();
    window.addEventListener('scroll', setActive, { passive: true });
  })();

  /* ── COUNT-UP ── */
  (function () {
    var nums = document.querySelectorAll('.stat-num[data-target]');
    if (!nums.length) return;
    function animate(el) {
      var target = +el.getAttribute('data-target') || 0;
      var dur    = 1200;
      var start  = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step); else el.textContent = target;
      }
      requestAnimationFrame(step);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } });
    }, { threshold: .5 });
    nums.forEach(function (n) { io.observe(n); });
  })();

  /* ── TOOLTIP DÉFINITION ── */
  (function () {
    var tip     = document.getElementById('def-tooltip');
    if (!tip) return;
    var current = null;
    function show(el, e) {
      e.stopPropagation();
      if (current === el && tip.style.display !== 'none') { tip.style.display = 'none'; current = null; return; }
      current = el;
      tip.innerHTML =
        '<strong style="display:block;margin-bottom:.3rem;color:var(--rose3)">' + el.textContent.trim() + '</strong>' +
        '<span style="color:var(--txt2);line-height:1.55">' + (el.dataset.def || '') + '</span>';
      tip.style.display = 'block';
      position(el);
    }
    function position(el) {
      var r    = el.getBoundingClientRect();
      var tw   = Math.min(300, window.innerWidth - 24);
      var left = Math.max(12, Math.min(r.left + r.width / 2 - tw / 2, window.innerWidth - tw - 12));
      var top  = r.bottom + 10 + window.scrollY;
      if (r.bottom + 160 > window.innerHeight) top = r.top - 170 + window.scrollY;
      tip.style.left  = left + 'px';
      tip.style.top   = top  + 'px';
      tip.style.width = tw   + 'px';
    }
    document.querySelectorAll('.def-tag[data-def], .skill-tag[data-def]').forEach(function (el) {
      el.style.cursor = 'pointer';
      el.addEventListener('click', function (e) { show(el, e); });
    });
    document.addEventListener('click', function () { tip.style.display = 'none'; current = null; });
    window.addEventListener('scroll', function () {
      if (current && tip.style.display !== 'none') position(current);
    }, { passive: true });
  })();

  /* ── TILT CARDS ── */
  (function () {
    document.querySelectorAll('.tl-box, .skill-cat, .stat-card, .cert-card, .veille-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r  = card.getBoundingClientRect();
        var rx = (0.5 - (e.clientY - r.top)  / r.height) * 6;
        var ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
        card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-2px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  })();

  /* ── CONTACT FORM ── */
  (function () {
    var form    = document.getElementById('contactForm');
    var success = document.getElementById('cfSuccess');
    var errEl   = document.getElementById('cfError');
    var reset   = document.getElementById('cfReset');
    if (!form || !success) return;
    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
    function mark(el, bad) {
      el.style.borderColor = bad ? 'rgba(248,113,113,.65)' : '';
      el.style.boxShadow   = bad ? '0 0 0 4px rgba(248,113,113,.08)' : '';
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name    = document.getElementById('cf-name');
      var email   = document.getElementById('cf-email');
      var subject = document.getElementById('cf-subject');
      var message = document.getElementById('cf-message');
      var ok = true;
      [name, email, subject, message].forEach(function (el) { mark(el, false); });
      if (errEl) errEl.textContent = '';
      if (!name.value.trim())              { mark(name,    true); ok = false; }
      if (!validEmail(email.value.trim()))  { mark(email,   true); ok = false; }
      if (!subject.value.trim())            { mark(subject, true); ok = false; }
      if (message.value.trim().length < 10) { mark(message, true); ok = false; }
      if (!ok) { if (errEl) errEl.textContent = 'Veuillez remplir tous les champs correctement.'; return; }
      form.style.display = 'none';
      success.classList.add('show');
    });
    if (reset) {
      reset.addEventListener('click', function () {
        form.reset(); form.style.display = '';
        success.classList.remove('show');
      });
    }
  })();

  /* ── VEILLE : date auto ── */
  (function () {
    var el = document.getElementById('veille-date-auto');
    if (!el) return;
    var d = new Date();
    var months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
    el.textContent = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear() +
      ' à ' + String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
  })();

}); /* fin DOMContentLoaded */
