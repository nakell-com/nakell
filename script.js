/* Nakell - Common script */
(function () {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        toggle.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  // Hero phase animation
  const hero = document.querySelector('.hero');
  if (hero) {
    const phases = hero.querySelectorAll('.hero-phase');
    const final = hero.querySelector('.hero-final');
    let i = 0;
    function next() {
      phases.forEach(function (p) { p.classList.remove('is-active'); });
      if (i < phases.length) {
        phases[i].classList.add('is-active');
        i++;
        setTimeout(next, 2600);
      } else if (final) {
        final.classList.add('is-active');
      }
    }
    setTimeout(next, 400);
  }

  // Contact form async submit
  const form = document.getElementById('contact-form');
  if (form) {
    const thanks = document.getElementById('form-thanks');
    const btn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (btn) { btn.disabled = true; btn.textContent = '送信中...'; }
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        if (res.ok) {
          form.style.display = 'none';
          if (thanks) thanks.classList.add('is-visible');
          window.scrollTo({ top: form.offsetTop - 120, behavior: 'smooth' });
        } else {
          throw new Error('送信に失敗しました');
        }
      } catch (err) {
        alert('送信に失敗しました。時間をおいて再度お試しください。');
        if (btn) { btn.disabled = false; btn.textContent = '送信する'; }
      }
    });
  }
})();
