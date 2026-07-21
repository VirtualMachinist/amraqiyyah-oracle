# Button
The Oracle's action button — use for the primary act on a screen ("Read the sky", "Cast the natal chart") and secondary utilities.

```jsx
<Button onClick={run}>Read the sky</Button>
<Button variant="ghost" size="sm">Use my location</Button>
```

Variants: `primary` (gold fill, night-ink label — one per screen), `ghost` (copper outline), `sunken` (panel-soft fill, copper text). Sizes `sm`/`md`. `full` stretches to container width. Label is uppercase mono by design.