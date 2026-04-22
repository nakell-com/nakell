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

  // Hero catch-copy animation (no loop — see index.html comment for rationale)
  //
  // フェーズ構成:
  //   1: 泣けるほどの、 / 一枚を。
  //   2: 泣けるほどの、 / 贈り物を。
  //   3: 泣けるほどの、 / 思い出を。
  //   4: 泣けるほどの…  （三点リーダー、下段なし）
  //   5: Nakell / 感動を、届ける。
  //
  var hero = document.querySelector('.hero');
  if (hero) {
    var catchEl = hero.querySelector('.hero-catch');
    var line1 = hero.querySelector('.hero-catch-line1');
    var line2 = hero.querySelector('.hero-catch-line2');
    var swaps = hero.querySelectorAll('.hero-catch-swap');
    var finalEl = hero.querySelector('.hero-final');
    var swapIndex = 0;
    var DISPLAY_MS = 2300;
    var SWAP_FADE_MS = 600;
    var ELLIPSIS_MS = 2800;
    var CATCH_FADEOUT_MS = 1200;

    // Start: show catch element, begin swap cycle
    setTimeout(function () {
      catchEl.classList.add('is-active');
      showSwap();
    }, 400);

    function showSwap() {
      if (swapIndex >= swaps.length) {
        // Phase 4: "泣けるほどの…" — change punctuation, hide line2
        line1.textContent = '\u6CE3\u3051\u308B\u307B\u3069\u306E\u2026';
        line2.style.display = 'none';
        setTimeout(function () {
          // Fade out catch, then reveal brand
          catchEl.classList.remove('is-active');
          setTimeout(function () {
            finalEl.classList.add('is-active');
          }, CATCH_FADEOUT_MS);
        }, ELLIPSIS_MS);
        return;
      }
      swaps[swapIndex].classList.add('is-visible');
      setTimeout(function () {
        swaps[swapIndex].classList.remove('is-visible');
        setTimeout(function () {
          swapIndex++;
          showSwap();
        }, SWAP_FADE_MS);
      }, DISPLAY_MS);
    }
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
