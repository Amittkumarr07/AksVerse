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

    function applyTheme(theme) {
        if (theme === "light") {
            root.setAttribute("data-theme", "light");
        } else {
            root.removeAttribute("data-theme");
        }
    }

    // Apply saved theme on load (defaults to dark if nothing saved)
    applyTheme(localStorage.getItem("theme"));

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isLight = root.getAttribute("data-theme") === "light";
            const nextTheme = isLight ? "dark" : "light";
            applyTheme(nextTheme);
            localStorage.setItem("theme", nextTheme);
        });
    }

    // --- Scroll Reveal: slide-up animation for the whole page ---
    // Elements are tagged with .reveal here (no HTML edits needed), then
    // .active is added when they scroll into view. The CSS for this is
    // the .reveal / .reveal.active rules in styles.css.
    const REVEAL_SELECTORS = [
        ".terminal",
        ".about-text > *",
        ".profile-card",
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

    const revealTargets = Array.from(document.querySelectorAll(REVEAL_SELECTORS.join(",")));

    // Stagger siblings that share a parent (e.g. skill rows, tech pills)
    const siblingCount = new Map();
    revealTargets.forEach((el) => {
        const n = siblingCount.get(el.parentElement) || 0;
        siblingCount.set(el.parentElement, n + 1);
        el.dataset.revealDelay = Math.min(n * STAGGER_MS, MAX_STAGGER_MS);
        armReveal(el);
    });

    // Put an element into its hidden, ready-to-slide-up state
    function armReveal(el) {
        el.classList.remove("active");
        el.classList.add("reveal");
        el.style.setProperty("--reveal-delay", el.dataset.revealDelay + "ms");
    }

    // After an element finishes animating, drop the reveal classes so its
    // own hover/transition rules (buttons, cards, icons) work normally.
    const finishTimers = new WeakMap();

    function finishReveal(el) {
        el.classList.remove("reveal", "active");
        el.style.removeProperty("--reveal-delay");
    }

    function playReveal(el) {
        clearTimeout(finishTimers.get(el));
        if (!el.classList.contains("reveal")) armReveal(el);
        void el.offsetWidth; // force reflow so the transition always runs
        el.classList.add("active");
        finishTimers.set(el, setTimeout(() => finishReveal(el), Number(el.dataset.revealDelay) + 900));
    }

    // Enter observer: slide the element up when it scrolls into view.
    // It never unobserves, so this repeats every time the element re-enters.
    const enterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                if (el.dataset.revealed === "1") return; // already showing
                el.dataset.revealed = "1";
                playReveal(el);
            });
        },
        { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    // Exit observer: once an element is COMPLETELY off-screen, reset it to
    // hidden so it can animate again. It's off-screen, so the reset is invisible.
    const exitObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) return;
                const el = entry.target;
                if (el.dataset.revealed !== "1") return;
                clearTimeout(finishTimers.get(el));
                el.dataset.revealed = "0";
                armReveal(el);
            });
        },
        { root: null, rootMargin: "0px", threshold: 0 }
    );

    function startReveal() {
        revealTargets.forEach((el) => {
            enterObserver.observe(el);
            exitObserver.observe(el);
        });
    }

    // Wait for the AksVerse loader to leave so the first screen
    // animates in where the visitor can actually see it.
    let revealStarted = false;
    function startRevealOnce() {
        if (revealStarted) return;
        revealStarted = true;
        startReveal();
    }

    if (document.getElementById("aksverse-loader")) {
        const loaderWatcher = new MutationObserver(() => {
            if (!document.getElementById("aksverse-loader")) {
                loaderWatcher.disconnect();
                startRevealOnce();
            }
        });
        loaderWatcher.observe(document.body, { childList: true });
        setTimeout(() => { loaderWatcher.disconnect(); startRevealOnce(); }, 9000); // safety net
    } else {
        startRevealOnce();
    }

    // --- Scroll-to-Top Button ---
    const scrollTopBtn = document.getElementById("scroll-top");
    const SHOW_AFTER_PX = 400;

    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            scrollTopBtn.classList.toggle("visible", window.scrollY > SHOW_AFTER_PX);
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
