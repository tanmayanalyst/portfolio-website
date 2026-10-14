// ==========================================================================
// Tanmay Thakur — Portfolio Application Logic
// Obsidian Crimson Theme & Motion Engine
// Features: Spotlight Glow (Opt 1), 3D Tilt Physics (Opt 3),
// AutoNews Bot Terminal Runner (Opt 4), Magnetic Buttons (Opt 5),
// Custom Glowing Cursor + Web Audio Synthesizer (Opt 7).
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initAmbientCanvas();
  initProjectFilters();
  initSkillFilters();
  initContactForm();
  initMobileNav();
  initActiveNavScroll();
  initScrollParallaxPhotos();

  // Selected UI/UX & Motion Features
  initSpotlightCards();     // Option 1: Spotlight Glow
  initTiltCards();          // Option 3: 3D Tilt Physics
  initBotSimulator();       // Option 4: AutoNews Interactive Terminal Runner
  initMagneticButtons();    // Option 5: Magnetic Buttons & Icons
  initCustomCursor();       // Option 7: Custom Futuristic Glowing Cursor
  initSoundEffects();       // Option 7: Web Audio Synthesizer & Sound Toggle
});

// --------------------------------------------------------------------------
// 1. Live IST Clock
// --------------------------------------------------------------------------
function initClock() {
  const clockEl = document.getElementById('hero-clock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const timeStr = now.toLocaleTimeString('en-US', options).toLowerCase();
    clockEl.textContent = `IST ${timeStr}`;
  }

  update();
  setInterval(update, 1000);
}

// --------------------------------------------------------------------------
// 2. Ambient Canvas Particles (Crimson Red & Silvery White)
// --------------------------------------------------------------------------
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const COUNT = Math.min(65, Math.floor((width * height) / 24000));

  for (let i = 0; i < COUNT; i++) {
    const isRed = Math.random() > 0.45;
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.5,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.55 + 0.25,
      color: isRed ? 'rgba(255, 42, 75, ' : 'rgba(255, 255, 255, '
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.shadowBlur = p.r * 5;
      ctx.shadowColor = 'rgba(239, 68, 68, 0.45)';
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

// --------------------------------------------------------------------------
// 3. Project Filter Tabs
// --------------------------------------------------------------------------
function initProjectFilters() {
  const tabs = document.querySelectorAll('.cat-tab');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.getAttribute('data-cat');

      cards.forEach(card => {
        const itemCats = card.getAttribute('data-category') || '';
        if (cat === 'all' || itemCats.includes(cat)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// 4. Skill Filter Tabs
// --------------------------------------------------------------------------
function initSkillFilters() {
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.getAttribute('data-skillcat');

      skillCards.forEach(card => {
        const itemGroups = card.getAttribute('data-skillgroup') || '';
        if (cat === 'all' || itemGroups.includes(cat)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// 5. Contact Form Validation & Feedback
// --------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name-input')?.value.trim();
    const email = document.getElementById('email-input')?.value.trim();
    const message = document.getElementById('message-input')?.value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitText.textContent = 'Send Message';
      if (feedback) {
        feedback.classList.remove('hidden');
      }
      form.reset();

      setTimeout(() => {
        if (feedback) feedback.classList.add('hidden');
      }, 5000);
    }, 700);
  });
}

// --------------------------------------------------------------------------
// 6. Mobile Navigation
// --------------------------------------------------------------------------
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('hidden');
  });

  const links = drawer.querySelectorAll('a');
  links.forEach(l => {
    l.addEventListener('click', () => {
      drawer.classList.add('hidden');
    });
  });
}

// --------------------------------------------------------------------------
// 7. Active Nav Scrolling
// --------------------------------------------------------------------------
function initActiveNavScroll() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentId}`) {
          item.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

// --------------------------------------------------------------------------
// 8. Dynamic Scroll-Interactive Parallax Photos
// --------------------------------------------------------------------------
function initScrollParallaxPhotos() {
  const cards = document.querySelectorAll('.ambient-photo-card');
  if (!cards.length) return;

  let ticking = false;

  function updateParallax() {
    if (window.innerWidth < 1200) return;

    const vh = window.innerHeight;

    cards.forEach(card => {
      const speed = parseFloat(card.getAttribute('data-speed') || '0.15');
      const baseRot = parseFloat(card.getAttribute('data-base-rot') || '0');
      const rect = card.getBoundingClientRect();

      const cardCenterY = rect.top + rect.height / 2;
      const distFromCenter = cardCenterY - vh / 2;

      const offsetY = distFromCenter * speed * -0.4;
      const rot = baseRot + (distFromCenter * 0.004);

      card.style.transform = `translate3d(0, ${offsetY.toFixed(1)}px, 0) rotate(${rot.toFixed(1)}deg)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  updateParallax();
}

