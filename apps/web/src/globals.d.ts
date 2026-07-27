// CSS Modules — must be declared BEFORE the catch-all `*.css` below, which is an untyped
// module declaration and would otherwise resolve `styles` to `any`, making every
// `styles.foo` lookup an `@typescript-eslint/no-unsafe-member-access` warning.
// Mirrors packages/ui/src/global.d.ts. Next.js ships an equivalent declaration in the
// generated `next-env.d.ts`, but that file only exists after a `next dev`/`next build`,
// so lint and ts:check cannot rely on it in a clean checkout.
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// CSS side-effect imports (global stylesheets and shared package styles)
declare module '*.css';
declare module 'ui/styles/*';

type Keys<T> = keyof T;

type Values<T> = T[Keys<T>];

type Maybe<T> = T | null;

type OptionalSpread<T = undefined> = T extends undefined ? [] : [T];
