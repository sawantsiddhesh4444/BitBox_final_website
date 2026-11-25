(function () {
    const header = document.querySelector(".site-header");
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("main-nav");
    const backToTop = document.getElementById("back-to-top");

    function onScroll() {
        const scrolled = window.scrollY > 10;
        if (header) {
            header.classList.toggle("scrolled", scrolled);
        }
        if (backToTop) {
            backToTop.classList.toggle("show", window.scrollY > 600);
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (navToggle && nav) {
        navToggle.addEventListener("click", function () {
            const isOpen = nav.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
            navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        });
    }

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const revealItems = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
        revealItems.forEach(function (item) {
            item.classList.add("visible");
        });
        return;
    }

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealItems.forEach(function (item) {
        observer.observe(item);
    });
})();