// --------------------------------------------------------------------------
// 9. Option 1: Mouse Spotlight Glow on Cards
// --------------------------------------------------------------------------
function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// --------------------------------------------------------------------------
// 10. Option 3: 3D Perspective Tilt Physics
// --------------------------------------------------------------------------
function initTiltCards() {
  // Respect touch devices: don't tilt if user has coarse pointer
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const tiltElements = document.querySelectorAll('.tilt-card');

  tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const rotX = (-y * 12).toFixed(2);
      const rotY = (x * 12).toFixed(2);

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// --------------------------------------------------------------------------
// 11. Option 4: AutoNews 24/7 Simulated Terminal Runner
// --------------------------------------------------------------------------
function initBotSimulator() {
  const testBtn = document.getElementById('btn-simulate-bot');
  const terminal = document.getElementById('bot-terminal');
  const closeBtn = document.getElementById('btn-close-terminal');
  const termBody = document.getElementById('terminal-body');

  if (!testBtn || !terminal || !termBody) return;

  let isRunning = false;

  const simulatedSteps = [
    { tag: '[CRON-INIT]', text: 'Cron trigger dispatched cycle #4812 (Interval: 70m)...', delay: 350 },
    { tag: '[INGESTION]', text: 'Querying 14 India Breaking RSS feeds & Tech news API endpoints...', delay: 750 },
    { tag: '[GEMINI-LLM]', text: 'Prompting Gemini Spark model: synthesizing top headline & caption copy...', delay: 1200 },
    { tag: '[CANVAS-RENDER]', text: 'Generating 1080x1350 editorial news card with typography and watermark...', delay: 1700 },
    { tag: '[FACT-CHECK]', text: 'Automated Fact-check pipeline: PASSED (Confidence 99.4%)', delay: 2200 },
    { tag: '[GMAIL-BRIDGE]', text: 'Appending metadata log to Google Sheets archive via Gmail bridge (India_News.xlsx)', delay: 2700 },
    { tag: '[META-API]', text: 'POST /v19.0/instagram_user/media_publish (Container 180429482910)...', delay: 3200 },
    { tag: '[SUCCESS]', text: 'Post LIVE on @tanmayy__ll! Cycle finished cleanly. Next run in 70m.', delay: 3700, success: true }
  ];

  function getTimestamp() {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  }

  function runSimulation() {
    if (isRunning) return;
    isRunning = true;
    terminal.classList.remove('hidden');

    termBody.innerHTML = `
      <div class="term-line">
        <span class="term-time">[${getTimestamp()}]</span>
        <span class="term-tag">// AutoNews 24/7 Engine</span>
        <span>Starting autonomous cycle...</span>
      </div>
    `;

    testBtn.disabled = true;
    testBtn.style.opacity = '0.7';

    simulatedSteps.forEach((step, idx) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'term-line';
        line.innerHTML = `
          <span class="term-time">[${getTimestamp()}]</span>
          <span class="term-tag ${step.success ? 'term-success' : ''}">${step.tag}</span>
          <span class="${step.success ? 'term-success' : ''}">${step.text}</span>
        `;
        termBody.appendChild(line);
        termBody.scrollTop = termBody.scrollHeight;

        if (idx === simulatedSteps.length - 1) {
          isRunning = false;
          testBtn.disabled = false;
          testBtn.style.opacity = '1';
        }
      }, step.delay);
    });
  }

  testBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    runSimulation();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      terminal.classList.add('hidden');
    });
  }
}

// --------------------------------------------------------------------------
// 12. Option 5: Magnetic Buttons & Social Icons
// --------------------------------------------------------------------------
function initMagneticButtons() {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const magneticTargets = document.querySelectorAll('.magnetic-btn');

  magneticTargets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Smooth magnetic displacement
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

// --------------------------------------------------------------------------
// 13. Option 7: Custom Futuristic Glowing Cursor
// --------------------------------------------------------------------------
function initCustomCursor() {
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');

  if (!dot || !ring) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    dot.classList.remove('custom-cursor-hidden');
    ring.classList.remove('custom-cursor-hidden');
  });

  document.addEventListener('mouseleave', () => {
    dot.classList.add('custom-cursor-hidden');
    ring.classList.add('custom-cursor-hidden');
  });

  document.addEventListener('mousedown', () => {
    ring.classList.add('cursor-active');
  });

  document.addEventListener('mouseup', () => {
    ring.classList.remove('cursor-active');
  });

  // Lerp smoothing loop for trailing ring
  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand ring over interactive elements
  const interactives = 'a, button, input, select, textarea, .spotlight-card, .tilt-card, .cat-tab, .skill-tab, .social-icon-btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactives)) {
      ring.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactives)) {
      ring.classList.remove('cursor-hover');
    }
  });
}

// --------------------------------------------------------------------------
// 14. Option 7: Web Audio Synthesizer & Sound Toggle Feedback
// --------------------------------------------------------------------------
function initSoundEffects() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  let soundEnabled = localStorage.getItem('tanmay_sound_fx') !== 'false'; // default ON

  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        audioCtx = new AudioCtxClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playCyberChirp() {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(1150, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch (err) {
      // AudioContext policy or unsupported
    }
  }

  function updateSoundUI() {
    if (!soundBtn) return;
    const onIcon = soundBtn.querySelector('.icon-sound-on');
    const offIcon = soundBtn.querySelector('.icon-sound-off');

    if (soundEnabled) {
      onIcon?.classList.remove('hidden');
      offIcon?.classList.add('hidden');
      soundBtn.title = 'Sound Effects: ON (Click to mute)';
    } else {
      onIcon?.classList.add('hidden');
      offIcon?.classList.remove('hidden');
      soundBtn.title = 'Sound Effects: MUTED (Click to enable)';
    }
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.preventDefault();
      soundEnabled = !soundEnabled;
      localStorage.setItem('tanmay_sound_fx', soundEnabled);
      updateSoundUI();
      if (soundEnabled) {
        playCyberChirp();
      }
    });
    updateSoundUI();
  }

  // Play satisfying chirp on any button / link click
  document.addEventListener('click', (e) => {
    const clickable = e.target.closest('button, a, input[type="submit"], .cat-tab, .skill-tab');
    if (clickable && clickable !== soundBtn) {
      playCyberChirp();
    }
  });
}
