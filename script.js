document.addEventListener('DOMContentLoaded', () => {
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        lastScrollY = window.scrollY;
    });
    const hoverElements = document.querySelectorAll('.translate-hover');
    const sidebar = document.getElementById('translation-sidebar');
    if (sidebar) {
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', function () {
                const hoverText = this.getAttribute('data-tr');
                if (hoverText) {
                    sidebar.innerHTML = hoverText;
                    const rect = this.getBoundingClientRect();
                    sidebar.style.top = (rect.top + (rect.height / 2)) + "px";
                    sidebar.classList.add('active');
                }
            });
            el.addEventListener('mouseleave', () => sidebar.classList.remove('active'));
        });
    }
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            interactivity: {
                events: { onHover: { enable: true, mode: "repulse" }, resize: true },
                modes: { repulse: { distance: 150, duration: 0.4 } }
            },
            particles: {
                color: { value: "#CCCCCC" },
                move: { enable: true, speed: 0.8, random: true },
                number: { value: window.innerWidth < 768 ? 80 : 160, density: { enable: true, area: 800 } },
                opacity: { value: { min: 0.3, max: 0.7 } },
                size: { value: { min: 1, max: 3 } }
            },
            detectRetina: true
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const targetId = a.getAttribute('href');
            if (targetId === "#") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    // Carousel arrow navigation
    const carousel = document.getElementById('apple-carousel');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    if (carousel && scrollLeftBtn && scrollRightBtn) {
        scrollLeftBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -340, behavior: 'smooth' });
        });
        scrollRightBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: 340, behavior: 'smooth' });
        });
    }
});