import { PageTransition } from 'components/PageTransition';

import type { ReactNode } from 'react';

// A `template` rather than more layout: the App Router keeps a layout mounted across
// navigations inside it, which is what makes the header and footer persist — but it means a
// layout can never replay an entrance. A template is torn down and rebuilt on every route
// change, so the animation in PageTransition runs once per page. Everything expensive stays
// in the layout above; this adds one wrapper element and nothing else.
export default function LocaleTemplate({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
