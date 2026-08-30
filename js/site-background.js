/* ============================================
   Site-wide particle background
   Fixed behind all page content. Tuned much
   lighter than the loader's version so it
   doesn't compete with real content on top.
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
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
});
