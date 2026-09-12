import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components';
import { ROUTES } from '@/lib/constants';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'RentalCar — Find your perfect rental car',
  description:
    'Reliable and budget-friendly car rentals for any journey. Browse the catalog, filter by brand, price and mileage, and book your car in minutes.',
};

export default function HomePage() {
  return (
    <main>
      <section className={css.hero} aria-labelledby="hero-title">
        <Image className={css.image} src="/images/hero.jpg" alt="" fill priority sizes="100vw" />
        <div className={css.content}>
          <div className={css.text}>
            <h1 className={css.title} id="hero-title">
              Find your perfect rental car
            </h1>
            <p className={css.subtitle}>Reliable and budget-friendly rentals for any journey</p>
          </div>
          <Button className={css.button} href={ROUTES.catalog}>
            View Catalog
          </Button>
        </div>
      </section>
    </main>
  );
}
