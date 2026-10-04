(function () {
    "use strict";
    var root = document.documentElement;
    var pages = Array.prototype.slice.call(document.querySelectorAll(".container"));
    var controls = document.querySelectorAll(".control");
    var themeBtn = document.querySelector(".theme-btn");
    var themeMeta = document.querySelector('meta[name="theme-color"]');

    pages.forEach(function (p) { p.setAttribute("tabindex", "-1"); });

    // Show one page; the URL hash drives it, so Back/Forward and deep links work
    function route(fromUser) {
        var id = "";
        try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
        var target = id ? document.getElementById(id) : null;
        var page = target && target.closest(".container");
        if (!page) { page = pages[0]; target = null; }

        pages.forEach(function (p) { p.classList.toggle("active", p === page); });
        controls.forEach(function (b) {
            var on = b.dataset.id === page.id;
            b.classList.toggle("active-btn", on);
            if (on) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
        });

        if (target && target !== page) target.scrollIntoView();
        else window.scrollTo(0, 0);
        if (fromUser) page.focus({ preventScroll: true });
    }

    controls.forEach(function (b) {
        b.addEventListener("click", function () {
            var hash = "#" + b.dataset.id;
            if (location.hash === hash) route(true); else location.hash = hash;
        });
    });
    window.addEventListener("hashchange", function () { route(true); });
    route(false);

    // Light / dark theme (initial state is set by the inline script in <head>)
    function syncTheme() {
        var light = root.classList.contains("light-mode");
        if (themeBtn) themeBtn.setAttribute("aria-pressed", String(light));
        if (themeMeta) themeMeta.setAttribute("content", light ? "#ffffff" : "#191d2b");
    }
    syncTheme();
    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            var light = root.classList.toggle("light-mode");
            try { localStorage.setItem("theme", light ? "light" : "dark"); } catch (e) {}
            syncTheme();
        });
    }

    // Hero photo: show initials if the image is missing
    var photo = document.querySelector(".image img");
    function noPhoto() { photo.parentNode.classList.add("no-img"); }
    if (photo) {
        photo.addEventListener("error", noPhoto);
        if (photo.complete && photo.naturalWidth === 0) noPhoto();
    }

    // Typing effect
    var el = document.getElementById("changing-txt");
    var roles = ["Computer Science Student", "Front-End Developer", "C & Python Learner", "Video Editor"];
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = roles[0]; return; }
    var r = 0, c = 0, del = false;
    (function tick() {
        var word = roles[r], wait = del ? 40 : 90;
        el.textContent = word.slice(0, c);
        if (!del && c === word.length) { del = true; wait = 1400; }
        else if (del && c === 0) { del = false; r = (r + 1) % roles.length; wait = 350; }
        else c += del ? -1 : 1;
        setTimeout(tick, wait);
    })();
})();
