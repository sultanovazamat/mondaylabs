// Dynamic year
document.addEventListener('DOMContentLoaded', function () {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Typing effect with reduced motion respect (single command line with deletion)
(function () {
  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var typeEl = document.getElementById('type-line');
  if (!typeEl) return;

  var lines = [
    'echo "Products that use AI to amplify potential"',
    "printf 'Human‑centric, access‑first'",
    'echo "Practical by design, used in the real world"',
    "printf 'AI in service of outcomes'"
  ];

  var idx = 0;

  function nextLine() {
    idx = (idx + 1) % lines.length;
    return lines[idx];
  }

  function typeWrite(textEl, full, cb) {
    var i = 0;
    var step = Math.max(1, Math.floor(full.length / 20));
    textEl.textContent = '';
    var timer = setInterval(function () {
      i += step;
      textEl.textContent = full.slice(0, i);
      if (i >= full.length) {
        clearInterval(timer);
        if (cb) cb();
      }
    }, 30);
  }

  function typeDelete(textEl, cb) {
    var current = textEl.textContent || '';
    var i = current.length;
    var step = Math.max(1, Math.floor(i / 20));
    var timer = setInterval(function () {
      i -= step;
      if (i <= 0) {
        textEl.textContent = '';
        clearInterval(timer);
        if (cb) cb();
      } else {
        textEl.textContent = current.slice(0, i);
      }
    }, 30);
  }

  function cycleAnimated() {
    var line = nextLine();
    typeWrite(typeEl, line, function () {
      // Brief pause after typing, then delete characters
      setTimeout(function () {
        typeDelete(typeEl, function () {
          // Short pause before next line
          setTimeout(cycleAnimated, 250);
        });
      }, 900);
    });
  }

  if (prefersReduced) {
    // No animation: periodic full-text updates only
    setInterval(function () {
      typeEl.textContent = nextLine();
    }, 4000);
  } else {
    cycleAnimated();
  }
})();

// Keyboard navigation: 1=Mission, 2=Approach, 3=Contact
(function () {
  var map = { '1': '#mission', '2': '#approach', '3': '#contact' };
  window.addEventListener('keydown', function (e) {
    if (map[e.key]) {
      var target = document.querySelector(map[e.key]);
      if (target) {
        // Smooth scroll; fallback if not supported
        try {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (_) {
          target.scrollIntoView();
        }
        // move focus to section heading for accessibility
        var h2 = target.querySelector('h2');
        if (h2) {
          h2.setAttribute('tabindex', '-1');
          h2.focus();
        }
      }
    }
  }, { passive: true });
})();