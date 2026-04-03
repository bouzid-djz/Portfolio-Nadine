/* ══════════════════════════════════════
   NADINE IBRAHIM — Portfolio Script v3
   ══════════════════════════════════════ */

/* ── LOADER ── */
(function () {
  var loader = document.getElementById('loader');
  var bar    = document.getElementById('loaderBar');
  var status = document.getElementById('loaderStatus');
  var steps  = [
    { pct: 25,  txt: 'Initialisation…' },
    { pct: 55,  txt: 'Chargement des ressources…' },
    { pct: 82,  txt: 'Mise en place de l\'interface…' },
    { pct: 100, txt: 'Bienvenue !' }
  ];
  var i = 0;
  function next() {
    if (i >= steps.length) {
      loader.classList.add('hide');
      setTimeout(function () { loader.classList.add('gone'); }, 550);
      return;
    }
    bar.style.width    = steps[i].pct + '%';
    status.textContent = steps[i].txt;
    i++;
    setTimeout(next, i === steps.length ? 500 : 380);
  }
  document.body.style.overflow = 'hidden';
  setTimeout(function () { document.body.style.overflow = ''; next(); }, 300);
})();

/* ── TYPING ── */
(function () {
  var el     = document.getElementById('typed-name');
  var cursor = document.getElementById('type-cursor');
  var text   = 'Nadine Ibrahim';
  var idx    = 0;
  function type() {
    if (!el) return;
    el.textContent = text.slice(0, idx);
    idx++;
    if (idx <= text.length) setTimeout(type, 75);
    else setTimeout(function () {
      if (cursor) { cursor.style.animation = 'none'; cursor.style.opacity = '0'; }
    }, 2500);
  }
  setTimeout(type, 2000);
})();

/* ── SCROLL PROGRESS ── */
var progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', function () {
  var doc   = document.documentElement;
  var total = doc.scrollHeight - doc.clientHeight;
  progressBar.style.width = (total > 0 ? (window.pageYOffset / total) * 100 : 0) + '%';
}, { passive: true });

/* ── CURSEUR CUSTOM ── */
(function () {
  var outer = document.getElementById('cursor-outer');
  var inner = document.getElementById('cursor-inner');
  if (!outer || !inner) return;
  var mx = 0, my = 0, ox = 0, oy = 0;
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    inner.style.left = mx + 'px'; inner.style.top = my + 'px';
  });
  (function anim() {
    ox += (mx - ox) * 0.13; oy += (my - oy) * 0.13;
    outer.style.left = ox + 'px'; outer.style.top = oy + 'px';
    requestAnimationFrame(anim);
  })();
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest('a,button,[onclick],.dot,.deb-btn,.slide-img,.stat-link'))
      document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest('a,button,[onclick],.dot,.deb-btn,.slide-img,.stat-link'))
      document.body.classList.remove('cursor-hover');
  });
  document.addEventListener('mouseleave', function () { outer.style.opacity='0'; inner.style.opacity='0'; });
  document.addEventListener('mouseenter', function () { outer.style.opacity='1'; inner.style.opacity='1'; });
})();

/* ── MATRIX ROSE / VIOLET ── */
var canvas = document.getElementById('matrix-canvas');
var ctx    = canvas.getContext('2d');
var CHARS  = '01010110100101';
var FS = 16, cols = 0, drops = [];
function resizeCanvas() {
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  cols = Math.floor(canvas.width / FS); drops = [];
  for (var i = 0; i < cols; i++) drops[i] = i%2===0 ? Math.random()*-(canvas.height/FS) : null;
}
resizeCanvas(); window.addEventListener('resize', resizeCanvas);
var palette = ['rgba(16,185,129,.35)','rgba(5,150,105,.28)','rgba(52,211,153,.22)','rgba(110,231,183,.18)','rgba(16,185,129,.25)'];
function drawMatrix() {
  ctx.fillStyle = 'rgba(11,14,17,.08)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = FS + 'px monospace';
  for (var i = 0; i < cols; i++) {
    if (drops[i] === null) continue;
    var c = CHARS[Math.floor(Math.random()*CHARS.length)];
    var x = i*FS, y = drops[i]*FS;
    var col = palette[Math.floor(Math.random()*palette.length)];
    ctx.fillStyle = col; ctx.shadowBlur = 5; ctx.shadowColor = col;
    ctx.fillText(c, x, y); ctx.shadowBlur = 0;
    if (y > canvas.height && Math.random() > .975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 60);

/* ── NAVBAR ── */
var navbar   = document.getElementById('navbar');
var burger   = document.getElementById('burger');
var navMenu  = document.getElementById('nav-menu');
var navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function () {
  navbar.classList.toggle('scrolled', window.pageYOffset > 60);
  document.getElementById('scrollTop').classList.toggle('show', window.pageYOffset > 500);
}, { passive: true });

burger.addEventListener('click', function () {
  burger.classList.toggle('open');
  navMenu.classList.toggle('open');
});
document.addEventListener('click', function (e) {
  if (!navbar.contains(e.target)) { burger.classList.remove('open'); navMenu.classList.remove('open'); }
});

/* ── NAVIGATION FLUIDE ── */
var sections = document.querySelectorAll('section[id]');
function updateNav() {
  var y = window.pageYOffset + 90;
  sections.forEach(function (s) {
    if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
      navLinks.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('href') === '#' + s.id);
      });
    }
  });
}
window.addEventListener('scroll', updateNav, { passive: true });

navLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    burger.classList.remove('open'); navMenu.classList.remove('open');
    var t = document.querySelector(link.getAttribute('href'));
    if (t) window.scrollTo({ top: t.offsetTop - 72, behavior: 'smooth' });
  });
});

/* Navigation des chiffres clés (liens <a>) */
document.querySelectorAll('.stat-link').forEach(function (card) {
  card.addEventListener('click', function (e) {
    e.preventDefault();
    var t = document.querySelector(card.getAttribute('href'));
    if (t) window.scrollTo({ top: t.offsetTop - 72, behavior: 'smooth' });
  });
});

/* ── DÉBOUCHÉS ── */
function toggleDebouche(opt) {
  var panel = document.getElementById('deb-' + opt);
  var btn   = document.getElementById('btn-' + opt);
  var other = opt === 'sisr' ? 'slam' : 'sisr';
  var isOpen = panel.classList.contains('open');
  document.getElementById('deb-' + other).classList.remove('open');
  document.getElementById('btn-' + other).textContent = 'Voir les débouchés ▼';
  if (!isOpen) { panel.classList.add('open'); btn.textContent = 'Masquer ▲'; }
  else btn.textContent = 'Voir les débouchés ▼';
}
window.toggleDebouche = toggleDebouche;

/* ── LIGHTBOX ── */
function openLightbox(src, caption) {
  var lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-caption').textContent = caption || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
document.getElementById('lightbox-img').addEventListener('click', function (e) { e.stopPropagation(); });
window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;

/* ── SLIDER ── */
var cur = 0;
var slides = document.querySelectorAll('.slide');
var dots   = document.querySelectorAll('.dot');
function showSlide(n) {
  slides.forEach(function (s) { s.classList.remove('active'); });
  dots.forEach(function (d)   { d.classList.remove('active'); });
  slides[n].classList.add('active'); dots[n].classList.add('active'); cur = n;
}
function nextProject() { showSlide((cur + 1) % slides.length); }
function prevProject() { showSlide((cur - 1 + slides.length) % slides.length); }
function goToProject(n) { showSlide(n); }
window.nextProject = nextProject; window.prevProject = prevProject; window.goToProject = goToProject;

/* Swipe mobile */
(function () {
  var sw = document.querySelector('.slider-wrap'); if (!sw) return;
  var sx = 0;
  sw.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  sw.addEventListener('touchend',   function (e) {
    var d = sx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 40) { if (d > 0) nextProject(); else prevProject(); }
  }, { passive: true });
})();

/* ── CARROUSEL ── */
var car = document.getElementById('carousel');
if (car) car.innerHTML += car.innerHTML;

/* ── BARRES ── */
var barObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      setTimeout(function () { e.target.style.width = e.target.dataset.w + '%'; }, 200);
      barObs.unobserve(e.target);
    }
  });
}, { threshold: .4 });
document.querySelectorAll('.bar-fill').forEach(function (b) { b.style.width = '0'; barObs.observe(b); });

/* ── COMPTEURS ── */
var counted = false, nums = document.querySelectorAll('.stat-num');
var cntObs = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    nums.forEach(function (el) {
      var target = parseInt(el.dataset.target), v = 0;
      var t = setInterval(function () {
        v += Math.max(1, target / 60);
        if (v >= target) { el.textContent = target; clearInterval(t); }
        else el.textContent = Math.floor(v);
      }, 18);
    });
  }
}, { threshold: .5 });
var ch = document.getElementById('chiffres'); if (ch) cntObs.observe(ch);

/* ── REVEAL ── */
var revObs = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); revObs.unobserve(e.target); } });
}, { threshold: .06 });
document.querySelectorAll('.reveal').forEach(function (el, i) {
  el.style.transitionDelay = (i % 5) * .08 + 's'; revObs.observe(el);
});

/* ── SCROLL TOP ── */
document.getElementById('scrollTop').addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('load', updateNav);

