(function() {
  // ─── CONFIG ───────────────────────────────────────────────────
  const ENDPOINT_URL = 'https://script.google.com/macros/s/AKfycbwJUv9bpW0KNo7oNvv3TD1Nk8Y3z_Z_eLtKeijFJ17ph_GvNfzzbn8toO6vPnpmG7PEvg/exec';
  const FORM_TOKEN   = 'nxne2026-people-form-v1';

  /* ─── CSS — scoped under #nxne-people-form ──────────────────── */
  const css = `
    #nxne-people-form, #nxne-people-form *, #nxne-people-form *::before, #nxne-people-form *::after {
      box-sizing: border-box; margin: 0; padding: 0;
    }
    #nxne-people-form {
      --black: #000;
      --black-2: #0e0e0e;
      --black-3: #1a1a1a;
      --cream: #e8e4c0;
      --cream-dim: #b8b59a;
      --muted: #6f6c5b;
      --border: #2a2a2a;
      --border-strong: #3a3a3a;
      --red: #d94f2b;
      --red-bright: #f25733;
      background: var(--black);
      color: var(--cream);
      font-family: 'Barlow', sans-serif;
      font-weight: 400;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    #nxne-people-form .page {
      max-width: 720px;
      margin: 0 auto;
      padding: 60px 32px 80px;
    }
    #nxne-people-form .eyebrow {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--red);
      margin-bottom: 14px;
    }
    #nxne-people-form h1 {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 900;
      font-size: clamp(36px, 6vw, 56px);
      letter-spacing: 0.5px;
      text-transform: uppercase;
      line-height: 1;
      margin-bottom: 18px;
      color: var(--cream);
    }
    #nxne-people-form .intro {
      font-size: 15.5px;
      color: var(--cream-dim);
      margin-bottom: 40px;
      max-width: 580px;
      line-height: 1.55;
    }
    #nxne-people-form .intro strong { color: var(--cream); font-weight: 600; }
    #nxne-people-form form { display: flex; flex-direction: column; gap: 24px; }
    #nxne-people-form .field { display: flex; flex-direction: column; gap: 8px; }
    #nxne-people-form label {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--cream);
    }
    #nxne-people-form label .req { color: var(--red); margin-left: 4px; }
    #nxne-people-form label .hint {
      display: block;
      font-family: 'Barlow', sans-serif;
      font-weight: 400;
      font-size: 12.5px;
      text-transform: none;
      letter-spacing: 0.2px;
      color: var(--cream-dim);
      margin-top: 4px;
    }
    #nxne-people-form input[type="text"],
    #nxne-people-form input[type="email"],
    #nxne-people-form input[type="url"],
    #nxne-people-form select,
    #nxne-people-form textarea {
      background: var(--black-2);
      color: var(--cream);
      border: 1px solid var(--border-strong);
      font-family: 'Barlow', sans-serif;
      font-size: 15px;
      font-weight: 500;
      padding: 12px 14px;
      width: 100%;
      transition: border-color 0.15s, background 0.15s;
    }
    #nxne-people-form input:focus,
    #nxne-people-form select:focus,
    #nxne-people-form textarea:focus {
      outline: none;
      border-color: var(--cream);
      background: var(--black-3);
    }
    #nxne-people-form textarea { resize: vertical; min-height: 110px; line-height: 1.5; }
    #nxne-people-form .charcount {
      align-self: flex-end;
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 500;
      font-size: 11px;
      letter-spacing: 1.2px;
      color: var(--muted);
      margin-top: -2px;
    }
    #nxne-people-form .charcount.over { color: var(--red); }
    #nxne-people-form .checkbox-row {
      display: flex; align-items: flex-start; gap: 12px;
      padding: 14px 16px;
      background: var(--black-2);
      border: 1px solid var(--border);
      cursor: pointer;
    }
    #nxne-people-form .checkbox-row:hover { border-color: var(--border-strong); }
    #nxne-people-form .checkbox-row input[type="checkbox"] {
      margin-top: 3px;
      width: 16px; height: 16px;
      accent-color: var(--red);
      cursor: pointer;
      flex-shrink: 0;
    }
    #nxne-people-form .checkbox-row label {
      font-family: 'Barlow', sans-serif;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 0.2px;
      text-transform: none;
      color: var(--cream);
      cursor: pointer;
      line-height: 1.4;
    }
    #nxne-people-form .checkbox-row label .hint { margin-top: 6px; font-size: 12.5px; }
    #nxne-people-form .honeypot {
      position: absolute; left: -9999px; top: -9999px;
      height: 0; width: 0; overflow: hidden;
    }
    #nxne-people-form button.submit {
      background: var(--red);
      color: #fff;
      border: none;
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 900;
      font-size: 14px;
      letter-spacing: 3px;
      text-transform: uppercase;
      padding: 18px 32px;
      cursor: pointer;
      transition: background 0.15s, transform 0.1s;
      margin-top: 12px;
      align-self: flex-start;
    }
    #nxne-people-form button.submit:hover { background: var(--red-bright); }
    #nxne-people-form button.submit:active { transform: translateY(1px); }
    #nxne-people-form button.submit:disabled { opacity: 0.5; cursor: not-allowed; }
    #nxne-people-form .error-msg {
      background: rgba(217,79,43,0.08);
      border-left: 3px solid var(--red);
      padding: 14px 18px;
      color: var(--cream);
      font-size: 14px;
      display: none;
      font-family: 'Barlow', sans-serif;
      line-height: 1.55;
    }
    #nxne-people-form .error-msg.show { display: block; }
    #nxne-people-form .success {
      display: none;
      text-align: center;
      padding: 60px 0;
    }
    #nxne-people-form .success.show { display: block; }
    #nxne-people-form .success-mark {
      width: 64px; height: 64px;
      border-radius: 50%;
      background: var(--red);
      margin: 0 auto 24px;
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-size: 32px; font-weight: 900;
    }
    #nxne-people-form .success h2 {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 900;
      font-size: clamp(32px, 5vw, 44px);
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 14px;
      color: var(--cream);
    }
    #nxne-people-form .success p {
      font-size: 15.5px;
      color: var(--cream-dim);
      max-width: 480px;
      margin: 0 auto;
      line-height: 1.55;
    }
    #nxne-people-form footer {
      margin-top: 60px;
      padding-top: 30px;
      border-top: 1px solid var(--border);
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 500;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--muted);
      text-align: center;
    }
    #nxne-people-form footer a { color: var(--cream-dim); text-decoration: none; }
    #nxne-people-form footer a:hover { color: var(--cream); }
    @media (max-width: 600px) {
      #nxne-people-form .page { padding: 40px 20px 60px; }
      #nxne-people-form form { gap: 20px; }
    }
  `;

  /* ─── INJECT FONTS + CSS ──────────────────────────────────── */
  if (!document.getElementById('nxne-pf-fonts')) {
    const link = document.createElement('link');
    link.id = 'nxne-pf-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@500;700;900&display=swap';
    document.head.appendChild(link);
  }
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─── MOUNT TARGET ────────────────────────────────────────── */
  const target = document.getElementById('nxne-people-form') || document.currentScript.parentElement;
  if (target.id !== 'nxne-people-form') target.id = 'nxne-people-form';
  target.innerHTML = `
    <main class="page">

    <div id="nxne-pf-shell">
      <div class="eyebrow">NXNE 2026 · Speaker &amp; Panelist Profile</div>
      <h1>Tell us<br>about you</h1>
      <p class="intro">
        If you're speaking, moderating, or sponsoring at NXNE 2026, share your details here so we can
        feature you properly on <strong>nxne.com/2026-schedule</strong>. Submissions are reviewed before going live.
      </p>

      <div class="error-msg" id="nxne-pf-error"></div>

      <form id="nxne-pf-form" onsubmit="return nxnePeopleForm.submit(event)">

        <div class="field">
          <label for="nxne-pf-name">Full Name<span class="req">*</span></label>
          <input type="text" id="nxne-pf-name" name="name" required maxlength="120">
        </div>

        <div class="field">
          <label for="nxne-pf-roleType">Your Role at NXNE<span class="req">*</span>
            <span class="hint">Pick the closest fit — you can describe specifics in your bio.</span>
          </label>
          <select id="nxne-pf-roleType" name="roleType" required>
            <option value="">Select one…</option>
            <option value="Artist">Artist</option>
            <option value="Media">Media</option>
            <option value="Music Industry Professional">Music Industry Professional</option>
            <option value="Partner">Partner</option>
            <option value="Sponsor">Sponsor</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="field">
          <label for="nxne-pf-title">Job Title<span class="req">*</span>
            <span class="hint">e.g. "Founder &amp; CEO", "Music Editor", "VP A&amp;R"</span>
          </label>
          <input type="text" id="nxne-pf-title" name="title" required maxlength="120">
        </div>

        <div class="field">
          <label for="nxne-pf-company">Company / Organization<span class="req">*</span></label>
          <input type="text" id="nxne-pf-company" name="company" required maxlength="120">
        </div>

        <div class="field">
          <label for="nxne-pf-description">One-line tagline
            <span class="hint">A short hook that appears under your name on the public schedule. Keep it punchy.</span>
          </label>
          <input type="text" id="nxne-pf-description" name="description" maxlength="200">
          <span class="charcount" id="nxne-pf-cc-description">0 / 200</span>
        </div>

        <div class="field">
          <label for="nxne-pf-bio">Bio
            <span class="hint">A full paragraph for your public profile. Tell us about yourself — and what you do. If you're in the music industry, you might mention whether you're in management, booking, festivals, venues, touring, ticketing, labels, A&amp;R, publishing, marketing, digital, brands, or something else. Plain text. Max 1500 characters.</span>
          </label>
          <textarea id="nxne-pf-bio" name="bio" maxlength="1500" rows="6"></textarea>
          <span class="charcount" id="nxne-pf-cc-bio">0 / 1500</span>
        </div>

        <div class="field">
          <label for="nxne-pf-headshotUrl">Headshot URL
            <span class="hint">Paste a public link to your photo (LinkedIn, your website, agency page, etc.). Optional but recommended.</span>
          </label>
          <input type="url" id="nxne-pf-headshotUrl" name="headshotUrl" placeholder="https://" maxlength="500">
        </div>

        <div class="field">
          <label for="nxne-pf-websiteUrl">Website URL
            <span class="hint">Optional — your personal site, label, or company.</span>
          </label>
          <input type="url" id="nxne-pf-websiteUrl" name="websiteUrl" placeholder="https://" maxlength="500">
        </div>

        <div class="field">
          <label for="nxne-pf-email">Email
            <span class="hint">For our records. Only made public if you tick the box below.</span>
          </label>
          <input type="email" id="nxne-pf-email" name="email" maxlength="120">
        </div>

        <div class="checkbox-row">
          <input type="checkbox" id="nxne-pf-contactVisible" name="contactVisible" value="yes">
          <label for="nxne-pf-contactVisible">
            Display a "Let's chat" button on my public profile.
            <span class="hint">Lets attendees email you directly. Your email won't appear in plain text — we obfuscate it.</span>
          </label>
        </div>

        <div class="honeypot" aria-hidden="true">
          <label for="nxne-pf-website2">Leave this empty</label>
          <input type="text" id="nxne-pf-website2" name="website2" tabindex="-1" autocomplete="off">
        </div>

        <button type="submit" class="submit" id="nxne-pf-submit">Submit Profile</button>
      </form>
    </div>

    <div class="success" id="nxne-pf-success">
      <div class="success-mark">✓</div>
      <h2>Thanks — we got it</h2>
      <p>
        Your profile has been received and is in the review queue. Once approved, it'll appear on the
        NXNE 2026 schedule. If we need anything from you, we'll be in touch.
      </p>
    </div>

    <footer>
      NXNE 2026 · Speaker &amp; Panelist Submissions
    </footer>

    </main>
  `;

  /* DOM lookup helpers — scoped to widget root */
  function $(id) { return target.querySelector('#' + id); }

  /* ─── CHAR COUNTERS ───────────────────────────────────────── */
  ['description', 'bio'].forEach(field => {
    const el = $('nxne-pf-' + field);
    const out = $('nxne-pf-cc-' + field);
    if (!el || !out) return;
    const max = parseInt(el.getAttribute('maxlength'), 10) || 0;
    const update = () => {
      const len = el.value.length;
      out.textContent = len + ' / ' + max;
      out.classList.toggle('over', max && len >= max);
    };
    el.addEventListener('input', update);
    update();
  });

  /* ─── SUBMIT HANDLER ──────────────────────────────────────── */
  async function submitForm(e) {
    e.preventDefault();
    const form = $('nxne-pf-form');
    const btn  = $('nxne-pf-submit');
    const err  = $('nxne-pf-error');

    err.classList.remove('show');
    err.textContent = '';

    const data = new FormData(form);
    data.append('token', FORM_TOKEN);
    data.append('userAgent', navigator.userAgent.slice(0, 200));

    const body = new URLSearchParams();
    for (const [k, v] of data.entries()) body.append(k, v);

    btn.disabled = true;
    btn.textContent = 'Submitting…';

    try {
      const response = await fetch(ENDPOINT_URL, {
        method: 'POST',
        body: body,
        /* Do NOT set Content-Type — browser sets it automatically for URLSearchParams
           and that prevents a CORS preflight (Apps Script doesn't return preflight headers) */
      });
      const result = await response.json();

      if (result.ok) {
        $('nxne-pf-shell').style.display = 'none';
        $('nxne-pf-success').classList.add('show');
        window.scrollTo({ top: target.offsetTop || 0, behavior: 'smooth' });
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (ex) {
      err.textContent = 'Something went wrong: ' + ex.message + '. Please try again, or email schedule@nxne.com if it persists.';
      err.classList.add('show');
      btn.disabled = false;
      btn.textContent = 'Submit Profile';
    }
    return false;
  }

  /* ─── EXPOSE FOR INLINE HANDLERS ──────────────────────────── */
  window.nxnePeopleForm = { submit: submitForm };
})();
