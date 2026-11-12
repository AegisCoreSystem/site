// AegisCore System — site interactions
(function () {
  'use strict';

  // ---- Mobile menu ----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  // ---- Copy email (contact page) ----
  var copyBtn = document.getElementById('copy-email');
  var copyStatus = document.getElementById('copy-status');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.getAttribute('data-email');
      var done = function () { if (copyStatus) copyStatus.textContent = 'Copied ' + email + ' to clipboard.'; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, function () {
          if (copyStatus) copyStatus.textContent = 'Copy failed — the address is ' + email + '.';
        });
      } else {
        if (copyStatus) copyStatus.textContent = 'The address is ' + email + '.';
      }
    });
  }

  // ---- Reveal on scroll ----
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Project sizer (MW picker) ----
  var SERVERS_PER_MW = 53;
  var picker = document.getElementById('mw-picker');
  var outServers = document.getElementById('out-servers');
  var outMw = document.getElementById('out-mw');
  if (picker) {
    picker.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-mw]');
      if (!btn) return;
      var mw = Number(btn.getAttribute('data-mw'));
      picker.querySelectorAll('button').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      outServers.textContent = (SERVERS_PER_MW * mw).toLocaleString('en-US');
      outMw.textContent = mw + ' MW';
    });
  }

  // ---- Footer year ----
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
