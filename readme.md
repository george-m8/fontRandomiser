# fontRandomiser

Assigns a randomly-selected font to each targeted element on page load. Each element gets a different font drawn from a shuffled pool, so no two adjacent items look the same.

Drop into any project — no dependencies, no build step.

## Files

| File | Purpose |
|---|---|
| `fontRandomiser.js` | The library |
| `fontRandomiser.css` | `@font-face` declarations (update paths to match your project) |
| `demo/index.html` | Browser demo |

Font files are **not included** — bring your own and update the `src:` paths in `fontRandomiser.css`.

---

## Usage

```html
<link rel="stylesheet" href="fontRandomiser.css" />
<script src="fontRandomiser.js"></script>
<script>
  fontRandomiser.init({
    fonts:    ['My Font A', 'My Font B', 'My Font C'],
    fallback: 'cursive',
  });
</script>
```

Mark elements with `data-rf`:

```html
<a data-rf href="/blog">Blog</a>
<a data-rf href="/events">Events</a>
<a data-rf href="/contact">Contact</a>
```

If no fonts are configured, the library falls back to the five W3C generic families (`cursive`, `fantasy`, `serif`, `sans-serif`, `monospace`) so elements always get something visible.

---

## API

### `fontRandomiser.init(options?)`

Configure and run. Call once at page load. Safe to call before `DOMContentLoaded`.

```js
// No config — uses W3C generics as the font pool
fontRandomiser.init();

// With custom fonts and fallback
fontRandomiser.init({
  fonts:     ['Knewave', 'Jersey 10', 'Finger Paint'],
  fallback:  'cursive',
  selectors: ['.nav-item', '[data-rf]'],
});
```

| Option | Type | Default | Description |
|---|---|---|---|
| `fonts` | `string[]` | W3C generics | Font pool. Each name must match a `font-family` in your CSS. |
| `fallback` | `string` | `'sans-serif'` | W3C generic appended as a CSS cascade fallback for browsers that don't load the external font. |
| `selectors` | `string[]` | `['[data-rf]']` | CSS selectors for elements to target. |

### `fontRandomiser.randomise(options?)`

Re-run at any time — on a button click, route change, keypress, etc. Accepts a one-off `options` override without changing stored state.

```js
fontRandomiser.randomise();
fontRandomiser.randomise({ selectors: ['.hero'] });
```

### `fontRandomiser.fonts` (get/set)

```js
fontRandomiser.fonts = ['Knewave', 'Mansalva'];
fontRandomiser.randomise();
```

### `fontRandomiser.selectors` (get/set)

```js
fontRandomiser.selectors = ['[data-rf]', 'h1'];
```

### `fontRandomiser.fallback` (get/set)

```js
fontRandomiser.fallback = 'serif';
```

---

## React / Next.js

For React projects, a hook is a cleaner integration point than loading a global script. See `hooks/useRandomFont.ts` in the Cool Bike Club website repo for the equivalent implementation — it reads from `lib/fontConfig.ts` which holds the project's `FONTS`, `SELECTORS`, and `FALLBACK` config.
