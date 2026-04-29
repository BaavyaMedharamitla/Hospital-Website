/* ============================================================
   🌙 GLOBAL THEME ENGINE (Executes Immediately)
   ============================================================ */
(function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
    }
})();

/* ============================================================
   🚀 SHARED PAGE LOGIC (Wait for DOM)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeIcon = document.getElementById("themeIcon");

    // 1. Sync body and icon state on load
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark");
        if (themeIcon) themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    // 2. Global Toggle Function
    window.toggleMode = function() {
        body.classList.toggle("dark");
        const isDark = body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        if (themeIcon) {
            if (isDark) {
                themeIcon.classList.replace("fa-moon", "fa-sun");
            } else {
                themeIcon.classList.replace("fa-sun", "fa-moon");
            }
        }
    };

    // 3. Initialize AOS (Animations)
    if (window.AOS) {
        AOS.init({ duration: 1000, once: true });
    }

    // 4. Initialize Particles
    if (window.particlesJS && document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#06b6d4" },
                opacity: { value: 0.3 },
                size: { value: 3 },
                line_linked: { enable: true, distance: 150, color: "#60a5fa", opacity: 0.2 },
                move: { speed: 1.5 }
            }
        });
    }

    // 5. Global Counter Logic
    const counters = document.querySelectorAll(".count, .counter");
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute("data-target") || parseInt(counter.innerText);
                let count = 0;
                const update = () => {
                    const speed = target / 100;
                    if (count < target) {
                        count += speed;
                        counter.innerText = Math.floor(count) + "+";
                        setTimeout(update, 20);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                update();
                countObserver.unobserve(counter);
            }
        });
    });
    counters.forEach(c => countObserver.observe(c));
});
