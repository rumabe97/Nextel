// Has this session navigated yet, or is the visitor still on the page they arrived at?
//
// Module scope, so the answer survives the unmount/remount that a route change puts
// `template.tsx` — and everything under it — through. It is set from an effect, which means
// it is always `false` on the server: React does not run effects there, and a value that only
// ever moves in the browser is exactly what makes it safe to read during render on both sides
// of hydration without a mismatch.
//
// Two things read it, and they read it for opposite reasons. `PageTransition` animates only
// when it IS a navigation, because fading the whole document up on a cold load would delay the
// largest paint on the one visit where load speed is measured. The hero headline animates only
// when it is NOT, because its own 0.9s entrance and the page's 0.42s one would otherwise run
// over the same pixels at once — two overlapping arrivals read as a smear rather than as
// either gesture. Between them, exactly one entrance plays on any given page load.
let navigated = false;

export function hasNavigated() {
  return navigated;
}

export function markNavigated() {
  navigated = true;
}
