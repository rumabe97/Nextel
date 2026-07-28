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

// The Figma team grid has grey placeholder circles rather than real portraits, so `photo`
// is optional: without it the DS Avatar falls back to a MarbleEffect seeded from the
// member's name — a stable, distinct shape per person instead of a generic silhouette.
export function TeamCard({ member }: TeamCardProps) {
  return (
    <article className={styles.card}>
      <Avatar className={styles.avatar} name={member.name} size={220} src={member.photo} />

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
