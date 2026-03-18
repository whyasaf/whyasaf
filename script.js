document.addEventListener('DOMContentLoaded', () => {

    let lastScrollY = window.scrollY;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }

        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    }, { passive: true });


    const hoverElements = document.querySelectorAll('.translate-hover');

    hoverElements.forEach(item => {
        const originalHTML = item.innerHTML;
        const translatedText = item.getAttribute('data-tr');
        let isTranslated = false;

        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768 && translatedText) {
                item.innerHTML = translatedText;
            }
        });

        item.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                item.innerHTML = originalHTML;
            }
        });

        item.addEventListener('click', () => {
            if (window.innerWidth <= 768 && translatedText) {
                isTranslated = !isTranslated;
                item.innerHTML = isTranslated ? translatedText : originalHTML;
            }
        });
    });


    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            interactivity: {
                events: { onHover: { enable: true, mode: "repulse" }, resize: true },
                modes: { repulse: { distance: 150, duration: 0.4 } }
            },
            particles: {
                color: { value: "#CCCCCC" },
                links: { enable: true, color: "#CCCCCC", distance: 150, opacity: 0.2 },
                move: { enable: true, speed: 0.8, random: true },
                number: { value: window.innerWidth < 768 ? 50 : 120, density: { enable: true, area: 800 } },
                opacity: { value: { min: 0.2, max: 0.5 } },
                size: { value: { min: 1, max: 3 } }
            },
            detectRetina: true
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const targetId = a.getAttribute('href');
            if (targetId === "#") return;

            if (window.location.pathname.includes('ozgecmis.html') && targetId.startsWith('#')) {
                return;
            }

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const carousel = document.getElementById('projects-carousel');
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