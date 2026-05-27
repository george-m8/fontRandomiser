# fontRandomiser

Assigns a randomly-selected font to each targeted element on page load. Each element gets a different font drawn from a shuffled pool, so no two adjacent items look the same.

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
  fontRandomiser.init();
</script>
```

Mark elements with `data-rf`:

```html
<a data-rf href="/blog">Blog</a>
<a data-rf href="/events">Events</a>
<a data-rf href="/contact">Contact</a>
```

---

## API

### `fontRandomiser.init(options?)`

Configure and run. Call once at page load. Safe to call before `DOMContentLoaded`.

```js
fontRandomiser.init();

// With options:
fontRandomiser.init({
  fonts:     ['Knewave', 'Jersey 10', 'Finger Paint'],
  selectors: ['.nav-item', '[data-rf]'],
});
```

### `fontRandomiser.randomise(options?)`

Re-run at any time — on a button click, route change, keypress, etc. Accepts a one-off `options` override without changing stored state.

```js
fontRandomiser.randomise();
fontRandomiser.randomise({ selectors: ['.hero'] });
```

### `fontRandomiser.fonts` (get/set)

The active font pool.

```js
fontRandomiser.fonts = ['Knewave', 'Mansalva'];
fontRandomiser.randomise();
```

### `fontRandomiser.selectors` (get/set)

The active CSS selectors.

```js
fontRandomiser.selectors = ['[data-rf]', 'h1'];
```

---

## Editing the defaults

Open `fontRandomiser.js` and edit the two arrays near the top:

```js
var DEFAULT_FONTS = [
  'East Sea Dokdo',
  'Finger Paint',
  // add or remove here
];

var DEFAULT_SELECTORS = [
  '[data-rf]',
  // add other selectors here
];
```

---

## React / Next.js

For React projects, a hook is a cleaner integration point than loading a global script. See `hooks/useRandomFont.ts` in the Cool Bike Club website repo for the equivalent implementation — it reads from `lib/fontConfig.ts` which mirrors the `DEFAULT_FONTS` / `DEFAULT_SELECTORS` config above.
