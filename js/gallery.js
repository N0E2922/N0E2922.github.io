lucide.createIcons();

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeBtn = document.getElementById("closeLightbox");
const galleryImages = document.querySelectorAll(".gallery-item img");
let lastFocusedImage = null;

const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusedImage) lastFocusedImage.focus();
};

galleryImages.forEach((img, index) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `Ampliar ${img.alt || `imagen ${index + 1}`}`);
    const open = () => {
        lastFocusedImage = img;
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        closeBtn.focus();
    };
    img.addEventListener("click", open);
    img.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            open();
        }
    });
});

closeBtn.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) closeLightbox();
});
