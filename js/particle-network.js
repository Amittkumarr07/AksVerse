/* ============================================
   Shared particle-network canvas renderer
   Used by both the AksVerse loader and the
   site-wide background, with different tuning.
   ============================================ */

function createParticleNetwork(canvas, options) {
  if (!canvas || !canvas.getContext) return null;

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return null;

  var opts = Object.assign({
    spacing: 9000,       // px^2 of area per particle
    maxParticles: 120,
    linkDistance: 130,
    speed: 0.50,
    dotOpacity: 0.55,
    linkOpacity: 0.35,
    dotColorVar: "--tertiary-color",
    lineColorVar: "--primary-color",
    dotColorFallback: "#38f9d7",
    lineColorFallback: "#22d3ee"
  }, options || {});

  var ctx = canvas.getContext("2d");
  var particles = [];
  var width = 0, height = 0, dpr = 1;
  var rafId = null;
  var running = true;
  var linkDistSq = opts.linkDistance * opts.linkDistance;

  function themeColor(varName, fallback) {
    var value = getComputedStyle(document.documentElement)
      .getPropertyValue(varName).trim();
    return value || fallback;
  }

  function hexToRgb(hex) {
    var clean = hex.replace("#", "");
    if (clean.length === 3) {
      clean = clean.split("").map(function (c) { return c + c; }).join("");
    }
    var num = parseInt(clean, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  // Colours are read once, then again only when the theme changes
  // (instead of on every animation frame).
  var dotRgb, lineRgb;
  function readColors() {
    dotRgb = hexToRgb(themeColor(opts.dotColorVar, opts.dotColorFallback));
    lineRgb = hexToRgb(themeColor(opts.lineColorVar, opts.lineColorFallback));
  }
  readColors();

  var themeObserver = new MutationObserver(readColors);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  function resize() {
    var newWidth = canvas.clientWidth;
    var newHeight = canvas.clientHeight;
    var widthChanged = newWidth !== width;

    dpr = window.devicePixelRatio || 1;
    width = newWidth;
    height = newHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Phones fire "resize" whenever the address bar shows/hides (height only).
    // Keep the existing particles then, so the network doesn't jump around.
    if (particles.length && !widthChanged) return;

    var target = Math.min(opts.maxParticles, Math.floor((width * height) / opts.spacing));
    particles = [];
    for (var i = 0; i < target; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * opts.speed,
        vy: (Math.random() - 0.5) * opts.speed
      });
    }
  }

  function step() {
    if (!running) return;

    ctx.clearRect(0, 0, width, height);

    var dotStyle = "rgba(" + dotRgb.r + "," + dotRgb.g + "," + dotRgb.b + "," + opts.dotOpacity + ")";

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = dotStyle;
      ctx.fill();
    }

    ctx.lineWidth = 1;
    for (var a = 0; a < particles.length; a++) {
      for (var b = a + 1; b < particles.length; b++) {
        var dx = particles[a].x - particles[b].x;
        var dy = particles[a].y - particles[b].y;
        var distSq = dx * dx + dy * dy;

        if (distSq < linkDistSq) {
          var opacity = (1 - Math.sqrt(distSq) / opts.linkDistance) * opts.linkOpacity;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = "rgba(" + lineRgb.r + "," + lineRgb.g + "," + lineRgb.b + "," + opacity + ")";
          ctx.stroke();
        }
      }
    }

    rafId = window.requestAnimationFrame(step);
  }

  resize();
  step();
  window.addEventListener("resize", resize);

  return function stop() {
    running = false;
    if (rafId) window.cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    themeObserver.disconnect();
  };
}
