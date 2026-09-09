'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/classNames';
import { NAV_LINKS, ROUTES } from '@/lib/constants';
import css from './Header.module.css';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === ROUTES.home ? pathname === href : pathname.startsWith(href);

  return (
    <nav aria-label="Main navigation">
      <ul className={css.navList} role="list">
        {NAV_LINKS.map(({ href, label }) => {
          const active = isActive(href);

          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(css.navLink, active && css.navLinkActive)}
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
