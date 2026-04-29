/* =========================
   🚀 SAFE INITIALIZATION
========================= */
document.addEventListener("DOMContentLoaded", () => {


/* =========================
   🌙 DARK MODE TOGGLE
========================= */
window.toggleMode = function(){
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};

/* Load saved theme */
if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark");
}


/* =========================
   ✨ PARTICLES (SAFE LOAD)
========================= */
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
      move: {
        speed: 1.5,
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true
      },
      modes: {
        grab: {
          distance: 150,
          line_linked: { opacity: 0.7 }
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true
  });
}


/* =========================
   🔥 SCROLL REVEAL
========================= */
const revealElements = document.querySelectorAll("section, .card, .stat");

function revealOnScroll(){
  const trigger = window.innerHeight * 0.85;

  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if(top < trigger){
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* =========================
   🚀 SMOOTH SCROLL
========================= */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e){
    const target = document.querySelector(this.getAttribute("href"));

    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* =========================
   💫 RIPPLE EFFECT (FIXED)
========================= */
document.querySelectorAll(".btn, button").forEach(btn => {
  btn.style.position = "relative";
  btn.style.overflow = "hidden";

  btn.addEventListener("click", function(e){
    const circle = document.createElement("span");

    circle.style.position = "absolute";
    circle.style.width = "120px";
    circle.style.height = "120px";
    circle.style.background = "rgba(255,255,255,0.4)";
    circle.style.borderRadius = "50%";
    circle.style.transform = "translate(-50%, -50%)";
    circle.style.left = e.offsetX + "px";
    circle.style.top = e.offsetY + "px";

    this.appendChild(circle);
    setTimeout(() => circle.remove(), 500);
  });
});


/* =========================
   📈 COUNTER (ON VIEW)
========================= */
const counters = document.querySelectorAll(".stat h2");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const counter = entry.target;

        const update = () => {
          let target = +counter.innerText.replace("+","") || 0;
          let count = +counter.getAttribute("data-count") || 0;
          let speed = target / 80;

          if(count < target){
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


/* =========================
   🧠 CUSTOM CURSOR (DESKTOP ONLY)
========================= */
if(window.innerWidth > 768){
  const cursor = document.createElement("div");

  cursor.style.width = "12px";
  cursor.style.height = "12px";
  cursor.style.background = "#06b6d4";
  cursor.style.borderRadius = "50%";
  cursor.style.position = "fixed";
  cursor.style.pointerEvents = "none";
  cursor.style.zIndex = "9999";

  document.body.appendChild(cursor);

  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}


/* =========================
   ⚡ CARD HOVER GLOW
========================= */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(circle at ${x}px ${y}px,
      rgba(6,182,212,0.25),
      rgba(255,255,255,0.1))
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "";
  });
});
// 1. Function to toggle and SAVE the preference
function toggleMode() {
    const body = document.body;
    const icon = document.getElementById("themeIcon");
    
    // Toggle the class
    body.classList.toggle("dark");
    
    // Check if dark mode is now active
    const isDark = body.classList.contains("dark");
    
    // Save the choice in localStorage (this stays even after refresh)
    localStorage.setItem("theme", isDark ? "dark" : "light");
    
    // Update the icon
    updateIcon(isDark);
}

// 2. Function to update the icon appearance
function updateIcon(isDark) {
    const icon = document.getElementById("themeIcon");
    if (icon) {
        if (isDark) {
            icon.classList.replace("fa-moon", "fa-sun"); // Change moon to sun in dark mode
        } else {
            icon.classList.replace("fa-sun", "fa-moon"); // Change sun to moon in light mode
        }
    }
}

// 3. APPLY the saved theme immediately when the page loads
(function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");
    const body = document.body;
    
    if (savedTheme === "dark") {
        body.classList.add("dark");
        // We use window.onload to ensure the icon exists before trying to change it
        window.addEventListener('DOMContentLoaded', () => updateIcon(true));
    }
})();


}); // END DOM LOADED