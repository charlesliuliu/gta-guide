/* ========================================
   Los Santos Guide — Interactive Features
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ======== THEME TOGGLE ========
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const saved = localStorage.getItem('ls-guide-theme');
        if (saved) document.documentElement.setAttribute('data-theme', saved);

        themeBtn.addEventListener('click', () => {
            const html = document.documentElement;
            const curr = html.getAttribute('data-theme');
            const next = curr === 'light' ? '' : 'light';
            html.setAttribute('data-theme', next || '');
            localStorage.setItem('ls-guide-theme', next || 'dark');
            themeBtn.textContent = next === 'light' ? '☀️' : '🌙';
        });
    }

    // ======== BACK TO TOP ========
    const backBtn = document.getElementById('back-top');
    if (backBtn) {
        window.addEventListener('scroll', () => {
            backBtn.classList.toggle('visible', window.scrollY > 400);
        });
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ======== WEEKLY COUNTDOWN ========
    const cd = document.getElementById('countdown');
    if (cd) {
        function updateCountdown() {
            const now = new Date();
            // Next Thursday at 10am UTC (GTA weekly reset)
            const target = new Date(now);
            target.setUTCDate(target.getUTCDate() + (4 + 7 - target.getUTCDay()) % 7 || 7);
            target.setUTCHours(10, 0, 0, 0);
            if (target <= now) target.setUTCDate(target.getUTCDate() + 7);

            const diff = target - now;
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);

            cd.textContent = `${d}d ${h}h ${m}m ${s}s`;
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ======== HEIST CALCULATOR ========
    const calcForm = document.getElementById('heist-calc');
    if (calcForm) {
        const heistSelect = document.getElementById('heist-select');
        const playersSelect = document.getElementById('players-select');
        const resultDiv = document.getElementById('calc-result');

        const heistData = {
            'cayo':    { base: 1500000, name: 'Cayo Perico Heist' },
            'casino':  { base: 1200000, name: 'Diamond Casino Heist' },
            'doomsday':{ base: 1200000, name: 'Doomsday Heist (Act III)' },
            'pacific': { base: 1000000, name: 'Pacific Standard Job' },
            'humane':  { base: 675000,  name: 'Humane Labs Raid' },
            'prison':  { base: 400000,  name: 'Prison Break' },
        };

        function updateCalc() {
            const heist = heistData[heistSelect.value];
            if (!heist) { resultDiv.innerHTML = ''; return; }
            const players = parseInt(playersSelect.value);
            const leaderCut = heist.base * 0.55;
            const memberCut = heist.base * 0.15;
            const leaderPerPlayer = players > 1 ? heist.base * 0.55 : heist.base;
            const memberPayout = players > 1 ? (heist.base * 0.45) / (players - 1) : 0;

            let html = `<strong>${heist.name}</strong><br>`;
            html += `<span>Total take: <strong>$${heist.base.toLocaleString()}</strong></span><br>`;
            html += `<span>Leader gets: <strong>$${leaderPerPlayer.toLocaleString()}</strong></span>`;
            if (players > 1) {
                html += `<br><span>Each crew member: <strong>$${Math.round(memberPayout).toLocaleString()}</strong></span>`;
            }
            resultDiv.innerHTML = html;
        }

        heistSelect.addEventListener('change', updateCalc);
        playersSelect.addEventListener('change', updateCalc);
        updateCalc();
    }

    // ======== SCROLL ANIMATIONS (Intersection Observer) ========
    if ('IntersectionObserver' in window) {
        const animEls = document.querySelectorAll('.card, .feature-card, .tool-card, .section-title');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeUp .5s ease both';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animEls.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // ======== SHARE BUTTONS ========
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let href;
            if (platform === 'twitter') {
                href = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
            } else if (platform === 'reddit') {
                href = `https://reddit.com/submit?url=${url}&title=${title}`;
            }
            if (href) window.open(href, '_blank', 'width=600,height=400');
        });
    });
});
