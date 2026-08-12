import styles from './TeamCard.module.css';

import { Avatar } from 'ui/components/Avatar';
import { Link } from 'ui/components/Link';

import { Icon } from 'components/Icon';

export interface TeamMember {
  email?: string;
  instagram?: string;
  linkedin?: string;
  name: string;
  /** Portrait URL. Omit and the DS Avatar renders its seeded MarbleEffect fallback. */
  photo?: string;
  /** Job title, e.g. "General Manager". Optional so a confirmed colleague can ship without
   *  one — a guessed title on a real person's card is worse than no title. */
  role?: string;
}

export interface TeamCardProps {
  member: TeamMember;
}

/** First letters of the first two words: "Alejandro Serrano" → "AS". Two is the limit on
 *  purpose — three letters in a 220px disc stops reading as a monogram and starts reading as
 *  a word. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
}

// The Figma team grid has neutral grey placeholder circles rather than real portraits, so
// `photo` is optional.
//
// The DS Avatar's own fallback is a MarbleEffect seeded from the name, which is a good default
// for an app full of user accounts and the wrong one here: it hashes each colleague into a
// differently-coloured organic blob, so the three cards came out green, blue and orange next
// to each other on a page whose entire palette is one blue on near-black. Three arbitrary
// colours is not a neutral placeholder, it is a decision — and not one the design made.
//
// A monogram on the site's own surface colour is what Figma actually shows, plus the one thing
// a blank disc cannot do: say who it belongs to. It is `aria-hidden` because the name is an
// `<h3>` immediately below it, and hearing "AS, Alejandro Serrano" helps nobody.
export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className={styles.card}>
      <Avatar
        className={styles.avatar}
        fallback={
          <span aria-hidden={true} className={styles.initials}>
            {initials(member.name)}
          </span>
        }
        name={member.name}
        size={220}
        src={member.photo}
      />

      <h3 className={styles.name}>{member.name}</h3>
      {member.role ? <p className={styles.role}>{member.role}</p> : null}

      <ul className={styles.social}>
        {member.linkedin ? (
          <li>
            <Link aria-label={`${member.name} en LinkedIn`} className={styles.socialLink} href={member.linkedin} target="_blank">
              <Icon name="linkedin" />
            </Link>
          </li>
        ) : null}
        {member.instagram ? (
          <li>
            <Link aria-label={`${member.name} en Instagram`} className={styles.socialLink} href={member.instagram} target="_blank">
              <Icon name="instagram" />
            </Link>
          </li>
        ) : null}
        {member.email ? (
          <li>
            {/* `title` puts the address in the hover tooltip. The icon carries no visible
                text, and a `mailto:` link does nothing at all in a browser with no mail
                handler registered, so without this there is no way to read the address. */}
            <a aria-label={`Escribir a ${member.name}`} className={styles.socialLink} href={`mailto:${member.email}`} title={member.email}>
              <Icon name="mail" />
            </a>
          </li>
        ) : null}
      </ul>
    </article>
  );
}
