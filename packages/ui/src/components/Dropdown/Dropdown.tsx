import { Content, Portal, Root, Trigger } from '@radix-ui/react-dropdown-menu';

import styles from './Dropdown.module.css';

import type { ReactNode } from 'react';

export type Align = 'center' | 'end' | 'start';
export type Side = 'bottom' | 'left' | 'right' | 'top';

interface DropdownOwnProps {
  /** Menu alignment relative to the trigger. */
  align?: Align;
  children: ReactNode;
  /**
   * Modal behaviour. Defaults to `true` (Radix's default): focus is trapped, outside content
   * is hidden from screen readers, and **body scroll is locked** while open.
   *
   * Pass `false` for menus whose items navigate. The scroll lock sets `overflow: hidden` on
   * `<body>`, which (a) breaks `position: sticky` ancestors — a sticky header visibly detaches
   * and scrolls away — and (b) can outlive the menu if a route change unmounts it mid-close,
   * leaving the page permanently unscrollable.
   */
  modal?: boolean;
  /**
   * Fires as the menu closes, before focus returns to the trigger. Call
   * `event.preventDefault()` to keep focus where it is.
   *
   * Needed for menus that navigate to an anchor: returning focus calls `.focus()` on the
   * trigger, which scrolls it into view — and if the trigger lives in a sticky header, that
   * yanks the page back to the top, undoing the jump to the target.
   */
  onCloseAutoFocus?: (event: Event) => void;
  /** Leading visual before the trigger label (usually an icon). */
  prefix?: ReactNode;
  /** Trailing visual after the trigger label (usually a chevron). */
  suffix?: ReactNode;
  /**
   * Appended to the trigger's own class. Use it to strip the default pill chrome (height,
   * inline padding, hover fill) when the trigger has to sit flush with plain text — a nav
   * bar, for instance, where the menu label must match the links beside it.
   */
  triggerClassName?: string;
}

/**
 * Pass a `string` label (used as both visible text and accessible name) OR a `ReactNode`
 * label plus `aria-label`. The discriminated union forces icon-only triggers to ship a name.
 */
export type DropdownProps = DropdownOwnProps & ({ 'aria-label': string; label: ReactNode } | { 'aria-label'?: string; label: string });

export function Dropdown(props: DropdownProps) {
  const { align, children, label, modal, onCloseAutoFocus, prefix, suffix, triggerClassName } = props;
  const ariaLabel = 'aria-label' in props ? props['aria-label'] : undefined;

  return (
    <Root modal={modal}>
      <Trigger aria-label={ariaLabel} className={triggerClassName ? `${styles.trigger} ${triggerClassName}` : styles.trigger}>
        {prefix ? prefix : null}
        <span className={styles.label}>{label}</span>
        {suffix ? suffix : null}
      </Trigger>
      <Portal>
        <Content align={align} className={styles.content} onCloseAutoFocus={onCloseAutoFocus}>
          {children}
        </Content>
      </Portal>
    </Root>
  );
}
