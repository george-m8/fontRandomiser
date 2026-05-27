(function (global) {

  // ─── Font pool ─────────────────────────────────────────────────────────────
  // Add or remove font-family names here. Each name must match an @font-face
  // declaration in your stylesheet. Each targeted element receives a different
  // font drawn from a freshly-shuffled copy of this list on every call.

  var DEFAULT_FONTS = [
    'East Sea Dokdo',
    'Finger Paint',
    'Jacquard 12',
    'Jersey 10',
    'Jersey 25',
    'Knewave',
    'Mansalva',
    'Permanent Marker',
    'Sue Ellen Francisco',
  ];

  // ─── Targets ───────────────────────────────────────────────────────────────
  // CSS selectors for the elements that should receive randomised fonts.
  // Any valid querySelectorAll string works — class, data attribute, tag, etc.

  var DEFAULT_SELECTORS = [
    '[data-rf]',
  ];

  // ─── Internals ─────────────────────────────────────────────────────────────

  var state = {
    fonts:     DEFAULT_FONTS.slice(),
    selectors: DEFAULT_SELECTORS.slice(),
  };

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function run() {
    var elements = [];
    state.selectors.forEach(function (sel) {
      elements = elements.concat(Array.prototype.slice.call(document.querySelectorAll(sel)));
    });
    if (!elements.length) return;

    var pool = shuffle(state.fonts);
    elements.forEach(function (el, i) {
      el.style.fontFamily = "'" + pool[i % pool.length] + "', cursive";
    });
  }

  // ─── Public API ────────────────────────────────────────────────────────────

  /**
   * fontRandomiser.init(options?)
   *
   * Configure the library and run immediately (or on DOMContentLoaded if the
   * document is still loading). Call once at page load.
   *
   * options.fonts     {string[]}  — replace the default font pool
   * options.selectors {string[]}  — replace the default selectors
   *
   * Example:
   *   fontRandomiser.init({
   *     fonts: ['Knewave', 'Jersey 10'],
   *     selectors: ['.nav-item', '[data-rf]'],
   *   });
   */
  function init(options) {
    if (options) {
      if (Array.isArray(options.fonts))     state.fonts     = options.fonts;
      if (Array.isArray(options.selectors)) state.selectors = options.selectors;
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
   * Accepts the same options as init() to do a one-off override without
   * changing the stored state.
   *
   * Example:
   *   fontRandomiser.randomise();
   *   fontRandomiser.randomise({ selectors: ['.hero-title'] });
   */
  function randomise(options) {
    if (!options) {
      run();
      return;
    }
    var savedFonts     = state.fonts;
    var savedSelectors = state.selectors;
    if (Array.isArray(options.fonts))     state.fonts     = options.fonts;
    if (Array.isArray(options.selectors)) state.selectors = options.selectors;
    run();
    state.fonts     = savedFonts;
    state.selectors = savedSelectors;
  }

  global.fontRandomiser = {
    init:      init,
    randomise: randomise,
    get fonts()          { return state.fonts; },
    set fonts(v)         { state.fonts = v; },
    get selectors()      { return state.selectors; },
    set selectors(v)     { state.selectors = v; },
  };

})(typeof window !== 'undefined' ? window : this);
