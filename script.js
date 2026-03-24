document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkModeToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light",
      );
    });
  }
  if (localStorage.getItem("theme") === "dark")
    document.body.classList.add("dark-mode");

  let lastScrollY = window.scrollY;
  const navbar = document.getElementById("navbar");
  window.addEventListener(
    "scroll",
    () => {
      if (!navbar) return;
      navbar.classList.toggle("navbar-scrolled", window.scrollY > 50);
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }
      lastScrollY = window.scrollY;
    },
    { passive: true },
  );

  function setupCarousel(wrapperSelector, prevBtnSelector, nextBtnSelector) {
    const wrapper = document.querySelector(wrapperSelector);
    const btnPrev = document.querySelector(prevBtnSelector);
    const btnNext = document.querySelector(nextBtnSelector);
    if (wrapper && btnPrev && btnNext) {
      const scrollOffset = 344;
      btnNext.onclick = () =>
        wrapper.scrollBy({ left: scrollOffset, behavior: "smooth" });
      btnPrev.onclick = () =>
        wrapper.scrollBy({ left: -scrollOffset, behavior: "smooth" });
    }
  }
  setupCarousel(".skills-carousel", ".prev-skill", ".next-skill");
  setupCarousel(".apple-cards-wrapper", ".prev-arrow", ".next-arrow");

  const hoverElements = document.querySelectorAll(".translate-hover");

  hoverElements.forEach((item) => {
    const originalHTML = item.innerHTML;
    const translatedText = item.getAttribute("data-tr");
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

    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) showTranslation();
    });
    item.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) showOriginal();
    });

    item.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        if (e.target.closest("a") || e.target.closest("button")) {
          return;
        }

        e.preventDefault();
        if (!isTranslated) showTranslation();
        else showOriginal();
      }
    });
  });

  if (typeof tsParticles !== "undefined") {
    tsParticles.load("tsparticles", {
      fpsLimit: 120,
      fullScreen: { enable: true, zIndex: -1 },
      interactivity: {
        events: {
          onHover: { enable: true, mode: ["grab", "bubble"] },
          onClick: { enable: true, mode: "push" },
          resize: true,
        },
        modes: {
          grab: { distance: 250, links: { opacity: 0.6, color: "#86868b" } },
          bubble: { distance: 200, size: 4, duration: 2, opacity: 0.8 },
          push: { quantity: 4 },
        },
      },
      particles: {
        color: {
          value: [
            "#FF3B30",
            "#FF9500",
            "#FFCC00",
            "#34C759",
            "#007AFF",
            "#5856D6",
            "#AF52DE",
          ],
        },
        links: {
          enable: true,
          color: "random",
          distance: 150,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
        number: {
          value: window.innerWidth < 768 ? 50 : 120,
          density: {
            enable: true,
            area: 800,
          },
        },
        number: {
          value: window.innerWidth < 768 ? 45 : 120,
          density: { enable: true, area: 800 },
        },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: { enable: true, speed: 0.5, minimumValue: 0.1 },
        },
        size: { value: { min: 1, max: 2.5 } },
      },
      detectRetina: true,
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const targetId = a.getAttribute("href");
      if (targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const profilePic = document.querySelector(".wa-profile-pic");
  if (profilePic) {
    profilePic.addEventListener("mousemove", (e) => {
      const { offsetWidth: width, offsetHeight: height } = profilePic;
      const { offsetX: x, offsetY: y } = e;
      const moveX = (x / width - 0.5) * 8;
      const moveY = (y / height - 0.5) * 8;
      profilePic.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg) scale(1.03)`;
    });
    profilePic.addEventListener("mouseleave", () => {
      profilePic.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  }
});

/* ==========================================================================
   PORTFOLYO ANA BEYNİ (DARK MODE, HAMBURGER, HAVA DURUMU)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // 1. DARK MODE OPERASYONU
  const toggleBtn = document.getElementById("darkModeToggle");
  if (toggleBtn) {
    const sunIcon = toggleBtn.querySelector(".sun-icon");
    const moonIcon = toggleBtn.querySelector(".moon-icon");

    if (document.documentElement.getAttribute("data-theme") === "dark") {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }

    toggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      if (newTheme === "dark") {
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
      } else {
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
      }
    });
  }

  // 2. HAMBURGER MENÜ (MOBİL)
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navLinks = document.querySelector(".nav-links");

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // 3. HAVA DURUMU (SVG + İSTANBUL)
  const weatherWidget = document.getElementById("weatherWidget");

  if (weatherWidget) {
    const getSVGIcon = (code) => {
      if (code === 0)
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`; // Güneş
      if (code >= 1 && code <= 3)
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`; // Bulut
      if (code >= 51 && code <= 67)
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.2 20.8 14 16"/><path d="M12 21.2 9.8 17"/><path d="M7.8 20.8 5.6 16"/><path d="M20 10.1A7 7 0 0 0 5.8 9.8C2 10 2 15 5 15h13.2c2.8 0 2.8-5 1.8-4.9Z"/></svg>`; // Yağmur
      if (code >= 71 && code <= 77)
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m20 17.5-6.5-4 6.5-4"/><path d="m4 17.5 6.5-4-6.5-4"/><path d="M12 2v20"/></svg>`; // Kar
      return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`; // Varsayılan
    };

    const updateWidget = (temp, code, city) => {
      weatherWidget.innerHTML = `${getSVGIcon(code)} <span>${city} ${temp}°C</span>`;
    };

    const fetchWeatherAndCity = (lat, lon, forcedCity = null) => {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
      )
        .then((r) => r.json())
        .then((weatherData) => {
          const temp = Math.round(weatherData.current_weather.temperature);
          const code = weatherData.current_weather.weathercode;

          if (forcedCity) {
            updateWidget(temp, code, forcedCity);
          } else {
            fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=tr`,
            )
              .then((res) => res.json())
              .then((cityData) => {
                const city = cityData.city || cityData.locality || "İstanbul";
                updateWidget(temp, code, city);
              })
              .catch(() => updateWidget(temp, code, "İstanbul"));
          }
        })
        .catch(() => updateWidget("--", 0, "İstanbul"));
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          fetchWeatherAndCity(
            position.coords.latitude,
            position.coords.longitude,
          ),
        (error) => fetchWeatherAndCity(41.0082, 28.9784, "İstanbul"),
      );
    } else {
      fetchWeatherAndCity(41.0082, 28.9784, "İstanbul");
    }
  }
});
