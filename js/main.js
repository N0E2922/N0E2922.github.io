lucide.createIcons();

const themeBtn = document.getElementById("themeToggle");
const themeStorageKey = "noe2922-theme";
const setTheme = (isLight) => {
    document.body.classList.toggle("light", isLight);
    themeBtn.setAttribute("aria-label", isLight ? "Cambiar a tema oscuro" : "Cambiar a tema claro");
    themeBtn.setAttribute("aria-pressed", String(isLight));
    themeBtn.innerHTML = isLight ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    lucide.createIcons();
};
setTheme(localStorage.getItem(themeStorageKey) === "light");

// --- SCROLL REVEAL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("active");
    });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// --- DARK MODE ---
themeBtn.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light");
    localStorage.setItem(themeStorageKey, isLight ? "light" : "dark");
    setTheme(isLight);
});

// --- MENU MOBILE ---
const toggle = document.getElementById("toggle");
const menu = document.getElementById("menu");
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
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
        toggle.focus();
    }
});
