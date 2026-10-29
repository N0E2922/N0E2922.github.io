(() => {
    const projects = {
        activo: {
            title: "Sistema de Gestión de Activo Fijo",
            summary: "Control de bienes, depreciación automática y reportes contables en PDF.",
            category: "Sistema web",
            image: "assets/img/activo-portada.webp",
            page: "pages/activoFijo.html",
            technologies: ["php", "laravel", "filament", "mysql"],
            gallery: ["activo-01.webp", "activo-02.webp", "activo-03.webp", "activo-04.webp", "activo-05.webp", "activo-06.webp", "activo-07.webp", "activo-08.webp", "activo-09.webp", "activo-10.webp"]
        },
        delivery: {
            title: "App Delivery (Burguezza)",
            summary: "App de pedidos a domicilio con API REST integrada y panel administrativo.",
            category: "App móvil",
            image: "assets/img/app-portada.webp",
            page: "pages/appDelivery.html",
            repository: "https://github.com/N0E2922/Laravel-Api",
            technologies: ["php", "laravel", "ionic", "mysql"],
            gallery: ["app-pedido-01.webp", "app-pedido-02.webp", "app-pedido-03.webp", "app-pedido-04.webp", "app-pedido-05.webp", "app-pedido-06.webp", "app-pedido-07.webp", "app-pedido-08.webp", "app-pedido-09.webp"]
        },
        restaurante: {
            title: "Sistema de Restaurante BURGUEZZA",
            summary: "Gestión de las operaciones administrativas y el servicio diario de un restaurante.",
            category: "Sistema web",
            image: "assets/img/restaurante-portada.webp",
            page: "pages/sistemacomida.html",
            repository: "https://github.com/N0E2922/Sistema-de-Restaurante-Burguezza",
            technologies: ["php", "laravel", "mysql"],
            gallery: ["restaurante-01.webp", "restaurante-02.webp", "restaurante-03.webp", "restaurante-04.webp", "restaurante-05.webp", "restaurante-06.webp", "restaurante-07.webp", "restaurante-08.webp", "restaurante-09.webp", "restaurante-10.webp"]
        }
    };

    const makeTech = (key) => {
        const chip = document.createElement("span");
        chip.className = "tech";
        chip.dataset.tech = key;
        chip.textContent = ({ php: "PHP", laravel: "Laravel", filament: "Filament", mysql: "MySQL", ionic: "Ionic" })[key] || key;
        return chip;
    };

    const card = (project, index) => {
        const article = document.createElement("article");
        article.className = "project-card";
        const imageBox = document.createElement("div");
        imageBox.className = "project-img-box";
        const image = document.createElement("img");
        image.src = project.image;
        image.alt = project.title;
        image.loading = "lazy";
        const number = document.createElement("span");
        number.className = "project-num";
        number.setAttribute("aria-hidden", "true");
        number.textContent = String(index + 1).padStart(2, "0");
        const category = document.createElement("span");
        category.className = "project-cat";
        category.textContent = project.category;
        imageBox.append(image, number, category);

        const body = document.createElement("div");
        body.className = "project-body";
        const title = document.createElement("h3");
        title.textContent = project.title;
        const summary = document.createElement("p");
        summary.textContent = project.summary;
        const tags = document.createElement("div");
        tags.className = "project-tech-tags";
        tags.setAttribute("aria-label", "Tecnologías utilizadas");
        project.technologies.forEach((tech) => tags.append(makeTech(tech)));
        const actions = document.createElement("div");
        actions.className = "project-actions";
        const details = document.createElement("a");
        details.className = "btn-project primary";
        details.href = project.page;
        details.textContent = "Ver detalles";
        actions.append(details);
        if (project.repository) {
            const repository = document.createElement("a");
            repository.className = "btn-project outline";
            repository.href = project.repository;
            repository.target = "_blank";
            repository.rel = "noopener noreferrer";
            repository.textContent = "Código";
            actions.append(repository);
        }
        body.append(title, summary, tags, actions);
        article.append(imageBox, body);
        return article;
    };

    const list = document.querySelector("[data-project-list]");
    if (list) {
        list.replaceChildren();
        Object.values(projects).forEach((project, index) => list.append(card(project, index)));
    }

    const detailKey = document.body.dataset.projectPage;
    const gallery = document.querySelector("[data-project-gallery]");
    const project = projects[detailKey];
    if (project && gallery) {
        gallery.replaceChildren();
        const base = "../assets/img/";
        project.gallery.forEach((filename, index) => {
            const item = document.createElement("div");
            item.className = "gallery-item";
            const image = document.createElement("img");
            image.src = `${base}${filename}`;
            image.alt = `${project.title}, captura ${index + 1}`;
            image.loading = "lazy";
            image.decoding = "async";
            item.append(image);
            gallery.append(item);
        });
    }
})();
