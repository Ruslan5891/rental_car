'use client';

import { Container, ErrorView } from '@/components';
import type { ErrorPageProps } from '@/types/common';
import css from './CarPage.module.css';

export default function CarError({ retry }: ErrorPageProps) {
  return (
    <main className={css.main}>
      <Container>
        <ErrorView
          heading="h1"
          title="Could not load the car"
          text="Something went wrong while loading this car. Please check your connection and try again."
          onRetry={retry}
        />
      </Container>
    </main>
  );
}
