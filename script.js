/* ============================================================
   🌙 GLOBAL THEME ENGINE (Runs immediately to prevent flashing)
   ============================================================ */
(function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    }
})();

/* ============================================================
   🚀 SAFE INITIALIZATION (Runs after DOM is ready)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    /* --- 1. THEME TOGGLE LOGIC --- */
    const themeIcon = document.getElementById("themeIcon");

    // Initialize icon state on page load
    if (document.body.classList.contains("dark") && themeIcon) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    window.toggleMode = function () {
        const body = document.body;
        body.classList.toggle("dark");

        const isDark = body.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        // Update Icon
        if (themeIcon) {
            if (isDark) {
                themeIcon.classList.replace("fa-moon", "fa-sun");
            } else {
                themeIcon.classList.replace("fa-sun", "fa-moon");
            }
        }
    };

    /* --- 2. ✨ PARTICLES (SAFE LOAD) --- */
    if (window.particlesJS && document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 80 },
                size: { value: 3 },
                color: { value: "#60a5fa" },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: "#60a5fa",
                    opacity: 0.4,
                    width: 1
                },
                move: { speed: 1.5, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    /* --- 3. 🔥 SCROLL REVEAL --- */
    const revealElements = document.querySelectorAll("section, .card, .stat");
    function revealOnScroll() {
        const trigger = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < trigger) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    /* --- 4. 📈 COUNTER (ON VIEW) --- */
    const counters = document.querySelectorAll(".stat h2");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const update = () => {
                        let target = +counter.innerText.replace("+", "") || 0;
                        let count = +counter.getAttribute("data-count") || 0;
                        let speed = target / 80;
                        if (count < target) {
                            count += speed;
                            counter.setAttribute("data-count", count);
                            counter.innerText = Math.floor(count) + "+";
                            setTimeout(update, 20);
                        } else {
                            counter.innerText = target + "+";
                        }
                    };
                    update();
                    observer.unobserve(counter);
                }
            });
        });
        counters.forEach(c => observer.observe(c));
    }

    /* --- 5. ⚡ CARD HOVER GLOW --- */
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(6,182,212,0.15), rgba(255,255,255,0.05))`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.background = "";
        });
    });

    /* --- 6. 💫 RIPPLE EFFECT --- */
    document.querySelectorAll(".btn, button, .submit-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            const circle = document.createElement("span");
            const d = Math.max(this.clientWidth, this.clientHeight);
            circle.style.width = circle.style.height = d + 'px';
            circle.style.left = e.clientX - this.getBoundingClientRect().left - d / 2 + 'px';
            circle.style.top = e.clientY - this.getBoundingClientRect().top - d / 2 + 'px';
            circle.classList.add('ripple-span'); // Add CSS class for animation
            this.appendChild(circle);
            setTimeout(() => circle.remove(), 500);
        });
    });

}); // END DOM LOADED
