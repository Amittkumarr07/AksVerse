/* ============================================
   AksVerse Loading Screen — controller
   Hides the loader once the page is ready.
   ============================================ */

(function () {
  var loader = document.getElementById("aksverse-loader");
  if (!loader) return;

  var MIN_DISPLAY_MS = 900;   // keep it visible at least this long, so it doesn't just flash
  var MAX_DISPLAY_MS = 6000;  // safety net: hide anyway if "load" never fires
  var startTime = Date.now();

  function hideLoader() {
    var elapsed = Date.now() - startTime;
    var remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    setTimeout(function () {
      loader.classList.add("aksverse-hidden");
      // fully remove from the DOM after the fade transition finishes
      setTimeout(function () {
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
