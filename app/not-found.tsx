import type { Metadata } from 'next';
import { Container, EmptyState } from '@/components';
import { ROUTES } from '@/lib/constants';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: '404 - Page not found | RentalCar',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <Container>
        <EmptyState
          title="Page not found"
          text="Sorry, the page you are looking for does not exist or the car is no longer available."
          actionLabel="Go to catalog"
          actionHref={ROUTES.catalog}
        />
      </Container>
    </main>
  );
}
