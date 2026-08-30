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
    maxParticles: 90,
    linkDistance: 130,
    speed: 0.18,
    dotOpacity: 0.55,
    linkOpacity: 0.35,
    dotColorVar: "--tertiary-color",
    lineColorVar: "--primary-color",
    dotColorFallback: "#38f9d7",
    lineColorFallback: "#22d3ee"
  }, options || {});

  var ctx = canvas.getContext("2d");
  var particles = [];
  var width, height, dpr;
  var rafId = null;
  var running = true;

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

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

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

    var dotRgb = hexToRgb(themeColor(opts.dotColorVar, opts.dotColorFallback));
    var lineRgb = hexToRgb(themeColor(opts.lineColorVar, opts.lineColorFallback));

    ctx.clearRect(0, 0, width, height);

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
      ctx.fillStyle = "rgba(" + dotRgb.r + "," + dotRgb.g + "," + dotRgb.b + "," + opts.dotOpacity + ")";
      ctx.fill();
    }

    for (var a = 0; a < particles.length; a++) {
      for (var b = a + 1; b < particles.length; b++) {
        var dx = particles[a].x - particles[b].x;
        var dy = particles[a].y - particles[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < opts.linkDistance) {
          var opacity = (1 - dist / opts.linkDistance) * opts.linkOpacity;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.strokeStyle = "rgba(" + lineRgb.r + "," + lineRgb.g + "," + lineRgb.b + "," + opacity + ")";
          ctx.lineWidth = 1;
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
  };
}
