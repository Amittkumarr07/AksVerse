/* ============================================
   Site-wide particle background
   Fixed behind all page content. Tuned much
   lighter than the loader's version so it
   doesn't compete with real content on top.

   Starts only after the loading screen is gone —
   no point animating a canvas the user can't see
   yet, and running both at once competes for the
   same frame budget and makes the loader feel
   less smooth.
   ============================================ */

function startSiteBackground() {
  var canvas = document.getElementById("site-particles");
  if (!canvas || !window.createParticleNetwork) return;

  window.createParticleNetwork(canvas, {
    spacing: 22000,      // sparser than the loader
    maxParticles: 45,
    linkDistance: 110,
    speed: 0.06,          // slow drift
    dotOpacity: 0.28,
    linkOpacity: 0.14
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var loader = document.getElementById("aksverse-loader");

  // If the loader is already gone (or never existed), start right away.
  if (!loader) {
    startSiteBackground();
    return;
  }

  // Otherwise wait for the loader to be removed from the DOM.
  var observer = new MutationObserver(function () {
    if (!document.getElementById("aksverse-loader")) {
      observer.disconnect();
      startSiteBackground();
    }
  });
  observer.observe(document.body, { childList: true });
});
