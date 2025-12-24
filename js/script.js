// ===== GLOBAL VARIABLES =====
let musicPlaying = false;
let audio = null;

// ===== NAVIGATION =====
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Initialize page-specific functions
    initSnowfall();
    initCountdown();
    initCarousel();
    initWishesPage();
    initCelebrationPage();
    initMusicToggle();

    console.log('🎄 Merry Christmas! Made with ❤️');
});

// ===== SNOWFALL EFFECT =====
function initSnowfall() {
    const container = document.getElementById('snowContainer');
    if (!container) return;

    const snowflakes = ['❄', '❅', '❆', '✻', '✼', '❉'];

    function createSnowflake() {
        const flake = document.createElement('span');
        flake.className = 'snowflake';
        flake.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.fontSize = (Math.random() * 1 + 0.5) + 'em';
        flake.style.opacity = Math.random() * 0.5 + 0.5;
        flake.style.animationDuration = (Math.random() * 3 + 5) + 's';
        container.appendChild(flake);

        setTimeout(() => flake.remove(), 8000);
    }

    for (let i = 0; i < 20; i++) {
        setTimeout(createSnowflake, Math.random() * 2000);
    }
    setInterval(createSnowflake, 300);
}

// ===== COUNTDOWN =====
function initCountdown() {
    const daysEl = document.getElementById('days');
    if (!daysEl) return;

    function updateCountdown() {
        const christmas = new Date(new Date().getFullYear(), 11, 25);
        const now = new Date();
        if (now > christmas) christmas.setFullYear(christmas.getFullYear() + 1);

        const diff = christmas - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== CAROUSEL =====
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    const slides = track.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    const autoplayBtn = document.getElementById('autoplayBtn');

    let currentSlide = 0;
    let autoplayInterval = null;
    let isAutoplay = true;

    function goToSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        indicators.forEach(i => i.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() { goToSlide(currentSlide + 1); }
    function prevSlide() { goToSlide(currentSlide - 1); }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => goToSlide(i));
    });

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    autoplayBtn.addEventListener('click', () => {
        isAutoplay = !isAutoplay;
        if (isAutoplay) {
            startAutoplay();
            autoplayBtn.innerHTML = '<i class="fas fa-pause"></i><span>Tự động chuyển</span>';
        } else {
            stopAutoplay();
            autoplayBtn.innerHTML = '<i class="fas fa-play"></i><span>Tự động chuyển</span>';
        }
    });

    startAutoplay();
}

