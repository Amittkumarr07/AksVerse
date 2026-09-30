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

window.onSiteReady(startSiteBackground);
