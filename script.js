// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 2500);
});

// ===== FLOATING HEARTS =====
function createFloatingHeart() {
    const container = document.getElementById('floatingHearts');
    const heart = document.createElement('div');
    heart.className = 'floating-heart heart-shape';
    heart.style.left = Math.random() * 100 + '%';
    const size = Math.random() * 20 + 10;
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(heart);

    setTimeout(() => heart.remove(), 16000);
}

setInterval(createFloatingHeart, 800);

// ===== SCROLL REVEAL =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== NAV BAR SHOW/HIDE =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navBar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.classList.add('visible');
    } else {
        nav.classList.remove('visible');
    }
    lastScroll = currentScroll;
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ===== MUSIC PLAYER =====
let currentAudio = null;
let currentVisualizer = null;
let visualizerInterval = null;

function togglePlay(card, audioId) {
    const audio = document.getElementById(audioId);
    const btn = document.getElementById('btn-' + audioId);
    const icon = document.getElementById('icon-' + audioId);
    const vizId = 'viz-' + audioId;

    // Stop other playing audio
    if (currentAudio && currentAudio !== audio && !currentAudio.paused) {
        currentAudio.pause();
        document.querySelectorAll('.play-btn').forEach(b => b.textContent = '▶');
        document.querySelectorAll('.music-icon').forEach(i => i.classList.remove('playing'));
        clearInterval(visualizerInterval);
    }

    if (audio.paused) {
        audio.play().catch(() => {
            console.warn('Audio playback was blocked or failed.');
        });

        btn.textContent = '⏸';
        icon.classList.add('playing');
        currentAudio = audio;
        currentVisualizer = vizId;
        startVisualizer(vizId);
    } else {
        audio.pause();
        btn.textContent = '▶';
        icon.classList.remove('playing');
        clearInterval(visualizerInterval);
    }
}

function startVisualizer(vizId) {
    clearInterval(visualizerInterval);
    visualizerInterval = setInterval(() => {
        const bars = document.querySelectorAll('#' + vizId + ' .visualizer-bar');
        bars.forEach(bar => {
            bar.style.height = (Math.random() * 20 + 5) + 'px';
        });
    }, 150);
}

// ===== CURSOR TRAIL =====
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice) {
    const trails = [];
    const maxTrails = 15;

    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        document.body.appendChild(trail);
        trails.push(trail);

        if (trails.length > maxTrails) {
            const old = trails.shift();
            old.remove();
        }

        trails.forEach((t, i) => {
            t.style.opacity = (i / maxTrails) * 0.6;
            t.style.transform = `scale(${0.3 + (i / maxTrails) * 0.7})`;
        });

        setTimeout(() => {
            if (trail.parentNode) trail.remove();
            const idx = trails.indexOf(trail);
            if (idx > -1) trails.splice(idx, 1);
        }, 600);
    });
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
    }
});

// ===== HEART BEAT ON CLICK =====
document.addEventListener('click', (e) => {
    // Don't create heart if clicking on interactive elements
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.music-card')) return;

    const heart = document.createElement('div');
    heart.className = 'click-heart heart-shape';
    heart.style.position = 'fixed';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.width = '24px';
    heart.style.height = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9999';
    heart.style.animation = 'floatUp 1.5s ease-out forwards';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log('%c🌹 مرحباً بك في موقع الحب!', 'font-size: 20px; color: #E8A4B8; font-weight: bold;');
console.log('%cلإضافة صورك الخاصة:', 'font-size: 14px; color: #D4A574;');
console.log('1. استبدل روابط الصور في عناصر img داخل قسم gallery-section');
console.log('2. استبدل روابط الملفات الصوتية في عناصر audio');
console.log('3. غيّر النصوص لتناسب قصتكما');
console.log('4. لتخصيص الألوان، عدّل متغيرات CSS في :root');
