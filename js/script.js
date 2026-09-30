document.addEventListener("DOMContentLoaded", () => {

    // --- Typing Effect ---
    const words = ["developer.", "designer.", "video editor."];
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseDelay = 2000;
    const nextWordDelay = 500;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const targetElement = document.getElementById("changing-txt");

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        targetElement.textContent = currentWord.substring(0, charIndex);

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            speed = pauseDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = nextWordDelay;
        }

        setTimeout(typeEffect, speed);
    }

    if (targetElement) {
        typeEffect();
    }

    // --- Show More Courses ---
    const toggleCoursesBtn = document.getElementById("toggle-courses");
    const extraCourses = document.getElementById("extra-courses");

    if (toggleCoursesBtn && extraCourses) {
        toggleCoursesBtn.addEventListener("click", () => {
            const isOpen = extraCourses.classList.toggle("open");
            toggleCoursesBtn.setAttribute("aria-expanded", isOpen);
            toggleCoursesBtn.innerHTML = isOpen
                ? 'Show less <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>'
                : 'Show all certificates <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>';
        });
    }

    // --- Theme Switcher ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const root = document.documentElement;

    const themeMeta = document.querySelector('meta[name="theme-color"]');

    function applyTheme(theme) {
        if (theme === "light") {
            root.setAttribute("data-theme", "light");
        } else {
            root.removeAttribute("data-theme");
        }
        // Colours the browser bar on phones to match the page
        if (themeMeta) themeMeta.setAttribute("content", theme === "light" ? "#f7f5f1" : "#0b0e11");
    }

    // (The saved theme is applied by the inline script in <head>, before first paint.)
    applyTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
            applyTheme(nextTheme);
            try {
                localStorage.setItem("theme", nextTheme);
            } catch (e) { /* storage blocked: theme just won't persist */ }
        });
    }

    // --- Scroll Reveal: slide-up animation, plays once per element ---
    const REVEAL_SELECTORS = [
        ".hero-text > *",
        ".hero-visual",
        ".about-text > *",
        ".skills-main",
        ".skill-row",
        ".projects > h2",
        ".proj-card",
        ".timeline-h2",
        ".timeline-item",
        ".cc_h2",
        ".courses > .course-cert",
        ".courses-toggle-btn",
        "#contact > h2",
        ".connect",
        ".contact-icon",
        ".site-footer"
    ];

    const STAGGER_MS = 90;      // delay between siblings revealed together
    const MAX_STAGGER_MS = 360; // cap so long lists don't feel slow
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reduceMotion && "IntersectionObserver" in window) {
        const targets = Array.from(document.querySelectorAll(REVEAL_SELECTORS.join(",")));
        const siblingCount = new Map();

        // Hide everything now (the loader is covering the page), reveal later.
        targets.forEach((el) => {
            const n = siblingCount.get(el.parentElement) || 0;
            siblingCount.set(el.parentElement, n + 1);
            el.style.setProperty("--reveal-delay", Math.min(n * STAGGER_MS, MAX_STAGGER_MS) + "ms");
            el.classList.add("reveal");
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const el = entry.target;
                    observer.unobserve(el); // once only
                    el.classList.add("active");
                    // Drop the reveal classes afterwards so hover styles work normally.
                    setTimeout(() => {
                        el.classList.remove("reveal", "active");
                        el.style.removeProperty("--reveal-delay");
                    }, 1400);
                });
            },
            { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
        );

        // Start once the AksVerse loader has left, so the first screen animates where it's seen.
        window.onSiteReady(() => targets.forEach((el) => observer.observe(el)));
    }

    // --- Highlight the nav link for the section in view ---
    const navLinks = document.querySelectorAll(".nav-bar a.nav-btn");
    if ("IntersectionObserver" in window && navLinks.length) {
        const spy = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    navLinks.forEach((link) => {
                        if (link.getAttribute("href") === "#" + entry.target.id) {
                            link.setAttribute("aria-current", "true");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        document.querySelectorAll("main > section[id]").forEach((section) => spy.observe(section));
    }

    // --- Scroll-to-Top Button ---
    const scrollTopBtn = document.getElementById("scroll-top");
    const SHOW_AFTER_PX = 400;

    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            scrollTopBtn.classList.toggle("visible", window.scrollY > SHOW_AFTER_PX);
        }, { passive: true });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
