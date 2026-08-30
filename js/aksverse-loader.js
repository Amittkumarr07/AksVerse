/* ============================================
   AksVerse Loading Screen 
   ============================================ */

(function () {
  var loader = document.getElementById("aksverse-loader");
  if (!loader) return;

  var MIN_DISPLAY_MS = 1400;   // minimum display loading screen
  var MAX_DISPLAY_MS = 6000;   // safety net: hide anyway if "load" never fires
  var FONT_FALLBACK_MS = 1200; // reveal text anyway if font loading takes too long or isn't supported
  var startTime = Date.now();

  // Loader text starts hidden (see CSS) and only becomes visible once
  // the real webfont has loaded, so it never visibly swaps fonts
  // while on screen. A fallback timer guards against font loading
  // hanging or the Font Loading API being unsupported.
  function revealText() {
    loader.classList.add("fonts-loaded");
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(revealText);
  } else {
    revealText();
  }
  setTimeout(revealText, FONT_FALLBACK_MS);

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
