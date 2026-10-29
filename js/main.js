if (window.lucide) window.lucide.createIcons();

const certificateCount = document.querySelectorAll(".cert-card").length;
const certificateCountLabel = document.getElementById("certCount");
if (certificateCountLabel) {
    certificateCountLabel.textContent = `${certificateCount} ${certificateCount === 1 ? "certificación" : "certificaciones"}`;
}

const themeBtn = document.getElementById("themeToggle");
const themeStorageKey = "noe2922-theme";
const getStoredTheme = () => {
    try { return localStorage.getItem(themeStorageKey); }
    catch { return null; }
};
const storeTheme = (theme) => {
    try { localStorage.setItem(themeStorageKey, theme); }
    catch { /* El tema sigue funcionando durante esta visita. */ }
};
const setTheme = (isLight) => {
    document.body.classList.toggle("light", isLight);
    if (!themeBtn) return;
    themeBtn.setAttribute("aria-label", isLight ? "Cambiar a tema oscuro" : "Cambiar a tema claro");
    themeBtn.setAttribute("aria-pressed", String(isLight));
    themeBtn.innerHTML = isLight ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    if (window.lucide) window.lucide.createIcons();
};
setTheme(getStoredTheme() === "light");

// --- SCROLL REVEAL ---
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
} else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("active"));
}

// --- DARK MODE ---
themeBtn?.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light");
    storeTheme(isLight ? "light" : "dark");
    setTheme(isLight);
});

// --- MENU MOBILE ---
const toggle = document.getElementById("toggle");
const menu = document.getElementById("menu");
if (toggle && menu) {
    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });
    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
    }));
}
document.addEventListener("keydown", event => {
    if (!toggle || !menu) return;
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
        toggle.focus();
    }
});
