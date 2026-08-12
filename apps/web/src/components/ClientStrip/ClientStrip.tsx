import Image from 'next/image';

import styles from './ClientStrip.module.css';

import { Link } from 'ui/components/Link';

import { Reveal } from 'components/Reveal';

import type { CSSProperties } from 'react';

interface Client {
  /** Intrinsic viewBox height of the SVG, for next/image's aspect ratio. */
  height: number;
  /** The company's own site. Opens in a new tab — see the note on linking below. */
  href: string;
  name: string;
  /** Rendered height in px inside its tile. Set per logo — see `.logo` in the stylesheet. */
  optical: number;
  src: string;
  /** Intrinsic viewBox width. */
  width: number;
}

// Both files are the companies' own artwork: vantage-towers.svg is the SVG their site serves
// (Wikimedia's "SVG" turned out to be two embedded bitmaps in a wrapper — 0 paths — so it
// would not have scaled), and axion.svg is the one axion.es serves.
//
// `optical` rather than a shared height: Vantage is a bare two-line wordmark and Axión is a
// wordmark knocked out of a filled box, so matching their bounding boxes makes Axión read as
// roughly twice the weight. These values match them by ink, not by box.
const CLIENTS: Client[] = [
  { height: 55, href: 'https://www.vantagetowers.com', name: 'Vantage Towers', optical: 46, src: '/images/clients/vantage-towers.svg', width: 100 },
  { height: 76, href: 'https://www.axion.es', name: 'Axión', optical: 34, src: '/images/clients/axion.svg', width: 151 }
];

export interface ClientStripProps {
  /** Eyebrow above the row, e.g. "Confían en nosotros". */
  label: string;
}

// A client logo bar, directly under the hero — the position B2B research consistently puts
// first, because a credibility signal has to land before the visitor decides to scroll. The
// eyebrow is load-bearing too: an unlabelled row of marks is the weakest form of social proof,
// so the logos are framed as a claim rather than left as decoration.
//
// Equal-width tiles rather than two loose images. Vantage's ink is 105x58 and Axión's 86x43,
// so a row of the bare logos centres arithmetically and still looks lopsided — the masses
// differ. Identical tiles make the visual unit the box rather than the mark, and centre each
// logo inside its own. They also fill the intro column exactly, so the strip lines up with the
// copy above it instead of introducing a second, wider, centred alignment.
//
// Greyscale at rest, full colour on hover — the standard treatment, and it keeps two saturated
// third-party palettes from competing with Nextel's own on a near-black page. It has to be
// `grayscale()` rather than the more common `brightness(0) invert(1)`: forcing a single colour
// collapses Axión into a solid rectangle, because its wordmark is knocked out of the green box
// rather than drawn on top of it.
//
// Linked to the companies' own sites, in a new tab. Most B2B sites either leave client logos
// inert or point them at a case study; with no case studies to point at, the company site is
// the only destination that is not a dead end, and the tile gives the click an obvious target.
export function ClientStrip({ label }: ClientStripProps) {
  return (
    <div className={styles.strip}>
      <p className={styles.label}>{label}</p>

      {/* The tiles arrive one after the other through the shared Reveal, which replaces the
          IntersectionObserver this component used to run for itself — one observer serves
          every reveal on the page, and the staggering is the same gesture the rest of the
          site uses rather than a second one that only looks similar.
          This component is a Server Component again as a result: the only thing that needed
          the browser was that observer, and it now lives in the one client leaf. */}
      <Reveal as="ul" className={styles.list} stagger={true}>
        {CLIENTS.map(client => (
          <li className={styles.item} key={client.name}>
            {/* The DS Link adds rel="noopener noreferrer" for target="_blank" on its own. */}
            <Link className={styles.tile} href={client.href} target="_blank">
              <Image
                alt={client.name}
                className={styles.logo}
                height={client.height}
                // Already optimised vector artwork; the image pipeline would only rasterise it.
                src={client.src}
                style={{ '--client-optical': `${client.optical}px` } as CSSProperties}
                unoptimized={true}
                width={client.width}
              />
            </Link>
          </li>
        ))}
      </Reveal>
    </div>
  );
}
