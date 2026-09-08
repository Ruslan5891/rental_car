import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container/Container';
import { ROUTES } from '@/lib/constants';
import Navigation from './Navigation';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Container className={css.container}>
        <Link href={ROUTES.home} className={css.logo} aria-label="RentalCar home">
          <Image src="/images/logo.svg" alt="RentalCar" width={104} height={16} priority />
        </Link>
        <Navigation />
      </Container>
    </header>
  );
}
