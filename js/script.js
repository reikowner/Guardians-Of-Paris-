document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.querySelector(".loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hidden");

            setTimeout(() => {
                loader.style.display = "none";
            }, 700);

        }, 500);
    }


    /* =====================================================
       MENU HAMBURGUESA
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const sideMenu = document.querySelector(".side-menu");
    const menuOverlay = document.querySelector(".menu-overlay");

    function closeMenu() {
        if (menuToggle) {
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }

        if (sideMenu) {
            sideMenu.classList.remove("active");
        }

        if (menuOverlay) {
            menuOverlay.classList.remove("active");
        }

        document.body.classList.remove("menu-open");
    }

    function openMenu() {
        if (menuToggle) {
            menuToggle.classList.add("active");
            menuToggle.setAttribute("aria-expanded", "true");
        }

        if (sideMenu) {
            sideMenu.classList.add("active");
        }

        if (menuOverlay) {
            menuOverlay.classList.add("active");
        }

        document.body.classList.add("menu-open");
    }

    if (menuToggle && sideMenu && menuOverlay) {

        menuToggle.addEventListener("click", () => {

            const isOpen = sideMenu.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });

        menuOverlay.addEventListener("click", closeMenu);
    }


    /* =====================================================
       ESC PARA CERRAR MENU
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       ENLACES DEL MENU
    ===================================================== */

    const menuLinks = document.querySelectorAll(".side-menu a");

    menuLinks.forEach((link) => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* =====================================================
       SPARKLES
    ===================================================== */

    const sparkleContainer = document.querySelector(".sparkles");

    if (sparkleContainer) {

        for (let i = 0; i < 35; i++) {

            const sparkle = document.createElement("span");

            sparkle.className = "sparkle";

            sparkle.style.left =
                Math.random() * 100 + "%";

            sparkle.style.top =
                Math.random() * 100 + "%";

            sparkle.style.animationDelay =
                Math.random() * 5 + "s";

            sparkle.style.animationDuration =
                3 + Math.random() * 4 + "s";

            sparkleContainer.appendChild(sparkle);
        }
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        `
        .section-heading,
        .feature-card,
        .miraculous-card,
        .story-banner,
        .info-box,
        .timeline-card,
        .rule-card,
        .quote-section,
        .cta-section,
        .discord-card
        `
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.08
            }
        );

        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       ANCHOR LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                closeMenu();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       ACTIVE MENU ITEM
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";

    menuLinks.forEach((link) => {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage =
            href.split("/")
                .pop()
                .toLowerCase();

        if (linkPage === currentPage) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

});