// ===== WISHES PAGE =====
function initWishesPage() {
    // Envelope
    const envelope = document.getElementById('wishEnvelope');
    if (envelope) {
        envelope.addEventListener('click', () => {
            envelope.classList.add('open');
        });
    }

    // Love Counter
    const loveBtn = document.getElementById('loveButton');
    const loveCountEl = document.getElementById('loveCount');
    const loveMessage = document.getElementById('loveMessage');

    if (loveBtn) {
        let count = parseInt(localStorage.getItem('loveCount') || '0');
        loveCountEl.textContent = count;

        const messages = [
            'Yêu em! 💕', 'Em là số 1! 🥇', 'Nhớ em! 💭',
            'Thương em nhiều! 💗', 'Em tuyệt vời! ⭐',
            'Mãi yêu em! 💖', 'Em đáng yêu quá! 🥰'
        ];

        loveBtn.addEventListener('click', () => {
            count++;
            loveCountEl.textContent = count;
            localStorage.setItem('loveCount', count);

            loveMessage.textContent = messages[Math.floor(Math.random() * messages.length)];

            // Heart explosion effect
            for (let i = 0; i < 10; i++) {
                createFloatingHeart(loveBtn);
            }
        });
    }

    // Floating hearts background
    const heartsBg = document.getElementById('heartsBg');
    if (heartsBg) {
        setInterval(() => {
            const heart = document.createElement('span');
            heart.innerHTML = ['💕', '💗', '💖', '💝', '❤️'][Math.floor(Math.random() * 5)];
            heart.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                bottom: -50px;
                font-size: ${Math.random() * 1.5 + 1}rem;
                opacity: ${Math.random() * 0.5 + 0.3};
                animation: floatUp ${Math.random() * 5 + 5}s linear forwards;
            `;
            heartsBg.appendChild(heart);
            setTimeout(() => heart.remove(), 10000);
        }, 500);
    }
}

function createFloatingHeart(origin) {
    const heart = document.createElement('span');
    heart.innerHTML = '❤️';
    const rect = origin.getBoundingClientRect();
    heart.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 9999;
        animation: heartFloat 1s ease-out forwards;
    `;
    heart.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
    heart.style.setProperty('--ty', -Math.random() * 100 - 50 + 'px');
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
}

// Add dynamic style for heart float
const heartFloatStyle = document.createElement('style');
heartFloatStyle.textContent = `
    @keyframes heartFloat {
        to {
            transform: translate(var(--tx), var(--ty));
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartFloatStyle);

// ===== CELEBRATION PAGE =====
function initCelebrationPage() {
    const canvas = document.getElementById('fireworksCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Fireworks
    let fireworks = [];
    let particles = [];

    class Firework {
        constructor(x) {
            this.x = x;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * 0.5 + 50;
            this.speed = 8;
            this.exploded = false;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }

        update() {
            if (!this.exploded) {
                this.y -= this.speed;
                if (this.y <= this.targetY) {
                    this.explode();
                }
            }
        }

        explode() {
            this.exploded = true;
            for (let i = 0; i < 100; i++) {
                particles.push(new Particle(this.x, this.y, this.color));
            }
        }

        draw() {
            if (!this.exploded) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.angle = Math.random() * Math.PI * 2;
            this.speed = Math.random() * 5 + 2;
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.1;
            this.alpha -= this.decay;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 26, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        fireworks = fireworks.filter(f => !f.exploded);
        particles = particles.filter(p => p.alpha > 0);

        fireworks.forEach(f => { f.update(); f.draw(); });
        particles.forEach(p => { p.update(); p.draw(); });

        requestAnimationFrame(animate);
    }
    animate();

    function launchFirework() {
        fireworks.push(new Firework(Math.random() * canvas.width));
    }

    // Launch fireworks button
    const launchBtn = document.getElementById('launchFireworks');
    if (launchBtn) {
        launchBtn.addEventListener('click', () => {
            for (let i = 0; i < 5; i++) {
                setTimeout(launchFirework, i * 200);
            }
        });
    }

    // Auto launch
    setInterval(() => {
        if (Math.random() > 0.7) launchFirework();
    }, 2000);

    // Confetti
    const confettiBtn = document.getElementById('launchConfetti');
    const confettiContainer = document.getElementById('confettiContainer');

    if (confettiBtn) {
        confettiBtn.addEventListener('click', () => {
            const colors = ['#e74c3c', '#f39c12', '#2ecc71', '#3498db', '#9b59b6', '#ffd700'];
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti-piece';
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                    if (Math.random() > 0.5) confetti.style.borderRadius = '50%';
                    confettiContainer.appendChild(confetti);
                    setTimeout(() => confetti.remove(), 4000);
                }, i * 20);
            }
        });
    }

    // Big Surprise
    const surpriseBtn = document.getElementById('bigSurprise');
    const surpriseContent = document.getElementById('surpriseMessageContent');

    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', () => {
            surpriseContent.classList.remove('hidden');
            for (let i = 0; i < 10; i++) {
                setTimeout(launchFirework, i * 100);
            }
            confettiBtn.click();
        });
    }

    // Gift Boxes
    document.querySelectorAll('.gift-box-item').forEach(box => {
        box.addEventListener('click', () => {
            box.classList.toggle('opened');
        });
    });

    // Fortune Wheel
    const wheel = document.getElementById('fortuneWheel');
    const spinBtn = document.getElementById('spinBtn');
    const wheelResult = document.getElementById('wheelResult');

    if (spinBtn) {
        const prizes = ['💋 Được hôn!', '🤗 Ôm 10 giây!', '🌙 Đi dạo cùng nhau!', '🍜 Được đi ăn vặt!',
            '📺 Xem phim cùng nhau!', '💌 Được viết thư tay!', '🍜 Đi ăn mì cay!', '🎮 Chơi game cùng nhau!'];

        spinBtn.addEventListener('click', () => {
            spinBtn.disabled = true;
            const rotation = Math.floor(Math.random() * 360) + 1800;
            wheel.style.transform = `rotate(${rotation}deg)`;

            setTimeout(() => {
                const finalRotation = rotation % 360;
                // Tính index: ô nào đang ở vị trí 12 giờ (top), với offset 22.5 độ
                const index = (8 - Math.floor((finalRotation + 22.5) / 45)) % 8;
                wheelResult.innerHTML = `<span style="font-size: 1.5rem;">🎁</span> ${prizes[index]}`;
                spinBtn.disabled = false;
            }, 4000);
        });
    }

    // Party Modes
    const discoBtn = document.getElementById('discoMode');
    const rainbowBtn = document.getElementById('rainbowMode');
    const starsBtn = document.getElementById('starsMode');

    if (discoBtn) {
        discoBtn.addEventListener('click', () => {
            document.body.classList.toggle('disco-mode');
            discoBtn.classList.toggle('active');
            document.body.classList.remove('rainbow-mode');
            rainbowBtn?.classList.remove('active');
        });
    }

    if (rainbowBtn) {
        rainbowBtn.addEventListener('click', () => {
            document.body.classList.toggle('rainbow-mode');
            rainbowBtn.classList.toggle('active');
            document.body.classList.remove('disco-mode');
            discoBtn?.classList.remove('active');
        });
    }

    if (starsBtn) {
        starsBtn.addEventListener('click', () => {
            starsBtn.classList.toggle('active');
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const star = document.createElement('span');
                    star.innerHTML = '⭐';
                    star.style.cssText = `
                        position: fixed;
                        left: ${Math.random() * 100}vw;
                        top: ${Math.random() * 100}vh;
                        font-size: ${Math.random() * 2 + 1}rem;
                        animation: starPop 1s ease-out forwards;
                        z-index: 9999;
                    `;
                    document.body.appendChild(star);
                    setTimeout(() => star.remove(), 1000);
                }, i * 50);
            }
        });
    }
}

// Star pop animation
const starPopStyle = document.createElement('style');
starPopStyle.textContent = `
    @keyframes starPop {
        0% { transform: scale(0); opacity: 1; }
        50% { transform: scale(1.5); }
        100% { transform: scale(1); opacity: 0; }
    }
`;
document.head.appendChild(starPopStyle);

// ===== MUSIC TOGGLE =====
function initMusicToggle() {
    const musicBtn = document.getElementById('musicToggle');
    if (!musicBtn) return;

    // Khởi tạo audio
    audio = new Audio('https://upload.wikimedia.org/wikipedia/commons/e/e8/Jingle_Bells_Bing_Crosby.ogg');
    audio.loop = true;
    audio.volume = 0.3;

    // Tự động phát khi user tương tác lần đầu
    const autoPlay = () => {
        if (!musicPlaying) {
            audio.play().then(() => {
                musicPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(() => { });
        }
        document.removeEventListener('click', autoPlay);
        document.removeEventListener('keydown', autoPlay);
    };
    document.addEventListener('click', autoPlay);
    document.addEventListener('keydown', autoPlay);

    // Nút bật/tắt nhạc
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (musicPlaying) {
            audio.pause();
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            audio.play().catch(() => { });
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        musicPlaying = !musicPlaying;
    });
}

// ===== CLICK SPARKLE =====
document.addEventListener('click', (e) => {
    const sparkle = document.createElement('span');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 9999;
        animation: sparkle 0.5s ease-out forwards;
    `;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 500);
});

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        to { transform: scale(2) rotate(180deg); opacity: 0; }
    }
`;
document.head.appendChild(sparkleStyle);

// ===== EASTER EGG =====
let typed = '';
document.addEventListener('keypress', (e) => {
    typed += e.key.toLowerCase();
    if (typed.includes('love')) {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const heart = document.createElement('span');
                heart.innerHTML = '❤️';
                heart.style.cssText = `
                    position: fixed;
                    left: 50vw;
                    top: 50vh;
                    font-size: 2rem;
                    animation: explode 1s ease-out forwards;
                    --angle: ${Math.random() * 360}deg;
                    --distance: ${Math.random() * 200 + 100}px;
                `;
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 1000);
            }, i * 30);
        }
        typed = '';
    }
    if (typed.length > 10) typed = typed.slice(-4);
});

const explodeStyle = document.createElement('style');
explodeStyle.textContent = `
    @keyframes explode {
        to {
            transform: translate(
                calc(cos(var(--angle)) * var(--distance)),
                calc(sin(var(--angle)) * var(--distance))
            );
            opacity: 0;
        }
    }
`;
document.head.appendChild(explodeStyle);
