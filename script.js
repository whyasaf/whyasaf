document.addEventListener('DOMContentLoaded', () => {

    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }
    if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');

    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    }, { passive: true });

    function setupCarousel(wrapperSelector, prevBtnSelector, nextBtnSelector) {
        const wrapper = document.querySelector(wrapperSelector);
        const btnPrev = document.querySelector(prevBtnSelector);
        const btnNext = document.querySelector(nextBtnSelector);
        if (wrapper && btnPrev && btnNext) {
            const scrollOffset = 344;
            btnNext.onclick = () => wrapper.scrollBy({ left: scrollOffset, behavior: 'smooth' });
            btnPrev.onclick = () => wrapper.scrollBy({ left: -scrollOffset, behavior: 'smooth' });
        }
    }
    setupCarousel('.skills-carousel', '.prev-skill', '.next-skill');
    setupCarousel('.apple-cards-wrapper', '.prev-arrow', '.next-arrow');

    const hoverElements = document.querySelectorAll('.translate-hover');

    hoverElements.forEach(item => {
        const originalHTML = item.innerHTML;
        const translatedText = item.getAttribute('data-tr');
        let isTranslated = false;

        const showTranslation = () => {
            if (translatedText) {
                item.style.minHeight = item.offsetHeight + "px";
                item.innerHTML = translatedText;
                isTranslated = true;
            }
        };

        const showOriginal = () => {
            item.innerHTML = originalHTML;
            item.style.minHeight = "";
            isTranslated = false;
        };

        item.addEventListener('mouseenter', () => { if (window.innerWidth > 768) showTranslation(); });
        item.addEventListener('mouseleave', () => { if (window.innerWidth > 768) showOriginal(); });

        item.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (e.target.closest('a') || e.target.closest('button')) {
                    return;
                }

                e.preventDefault();
                if (!isTranslated) showTranslation(); else showOriginal();
            }
        });
    });

    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 120,
            fullScreen: { enable: true, zIndex: -1 },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: ["grab", "bubble"] },
                    onClick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 250, links: { opacity: 0.6, color: "#86868b" } },
                    bubble: { distance: 200, size: 4, duration: 2, opacity: 0.8 },
                    push: { quantity: 4 }
                }
            },
            particles: {
                color: { value: ["#FF3B30", "#FF9500", "#FFCC00", "#34C759", "#007AFF", "#5856D6", "#AF52DE"] },
                links: { enable: true, color: "random", distance: 150, opacity: 0.2, width: 1 },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    outModes: {
                        default: "out"
                    },
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                },
                number: {
                    value: window.innerWidth < 768 ? 50 : 120,
                    density: {
                        enable: true,
                        area: 800
                    }
                },
                number: { value: window.innerWidth < 768 ? 45 : 120, density: { enable: true, area: 800 } },
                opacity: { value: { min: 0.1, max: 0.4 }, animation: { enable: true, speed: 0.5, minimumValue: 0.1 } },
                size: { value: { min: 1, max: 2.5 } }
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

    const profilePic = document.querySelector('.wa-profile-pic');
    if (profilePic) {
        profilePic.addEventListener('mousemove', (e) => {
            const { offsetWidth: width, offsetHeight: height } = profilePic;
            const { offsetX: x, offsetY: y } = e;
            const moveX = (x / width - 0.5) * 8;
            const moveY = (y / height - 0.5) * 8;
            profilePic.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg) scale(1.03)`;
        });
        profilePic.addEventListener('mouseleave', () => {
            profilePic.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    }
});