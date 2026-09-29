/* ============================================
   Site-wide particle background
   ============================================ */

function startSiteBackground() {
  var canvas = document.getElementById("site-particles");
  if (!canvas || !window.createParticleNetwork) return;

  window.createParticleNetwork(canvas, {
    spacing: 22000,      // sparser than the loader
    maxParticles: 60,
    linkDistance: 110,
    speed: 1,            // drift speed
    dotOpacity: 0.35,
    linkOpacity: 0.20
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
