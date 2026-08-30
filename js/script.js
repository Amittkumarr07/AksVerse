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

    // --- Scroll Reveal Animation (contact icons, etc.) ---
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        { root: null, rootMargin: "0px", threshold: 0.15 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
});