/* ── FORMULAIRE DE CONTACT ── */
(function () {
  var form    = document.getElementById('contactForm');
  var success = document.getElementById('cfSuccess');
  var submit  = document.getElementById('cfSubmit');
  var reset   = document.getElementById('cfReset');
  var errorEl = document.getElementById('cfError');

  if (!form) return;

  /* Validation légère */
  function validate() {
    var ok = true;
    ['cf-name','cf-email','cf-subject','cf-message'].forEach(function (id) {
      var el = document.getElementById(id);
      var empty = el.value.trim() === '';
      el.classList.toggle('cf-invalid', empty);
      if (empty) ok = false;
    });
    var emailEl = document.getElementById('cf-email');
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim());
    if (!emailOk) { emailEl.classList.add('cf-invalid'); ok = false; }
    return ok;
  }

  /* Retirer l'état d'erreur en live */
  form.querySelectorAll('.cf-input').forEach(function (el) {
    el.addEventListener('input', function () { el.classList.remove('cf-invalid'); errorEl.textContent = ''; });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorEl.textContent = '';

    if (!validate()) {
      errorEl.textContent = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    /* ─ Envoi via mailto ─
       Remplacez l'adresse ci-dessous par votre email réel
    ─────────────────────────────────────────────────── */
    var TO = 'n.ibrahim@ecole-ipssi.net';

    var name    = document.getElementById('cf-name').value.trim();
    var subject = document.getElementById('cf-subject').value.trim();
    var message = document.getElementById('cf-message').value.trim();
    var from    = document.getElementById('cf-email').value.trim();

    var body = 'De : ' + name + ' (' + from + ')\n\n' + message;

    var mailtoLink = 'mailto:' + TO
      + '?subject=' + encodeURIComponent(subject)
      + '&body='    + encodeURIComponent(body);

    submit.classList.add('loading');
    submit.disabled = true;

    /* Petite pause pour l'effet visuel, puis ouverture du client mail */
    setTimeout(function () {
      window.location.href = mailtoLink;
      showSuccess();
    }, 700);
  });

  function showSuccess() {
    form.classList.add('hide');
    success.classList.add('show');
  }

  reset.addEventListener('click', function () {
    form.reset();
    form.classList.remove('hide');
    success.classList.remove('show');
    submit.classList.remove('loading');
    submit.disabled = false;
    errorEl.textContent = '';
    /* Re-déclencher l'animation SVG */
    var circle = success.querySelector('.cf-check-circle');
    var tick   = success.querySelector('.cf-check-tick');
    if (circle) { circle.style.animation = 'none'; void circle.offsetWidth; circle.style.animation = ''; }
    if (tick)   { tick.style.animation   = 'none'; void tick.offsetWidth;   tick.style.animation   = ''; }
  });
})();

/* ── DEF-TAGS TOOLTIP ── */
(function () {
  var tip = document.getElementById('def-tooltip');
  if (!tip) return;
  var currentTag = null;

  document.addEventListener('click', function (e) {
    var tag = e.target.closest('.def-tag');
    if (tag) {
      e.stopPropagation();
      if (currentTag === tag && tip.style.display !== 'none') {
        tip.style.display = 'none';
        currentTag = null;
        return;
      }
      currentTag = tag;
      var word = tag.textContent.trim();
      var def  = tag.dataset.def || '';
      tip.innerHTML = '<strong>' + word + '</strong>' + def;
      tip.style.display = 'block';
      positionTip(tag);
    } else {
      tip.style.display = 'none';
      currentTag = null;
    }
  });

  function positionTip(el) {
    var r  = el.getBoundingClientRect();
    var tw = Math.min(280, window.innerWidth - 24);
    var left = r.left + r.width / 2 - tw / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - tw - 12));
    var top = r.bottom + 10 + window.scrollY;
    if (r.bottom + 10 + 130 > window.innerHeight) {
      top = r.top - 10 - 130 + window.scrollY;
    }
    tip.style.left  = left + 'px';
    tip.style.top   = top + 'px';
    tip.style.width = tw + 'px';
  }

  window.addEventListener('scroll', function () {
    if (currentTag && tip.style.display !== 'none') positionTip(currentTag);
  }, { passive: true });
})();

/* ── VEILLE DATE AUTO ── */
(function () {
  var el = document.getElementById('veille-date-auto');
  if (!el) return;
  var d = new Date();
  var months = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
  el.textContent = d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
})();

/* ── TOOLTIPS SKILL-TAGS ── */
(function () {
  var tip = document.getElementById('def-tooltip');
  if (!tip) return;
  var current = null;

  function showTip(el, e) {
    e.stopPropagation();
    if (current === el && tip.style.display !== 'none') {
      tip.style.display = 'none'; current = null; return;
    }
    current = el;
    var word = el.textContent.trim();
    var def  = el.dataset.def || '';
    tip.innerHTML = '<strong style="display:block;margin-bottom:.35rem;color:var(--rose3)">' + word + '</strong>'
                  + '<span style="color:var(--txt2);line-height:1.5">' + def + '</span>';
    tip.style.display = 'block';
    position(el);
  }

  function position(el) {
    var r  = el.getBoundingClientRect();
    var tw = Math.min(300, window.innerWidth - 24);
    var left = r.left + r.width / 2 - tw / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - tw - 12));
    var top = r.bottom + 10 + window.scrollY;
    if (r.bottom + 150 > window.innerHeight) top = r.top - 160 + window.scrollY;
    tip.style.left  = left + 'px';
    tip.style.top   = top  + 'px';
    tip.style.width = tw   + 'px';
  }

  document.querySelectorAll('.skill-tag[data-def], .chip.def-tag[data-def]').forEach(function (el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function (e) { showTip(el, e); });
  });

  document.addEventListener('click', function () {
    tip.style.display = 'none'; current = null;
  });

  window.addEventListener('scroll', function () {
    if (current && tip.style.display !== 'none') position(current);
  }, { passive: true });
})();
