(function (root, factory) {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = factory();
  } else {
    root.fontRandomiser = factory();
  }
}(typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : this, function () {

  // W3C generic font families. Used as the default font pool so the library
  // works out of the box without any configuration or external font files.
  var GENERIC_FAMILIES = ['cursive', 'fantasy', 'serif', 'sans-serif', 'monospace'];

  // ─── Defaults ──────────────────────────────────────────────────────────────
  // Override any of these via init(options) — see API below.

  var DEFAULT_FONTS = GENERIC_FAMILIES.slice();

  var DEFAULT_SELECTORS = [
    '[data-rf]',
  ];

  // Appended to each custom font name as a CSS cascade fallback, e.g.
  // "'East Sea Dokdo', cursive". Accepts a string or an array — when an array
  // is given a different generic is picked for each element. Has no effect when
  // the pool contains only generic families. Override per-project.
  var DEFAULT_FALLBACK = GENERIC_FAMILIES.slice();

  // ─── Internals ─────────────────────────────────────────────────────────────

  var state = {
    fonts:     DEFAULT_FONTS.slice(),
    selectors: DEFAULT_SELECTORS.slice(),
    fallback:  DEFAULT_FALLBACK,
  };

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  // Generics are used bare; custom names get quoted + fallback appended.
  // When fallback is an array a random entry is picked per call.
  function fontValue(name) {
    if (GENERIC_FAMILIES.indexOf(name) !== -1) return name;
    var fb = Array.isArray(state.fallback)
      ? state.fallback[Math.floor(Math.random() * state.fallback.length)]
      : state.fallback;
    return "'" + name + "', " + fb;
  }

  function run() {
    var elements = [];
    state.selectors.forEach(function (sel) {
      elements = elements.concat(Array.prototype.slice.call(document.querySelectorAll(sel)));
    });
    if (!elements.length) return;

    var pool = shuffle(state.fonts);
    elements.forEach(function (el, i) {
      el.style.fontFamily = fontValue(pool[i % pool.length]);
    });
  }

  // ─── Public API ────────────────────────────────────────────────────────────

  /**
   * fontRandomiser.init(options?)
   *
   * Configure the library and run immediately (or on DOMContentLoaded if the
   * document is still loading). Call once at page load.
   *
   * options.fonts     {string[]}  — custom font pool (default: W3C generics)
   * options.selectors {string[]}  — CSS selectors to target (default: [data-rf])
   * options.fallback  {string}    — generic family appended to each custom font
   *                                 name as a CSS cascade fallback (default: 'sans-serif')
   */
  function init(options) {
    if (options) {
      if (Array.isArray(options.fonts))         state.fonts     = options.fonts;
      if (Array.isArray(options.selectors))     state.selectors = options.selectors;
      if (typeof options.fallback === 'string' || Array.isArray(options.fallback)) state.fallback = options.fallback;
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  }

  /**
   * fontRandomiser.randomise(options?)
   *
   * Re-run the randomisation at any time — on interaction, route change, etc.
   * Accepts the same options as init() for a one-off override without changing
   * stored state.
   */
  function randomise(options) {
    if (!options) {
      run();
      return;
    }
    var savedFonts     = state.fonts;
    var savedSelectors = state.selectors;
    var savedFallback  = state.fallback;
    if (Array.isArray(options.fonts))         state.fonts     = options.fonts;
    if (Array.isArray(options.selectors))     state.selectors = options.selectors;
    if (typeof options.fallback === 'string' || Array.isArray(options.fallback)) state.fallback = options.fallback;
    run();
    state.fonts     = savedFonts;
    state.selectors = savedSelectors;
    state.fallback  = savedFallback;
  }

  return {
    init:      init,
    randomise: randomise,
    get fonts()          { return state.fonts; },
    set fonts(v)         { state.fonts = v; },
    get selectors()      { return state.selectors; },
    set selectors(v)     { state.selectors = v; },
    get fallback()       { return state.fallback; },
    set fallback(v)      { state.fallback = v; },
  };

}));
