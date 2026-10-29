if (window.lucide) window.lucide.createIcons();

(() => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeBtn = document.getElementById("closeLightbox");
    const items = [...document.querySelectorAll(".gallery-item")];
    if (!lightbox || !lightboxImg || !closeBtn || !items.length) return;

    let lastFocusedItem = null;
    const close = () => {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        lastFocusedItem?.focus();
    };
    const open = (item) => {
        const img = item.querySelector("img");
        if (!img) return;
        lastFocusedItem = item;
        lightboxImg.src = img.currentSrc || img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        closeBtn.focus();
    };

    items.forEach((item, index) => {
        const img = item.querySelector("img");
        if (!img) return;
        item.tabIndex = 0;
        item.setAttribute("role", "button");
        item.setAttribute("aria-label", `Ampliar ${img.alt || `imagen ${index + 1}`}`);
        item.addEventListener("click", () => open(item));
        item.addEventListener("keydown", (event) => {
            if (event.target !== item) return;
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                open(item);
            }
        });
    });

    closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) close();
    });
    document.addEventListener("keydown", (event) => {
        if (!lightbox.classList.contains("active")) return;
        if (event.key === "Escape") close();
        if (event.key === "Tab") {
            event.preventDefault();
            closeBtn.focus();
        }
    });
})();
