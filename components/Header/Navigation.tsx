'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/constants';
import css from './Header.module.css';

const links = [
  { href: ROUTES.home, label: 'Home' },
  { href: ROUTES.catalog, label: 'Catalog' },
];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === ROUTES.home ? pathname === href : pathname.startsWith(href);

  return (
    <nav aria-label="Main navigation">
      <ul className={css.navList}>
        {links.map(({ href, label }) => {
          const active = isActive(href);

          return (
            <li key={href}>
              <Link
                href={href}
                className={active ? `${css.navLink} ${css.navLinkActive}` : css.navLink}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
