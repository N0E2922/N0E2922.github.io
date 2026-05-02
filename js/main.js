lucide.createIcons();

// --- SCROLL REVEAL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("active");
    });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// --- DARK MODE ---
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    themeBtn.innerHTML = isLight ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    lucide.createIcons();
});

// --- MENU MOBILE ---
const toggle = document.getElementById("toggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => {
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
        menu.style.flexDirection = "column";
        menu.style.position = "absolute";
        menu.style.top = "70px";
        menu.style.left = "0";
        menu.style.width = "100%";
        menu.style.background = "var(--bg)";
        menu.style.padding = "20px";
        menu.style.zIndex = "1000";
    }
});