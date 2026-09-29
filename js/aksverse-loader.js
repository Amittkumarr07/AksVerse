/* ============================================
   AksVerse Loading Screen — controller
   Hides the loader once the page is ready and
   drives the particle-network background.
   ============================================ */

(function () {
  var loader = document.getElementById("aksverse-loader");
  if (!loader) return;

  var MIN_DISPLAY_MS = 900;    // keep it visible at least this long, so it doesn't just flash
  var MAX_DISPLAY_MS = 6000;   // safety net: hide anyway if "load" never fires
  var FONT_FALLBACK_MS = 600;  // reveal everything anyway if the webfont is slow or blocked
  var startTime = Date.now();

  // The whole loader (logo, text, dots) stays hidden (see CSS) until the
  // real webfont has loaded, then fades in together. A fallback timer
  // guards against font loading hanging or the Font Loading API being
  // unsupported.
  var revealed = false;
  function revealLoader() {
    if (revealed) return;
    revealed = true;
    loader.classList.add("fonts-loaded");
  }

  if (document.fonts && document.fonts.load) {
    // Explicitly request the weights the loader uses, so we wait for the
    // real font files (document.fonts.ready can resolve too early).
    Promise.all([
      document.fonts.load('400 16px "IBM Plex Mono"'),
      document.fonts.load('700 16px "IBM Plex Mono"')
    ]).then(revealLoader, revealLoader);
  } else {
    revealLoader();
  }
  setTimeout(revealLoader, FONT_FALLBACK_MS);

  var canvas = document.getElementById("aksverse-particles");
  var stopParticles = window.createParticleNetwork
    ? window.createParticleNetwork(canvas, {
        spacing: 9000,
        maxParticles: 90,
        linkDistance: 130,
        speed: 0.18,
        dotOpacity: 0.55,
        linkOpacity: 0.35
      })
    : null;

  function hideLoader() {
    var elapsed = Date.now() - startTime;
    var remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    setTimeout(function () {
      loader.classList.add("aksverse-hidden");
      // fully remove from the DOM after the fade transition finishes
      setTimeout(function () {
        if (stopParticles) stopParticles();
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 650);
    }, remaining);
  }

  window.addEventListener("load", hideLoader);
  // fallback in case "load" is delayed by slow third-party assets
  setTimeout(hideLoader, MAX_DISPLAY_MS);
})();
