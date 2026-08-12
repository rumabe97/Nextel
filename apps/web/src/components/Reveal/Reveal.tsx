'use client';
import { useEffect, useRef } from 'react';

import styles from './Reveal.module.css';

import type { CSSProperties, ReactNode } from 'react';

/** The elements this actually wraps on the site. Deliberately not `ElementType`: a narrow
 *  union keeps the rendered markup auditable and stops a stray `as="span"` from putting a
 *  transformed inline box in the middle of a paragraph. */
export type RevealTag = 'article' | 'div' | 'dl' | 'figure' | 'header' | 'li' | 'ol' | 'section' | 'ul';

/** `split` is the odd one out: it moves the wrapper's direct children in *alternating*
 *  directions rather than moving the wrapper itself, for a pair that should converge. */
export type RevealVariant = 'fade' | 'left' | 'right' | 'scale' | 'split' | 'up';

export interface RevealProps {
  as?: RevealTag;
  children: ReactNode;
  className?: string;
  /** Wait this many multiples of `--reveal-stagger` before starting. */
  delay?: number;
  /** Animate the direct children in sequence rather than this element as one block. */
  stagger?: boolean;
  /** Merged with the delay variable — for call sites that also drive a layout custom property. */
  style?: CSSProperties;
  variant?: RevealVariant;
}

// ── Shared observer ───────────────────────────────────────────────────────────
//
// One IntersectionObserver for every Reveal on the page rather than one each. A page like
// About mounts ~15 of them; 15 observers is 15 separate sets of bookkeeping the browser
// re-runs on each scroll frame, for a job a single observer with 15 targets does once.
//
// Created lazily so nothing touches `IntersectionObserver` during module evaluation — this
// file is imported into Server Components' trees, and the constructor does not exist there.
let observer: IntersectionObserver | undefined;

const pending = new WeakMap<Element, () => void>();

function getObserver() {
  observer ??= new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        // `boundingClientRect.top < 0` means the element is now *above* the viewport — a
        // programmatic jump, or a browser restoring scroll position. It will never intersect
        // while the visitor scrolls down, so without this it would sit invisible until they
        // happened to scroll back up.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          const reveal = pending.get(entry.target);

          observer?.unobserve(entry.target);
          pending.delete(entry.target);
          reveal?.();
        }
      }
    },
    // Bottom inset: fire when the element is ~12% into the viewport rather than the instant
    // its first pixel crosses the edge, so the motion finishes while it is being read
    // instead of trailing behind the scroll.
    { rootMargin: '0px 0px -12% 0px' }
  );

  return observer;
}

/** Run `onEnter` the first time `node` is scrolled into view, then stop watching it.
 *
 *  Exported so anything else that needs a one-shot "this is on screen now" — the stat
 *  counters, for instance — joins the page's single observer instead of standing up another
 *  one. Where IntersectionObserver does not exist the callback runs immediately: every
 *  consumer here uses it to *start* something, so firing early degrades to "no animation",
 *  which is the right answer, while never firing would lose the content. */
export function observeOnce(node: Element, onEnter: () => void) {
  if (typeof IntersectionObserver === 'undefined') {
    onEnter();

    return () => undefined;
  }

  pending.set(node, onEnter);
  getObserver().observe(node);

  return () => {
    observer?.unobserve(node);
    pending.delete(node);
  };
}

// A scroll-reveal wrapper: its contents start slightly offset and transparent, then settle
// once they scroll into view. Revealed once and then forgotten — re-animating on every scroll
// past is the single most common way this pattern turns from polish into noise, and it makes
// a page tiring to read on the way back up.
//
// **Nothing is hidden in the server-rendered HTML.** The offset is applied on mount, and only
// to elements that are entirely below the fold at that moment. This is the whole design, and
// it is worth spelling out why.
//
// The obvious implementation — ship `opacity: 0` in the HTML and let JavaScript undo it — has
// a cost that does not show up until you measure it. An element at zero opacity is not
// eligible to be the Largest Contentful Paint, so whatever happens to be the largest thing on
// screen stops counting as painted until hydration finishes and the observer runs. Measured
// here on a 4x-throttled phone profile, that pushed LCP from ~500ms to ~970ms on two pages,
// and *which* pages depended on the viewport: the fold lands in a different place at 390px
// than at 1440px, so there is no set of components you can exempt by hand and be done.
//
// Hiding only what is already off-screen removes the problem at the root rather than papering
// over it. Above-the-fold content paints on the first frame exactly as it would with no
// animation code at all, and content the visitor cannot see yet is free to be hidden, because
// there is no frame in which anyone could catch it changing. It is also the more honest
// behaviour: an element that was on screen from the start was never scrolled to, so playing a
// scroll animation on it was always pretending.
//
// It removes the no-JS problem for free, too. With nothing hidden up front, a visitor with
// scripting off or blocked simply gets the finished page.
//
// Two more paths worth knowing about:
//   · No IntersectionObserver — the element is left visible rather than hidden. (Next's own
//     router needs the same API, so a browser without it cannot run this site regardless.)
//   · Reduced motion — the stylesheet drops the offsets, and ui/styles/base collapses the
//     durations.
//
// The revealed flag and the offset class are written straight to the DOM rather than held in
// state: they are one-way visual switches that no other logic reads, and going through state
// would re-render every server-rendered child for a class name they do not care about. React
// leaves attributes and classes it did not render alone, so both survive later re-renders.
export function Reveal({ as: Tag = 'div', children, className, delay = 0, stagger = false, style, variant = 'up' }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;

    if (!node || typeof IntersectionObserver === 'undefined') {
      return;
    }

    // Strictly below the fold — `>=`, not `>`. An element straddling the bottom edge is
    // already partly on screen, and hiding it now would be a visible flicker rather than a
    // reveal. Those simply stay as they are.
    if (node.getBoundingClientRect().top < window.innerHeight) {
      return;
    }

    // `.hidden` carries `transition: none`, so taking the offset ON is instantaneous. Without
    // that the element would animate *into* its hidden position first — a downward slide, off
    // screen, immediately followed by the real one back up.
    node.classList.add(styles.hidden);

    // Flipped from '' to 'hidden' so stylesheets elsewhere can tell "this element is going to
    // animate" from "this one was already on screen and never will". Home's statement rules
    // need exactly that distinction: their gradient underline draws itself in on reveal, and
    // without a way to ask, a statement that loaded above the fold would keep an underline
    // scaled to zero for ever.
    node.setAttribute('data-reveal', 'hidden');

    return observeOnce(node, () => node.setAttribute('data-revealed', ''));
  }, []);

  const classes = [styles.root, stagger ? styles.stagger : styles[variant], className].filter(Boolean).join(' ');

  return (
    <Tag
      className={classes}
      // A marker for auditing and for the reduced-motion rule — the class names beside it are
      // hashed by CSS Modules, so this is the only stable hook on the element.
      data-reveal=""
      ref={ref as never}
      style={delay ? ({ ...style, '--reveal-delay': `calc(${delay} * var(--reveal-stagger))` } as CSSProperties) : style}
    >
      {children}
    </Tag>
  );
}
