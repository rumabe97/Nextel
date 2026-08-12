'use client';
import { useEffect, useState } from 'react';

import styles from './PageTransition.module.css';

import { hasNavigated, markNavigated } from './navigationState';

import type { ReactNode } from 'react';

export interface PageTransitionProps {
  children: ReactNode;
}

// The arrival half of the page transition, mounted from `template.tsx` — the one file in the
// App Router that is deliberately re-instantiated on every navigation, which is exactly the
// remount a CSS entrance animation needs. (The departure half is RouteExit, in the layout.)
//
// React's `<ViewTransition>` would be the better tool and gives enter *and* exit from one
// declaration, but it ships only in React's canary channel — `unstable_ViewTransition` is not
// exported by the stable 19.2 this app is pinned to, and moving a client site onto canary to
// buy an animation is not a trade worth making. This approach needs no experimental flag and
// degrades to a plain instant navigation on any browser that cannot run it.
//
// **The first load is deliberately not animated.** Fading the whole document up from zero on
// entry would delay the hero — the LCP element — by the length of the animation on exactly
// the visit where loading speed is being measured, and the hero already has an entrance of
// its own. Route changes, where nothing is being measured and the visitor needs to be told
// the page changed, get the full gesture.
export function PageTransition({ children }: PageTransitionProps) {
  // Read through a state initialiser rather than calling on every render: initialisers run
  // once per component instance, so this holds the value as of *this* page's mount even
  // though the effect below flips the flag straight afterwards.
  const [animate] = useState(hasNavigated);

  useEffect(markNavigated, []);

  return <div className={animate ? styles.enter : undefined}>{children}</div>;
}
