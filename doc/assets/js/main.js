/* ============================================================
   SCROLL REVEAL
============================================================ */
(function () {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => el.classList.add('visible'));
  }, 1500);
})();

/* ============================================================
   SCROLL PROGRESS + NAV ACTIVE + NAV SCROLLED
============================================================ */
(function () {
  const bar      = document.getElementById('scroll-bar');
  const nav      = document.getElementById('nav');
  const navLinks = document.querySelectorAll('nav a');
  const sections = ['hero','education','awards','projects','skills','contact']
                   .map(id => document.getElementById(id));

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';

    nav.classList.toggle('scrolled', window.scrollY > 20);

    let cur = 0;
    sections.forEach((s, i) => {
      if (s && window.scrollY >= s.offsetTop - 120) cur = i;
    });
    navLinks.forEach((a, i) => a.classList.toggle('active', i === cur));
  });
})();

/* ============================================================
   COURSE TABLE TOGGLE
============================================================ */
function toggleCourses() {
  var wrap = document.getElementById('course-wrap');
  var open = wrap.classList.toggle('open');
  var btn = document.getElementById('course-btn');
  var zhSpan = btn.querySelector('.lang-zh');
  var enSpan = btn.querySelector('.lang-en');
  if (zhSpan) zhSpan.textContent = open ? '收起课程成绩' : '查看相关课程成绩';
  if (enSpan) enSpan.textContent = open ? 'Hide Course Grades' : 'View Course Grades';
}

/* ============================================================
   THEME TOGGLE
============================================================ */
function toggleTheme() {
  var html = document.documentElement;
  var current = html.getAttribute('data-theme');
  var next = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  var btn = document.getElementById('theme-toggle');
  btn.textContent = next === 'light' ? 'Light' : 'Dark';
  btn.setAttribute('aria-pressed', next === 'light' ? 'true' : 'false');
}

/* ============================================================
   LANGUAGE TOGGLE
============================================================ */
function setLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  localStorage.setItem('lang', lang);
  updateLangBtns(lang);
}

function updateLangBtns(lang) {
  var zhBtn = document.getElementById('lang-zh-btn');
  var enBtn = document.getElementById('lang-en-btn');
  if (zhBtn) { zhBtn.classList.toggle('active', lang === 'zh'); zhBtn.setAttribute('aria-pressed', lang === 'zh' ? 'true' : 'false'); }
  if (enBtn) { enBtn.classList.toggle('active', lang === 'en'); enBtn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false'); }
}

/* ============================================================
   INIT THEME & LANGUAGE FROM localStorage
============================================================ */
(function init() {
  var themeSaved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', themeSaved);
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.textContent = themeSaved === 'light' ? 'Light' : 'Dark';
    themeBtn.setAttribute('aria-pressed', themeSaved === 'light' ? 'true' : 'false');
  }

  var langSaved = localStorage.getItem('lang') || 'zh';
  document.documentElement.setAttribute('data-lang', langSaved);
  updateLangBtns(langSaved);
})();
