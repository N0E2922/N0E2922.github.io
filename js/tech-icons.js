/*
 * Registro de tecnologías.
 * Uso en HTML:  <span class="tech" data-tech="laravel">Laravel</span>
 * El script inserta el logo antes del texto. Si el logo no carga (o la
 * tecnología no tiene logo), usa un icono de Lucide como respaldo.
 */
(() => {
    const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";
    const dev = (name, variant = "original") => `${DEVICON}/${name}/${name}-${variant}.svg`;

    // clave: { img: url del logo (opcional), icon: icono Lucide de respaldo }
    const TECH = {
        php:        { img: dev("php"),                 icon: "code-2" },
        laravel:    { img: dev("laravel"),             icon: "code-2" },
        filament:   {                                  icon: "layout-dashboard" },
        nodejs:     { img: dev("nodejs"),              icon: "server" },
        python:     { img: dev("python"),              icon: "terminal" },
        api:        {                                  icon: "plug" },
        html:       { img: dev("html5"),               icon: "layout" },
        css:        { img: dev("css3"),                icon: "palette" },
        javascript: { img: dev("javascript"),          icon: "braces" },
        vue:        { img: dev("vuejs"),               icon: "layout" },
        ionic:      { img: dev("ionic"),               icon: "smartphone" },
        postgresql: { img: dev("postgresql"),          icon: "database" },
        mysql:      { img: dev("mysql"),               icon: "database" },
        sqlserver:  { img: dev("microsoftsqlserver"),  icon: "database" },
        dbeaver:    {                                  icon: "database-zap" },
        ssms:       {                                  icon: "database-zap" },
        uml:        {                                  icon: "workflow" },
        docker:     { img: dev("docker"),              icon: "container" },
        git:        { img: dev("git"),                 icon: "git-branch" },
        gitlab:     { img: dev("gitlab"),              icon: "git-merge" },
        fedora:     { img: dev("fedora"),              icon: "terminal" },
        jira:       { img: dev("jira"),                icon: "kanban" },
        postman:    { img: dev("postman"),             icon: "send" },
        xampp:      { img: dev("xampp"),               icon: "server" }
    };

    const buildIcon = (key) => {
        const tech = TECH[key];
        if (!tech) return null;

        const wrap = document.createElement("span");
        wrap.className = "tech-logo";
        wrap.setAttribute("aria-hidden", "true");

        const useFallback = () => {
            wrap.classList.add("is-fallback");
            wrap.innerHTML = `<i data-lucide="${tech.icon}"></i>`;
            if (window.lucide) window.lucide.createIcons({ nameAttr: "data-lucide" });
        };

        if (tech.img) {
            const img = new Image();
            img.src = tech.img;
            img.alt = "";
            img.loading = "lazy";
            img.decoding = "async";
            img.addEventListener("error", useFallback, { once: true });
            wrap.appendChild(img);
        } else {
            useFallback();
        }
        return wrap;
    };

    const init = () => {
        document.querySelectorAll("[data-tech]").forEach((el) => {
            if (el.querySelector(".tech-logo")) return;
            const logo = buildIcon(el.dataset.tech);
            if (logo) el.prepend(logo);
        });
        if (window.lucide) window.lucide.createIcons();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
