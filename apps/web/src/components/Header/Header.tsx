import styles from './Header.module.css';

import { Link } from 'ui/components/Link';

import { HeaderNav } from './components/HeaderNav';
import { HeaderShell } from './components/HeaderShell';
import { MobileNav } from './components/MobileNav';
import { Logo } from 'components/Logo';

// HeaderShell (client) owns only the scrolled/transparent state; everything inside stays
// server-rendered. The inner grid centres the nav on the header, as Figma lays it out —
// logo left, nav centred, drawer toggle right.
export function Header() {
  return (
    <HeaderShell>
      <div className={styles.inner}>
        <Link aria-label="Nextel Advisors — inicio" className={styles.brand} href="/">
          <Logo className={styles.logo} />
        </Link>

        <HeaderNav />

        <div className={styles.actions}>
          <MobileNav />
        </div>
      </div>
    </HeaderShell>
  );
}
